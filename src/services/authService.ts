import {auth} from '../firebase/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

export const login = async(email:string, password:string)=>{
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signup = async(email:string, password:string)=>{
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const logout = async()=>{
    return await signOut(auth);
}