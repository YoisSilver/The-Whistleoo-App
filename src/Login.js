import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from './firebase.js'
import { useStateValue } from './StateProvider';
import { actionType } from "./reducer";


const logo = "https://firebasestorage.googleapis.com/v0/b/the-whistleoo-app.appspot.com/o/logo.svg?alt=media&token=8fea4421-b248-4a80-b03e-947a2131ae25";

function Login() {

  const [{ }, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  return (
    <div className='login'>
      <div className="login-container">
        <img src={logo} alt="logo" />
        <div className="login-text">
          <h1>The Whistleoo App</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>

    </div>
  );
}

export default Login
