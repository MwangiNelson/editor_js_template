// auth.js
import {auth} from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

// Add more functions for other providers or methods as needed
