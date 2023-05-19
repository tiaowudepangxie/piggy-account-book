import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "../firebase";

const initialState = {
  currentUser: null,
}

const AuthContext = createContext();

// it return the auth context values
export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider(props) {
  // all those things are public through out the whole context,
  // can check in the components in the browser
  // so we can call those methods anywhere in the context
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(initialState.currentUser);
      }
      
    })
  }, [])


  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
  }
  return (
    <AuthContext.Provider value={value} {...props} />
  )
}
