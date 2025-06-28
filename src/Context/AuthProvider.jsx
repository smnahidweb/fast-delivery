import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../Firebase/firebase.init';

export const AuthContext = createContext(); 

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null)
    const[loading,setLoading] = useState(true)
  const CreateUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);

    
  }

  const SignIn = (email,password)=>{
  setLoading(true)
  return  signInWithEmailAndPassword(auth,email,password)

  }
  const UpdatedInfo = (profileInfo) =>{
  return updateProfile(auth.currentUser,profileInfo)
}

  const LogOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }



  const provider = new GoogleAuthProvider();
  const GoogleSignIn = () =>{
   return  signInWithPopup(auth,provider)
  }




  useEffect( ()=>{

    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)

    })
    return ()=>{
        unsubscribe()
    }

  },[] )

  const authdata = {
    CreateUser,
    loading,
    setLoading,
    user,
    setUser,
    SignIn,
    LogOut,
    GoogleSignIn,
    UpdatedInfo

  };

  return (
    <AuthContext value={authdata}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
