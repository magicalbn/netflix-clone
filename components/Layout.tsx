import React,{useEffect} from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Footer from './Navbar/Footer'

//redux
import { connect } from 'react-redux'
import { UserActionList, ReducerStoreState, } from '@/store/actions'

import Navbar from './Navbar/Navbar'

interface LayoutProps {
    title: string,
    home?: boolean,
    
}


const Layout: React.FC<any> = (props) => {
    const { title } = props;
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                
                if(!props.AuthData.user.uid){
                    props.autoSignin()
                }

                if(router.pathname=='/')
                router.replace('/browse')
                console.log(uid)
                // ...
            } else {
                // User is signed out
                // ...
                console.log('no user')
                if(router.pathname!='/')
                    router.replace('/')
                
            }
        });
        return () => {
            
        }
    }, [])
    
    

    return (
        <>
            <Head>
                {title && <title>{title}</title>}

                <link rel="icon" href="/N_logo.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
            </Head>
            {props.home ? null : <Navbar />}
            {props.children}
            <Footer/>

        </>
    )
}

const mapStatetoProps = (state: ReducerStoreState) => {
    return {
        AuthData: state.Authdata
    }
}


const mapDispacthtoProps = (dispatch: any) => {
    return {
      
        autoSignin: () => dispatch(UserActionList.autoSignin()),
    }
}
export default connect(mapStatetoProps, mapDispacthtoProps)(Layout)
