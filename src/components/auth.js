'use client'

import { auth, googleProvider } from "@/app/config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }catch (error) {
      console.error(error)
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    }catch (error) {
      console.error(error)
    }
  };
  
  const logOut = async () => {
    try {
      await signOut(auth, googleProvider)
      console.log('signed out successfully');
    }catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sing in with google</button>

      <button onClick={logOut}>log out</button>
    </div>
  );
}

export default Auth;