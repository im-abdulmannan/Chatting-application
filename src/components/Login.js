import { Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/login.png";
import { auth } from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 15px rgb(7 15 63 / 33%)",
    backgroundColor: "#171c30",
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "100%",
    height: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#d9d9d9",
  },
}));

const Login = () => {
  const classes = useStyles();

  const loginHandler = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      console.log("🚀 ~ loginHandler ~ user:", user)
  
      // Save user data to localStorage
      const userData = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      };
  
      localStorage.setItem('userDetails', JSON.stringify(userData));
  
      console.log('User data saved to localStorage:', userData);
    } catch (error) {
      console.error('Error during login:', error.message);
    }


  };

  return (
    <Container component={"div"} maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <img src={loginImg} className={classes.mainImg} alt="signup img" />

        <Typography variant="h4" style={{ paddingTop: "15px" }}>
          Sign in to Chatify
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={loginHandler}
        >
          Sign in with Google
        </Button>
      </div>
    </Container>
  );
};

export default Login;
