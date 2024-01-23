import Picker from "@emoji-mart/react";
import { Grid, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiHash } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { RiImageAddLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import { db } from "../firebase/firebase";
import FileUpload from "./FileUpload";
import Message from "./Message";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  chat: {
    position: "relative",
    height: "calc(100vh - 200px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  footer: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
  },
  message: {
    width: "100%",
    color: "white",
  },
  roomName: {
    border: "1px solid #0000004a",
    borderLeft: 0,
    borderRight: 0,
    padding: "15px",
    display: "flex",
    color: "#e5e5e5",
  },
  roomNameText: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
    paddingLeft: "5px",
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#e5e5e5",
  },
  footerContent: {
    display: "flex",
    backgroundColor: "#303753",
    borderRadius: "5px",
    alignItems: "center",
  },
  inputFile: {
    display: "none",
  },
  pickerStyle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const Chat = () => {
  const classes = useStyles();
  const params = useParams();
  const [file, setFile] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [emojiBtn, setEmojiBtn] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [channelName, setChannelName] = useState("");

  const openModal = () => {
    setModalState(!modalState);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      openModal();
    }

    e.target.value = null;
  };

  const addEmoji = (e) => {
    setUserNewMsg(userNewMsg + e.native);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const channelDocRef = doc(db, "channels", params.id);
        const channelDocSnapshot = await getDoc(channelDocRef);

        if (channelDocSnapshot.exists()) {
          setChannelName(channelDocSnapshot.data().channelName);

          const messagesCollectionRef = collection(channelDocRef, "messages");
          const messagesQuery = query(
            messagesCollectionRef,
            orderBy("timestamp", "asc")
          );

          onSnapshot(messagesQuery, (snapshot) => {
            setAllMessages(
              snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            );
          });
        }
      }
    };

    fetchData();
  }, [params]);

  const sendMsg = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("userDetails"));
      if (!userData) {
        console.error("User details not found.");
        return;
      }

      const displayName = userData.displayName;
      const imgUrl = userData.photoURL;
      const uid = userData.uid;
      const likeCount = 0;
      const likes = {};
      const fireCount = 0;
      const fire = {};
      const heartCount = 0;
      const heart = {};
      const postImg = null;

      const obj = {
        text: userNewMsg,
        timestamp: Timestamp.now(),
        userImg: imgUrl,
        userName: displayName,
        uid: uid,
        likeCount: likeCount,
        likes: likes,
        fireCount: fireCount,
        fire: fire,
        heartCount: heartCount,
        heart: heart,
        postImg: postImg,
      };

      const messageRef = collection(db, "channels", params.id, "messages");
      await addDoc(messageRef, obj);

      setUserNewMsg("");
      setEmojiBtn(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={classes.root}>
      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
      <Grid item xs={12} className={classes.roomName}>
        <BiHash className={classes.iconDesign} />
        <h3 className={classes.roomNameText}>{channelName}</h3>
      </Grid>

      <Grid item xs={12} className={classes.chat}>
        <ScrollableFeed>
          {allMessages.map((message) => (
            <Message
              key={message.id}
              values={message.data}
              msgId={message.id}
            />
          ))}
        </ScrollableFeed>
      </Grid>

      <div className={classes.footer}>
        <Grid item xs={12} className={classes.footerContent}>
          <input
            accept="image/*"
            className={classes.inputFile}
            id="icon-button-file"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload-picture"
              component="span"
            >
              <RiImageAddLine style={{ color: "#b9bbbe" }} />
            </IconButton>
          </label>

          <IconButton
            color="primary"
            component="button"
            onClick={() => setEmojiBtn(true)}
          >
            <GrEmoji style={{ color: "#b9bbbe" }} />
          </IconButton>
          {emojiBtn ? (
            <div className={classes.pickerStyle}>
              <Picker onSelect={addEmoji} theme="dark" navPosition="top" />
            </div>
          ) : // <Picker data={data} onEmojiSelect={console.log} />
          null}

          <form
            autoComplete="off"
            style={{ width: "100%", display: "flex" }}
            onSubmit={(e) => sendMsg(e)}
          >
            <TextField
              className={classes.message}
              required
              id="outlined-basic"
              label="Enter Message"
              variant="outlined"
              multiline={true}
              rows={1}
              rowsMax={2}
              value={userNewMsg}
              onChange={(e) => {
                setUserNewMsg(e.target.value);
              }}
            />
            <IconButton type="submit" component="button">
              <FiSend style={{ color: "#b9bbbe" }} />
            </IconButton>
          </form>
        </Grid>
      </div>
    </div>
  );
};

export default Chat;
