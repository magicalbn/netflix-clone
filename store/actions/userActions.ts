import axios from 'axios'
import { Dispatch } from 'redux'

import { ActionTypes, AuthFail, AuthInit, AuthSuccess, LogOut } from './'


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { auth, db } from '../../firebase'


const authStart = () => {
    return {
        type: ActionTypes.AUTH_INIT
    }
}

const AuthorizationSuccess = (user): AuthSuccess => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        user: user
    }
}

const AuthorizationFailed = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
    }
}

const AuthorizationLogOut = () => {
    return {
        type: ActionTypes.LOG_OUT,

    }
}



const loginwithEmail = async (email, password, dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user)

            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            dispatch(AuthorizationFailed(error))
            return error.code
        });
}

const signupwithEmail = async (email, password, dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user: any = userCredential.user;
            // ...
            console.log(user)
            addDoc(collection(db, "netflixUsers"), {
                email: user.email,
                user: user.uid,
                subscriptionPlan: 1

            }).then((docRef: any) => {
                console.log("Document written with ID: ", docRef.id);
            });

           
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(error)
            dispatch(AuthorizationFailed(error))
            return error
        });

}

export const InitializeAuth = (email: string, password: string, login: true) => {
    return async (dispatch: Dispatch) => {
        dispatch(authStart())
        if (login) {
            loginwithEmail(email, password, dispatch)


        }
        else {

            signupwithEmail(email, password, dispatch)



        }



    }
}

export const userLogOut = () => {
    return async (dispatch: Dispatch) => {

        signOut(auth).then(() => {
            dispatch(AuthorizationLogOut())
            console.log('logging out')
        }).catch((error) => {
            // An error happened.
            dispatch(AuthorizationFailed(error))
        });

    }

}


export const autoSignin = () => {
    return async (dispatch: Dispatch) => {

        const usersRef = collection(db, "netflixUsers");
        const q = query(usersRef, where("user", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        let userFound
        querySnapshot.forEach((doc) => {

            userFound = doc

        });

        dispatch(AuthorizationSuccess(userFound.data()))
    }

}


