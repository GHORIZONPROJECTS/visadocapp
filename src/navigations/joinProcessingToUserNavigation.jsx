import React, {useContext, useState, useEffect} from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../config/AuthContext';
import {auth, db} from '../firebase.js';
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import UserLoggedInNavigation from './userLoggedInNavigation.jsx';
import ProcessingNavigation from './processingNavigation';
import Loading from '../components/loading/index.jsx';



// const JoinProcessingToUserStack = createStackNavigator()

const JoinProcessingToUserNavigation = () => {

const { user, registered, setRegistered }= useContext(AuthContext);

const [isLoading, setIsLoading] = useState(true);
const [userData, setUserData] = useState('')


const getApplicant = async() => {
  const docRef = doc(db, "travellers", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {

        try{

          docSnap.data().registered ? setRegistered(docSnap.data().registered) : setRegistered(false)

        }catch (error) {

          console.log(error);

        }

      // console.log("Document data:", docSnap.data());
      // setUserData(docSnap.data())
      setIsLoading(false)


      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setIsLoading(false)
    }
}

useEffect(()=>{

  getApplicant()

}, [])

// console.log('registered:', userData.registered)



    return(

        <>

            {
               isLoading ? <Loading/> : registered ? <UserLoggedInNavigation /> :  <ProcessingNavigation />  
            }
            
           
        </>

    )
}

export default JoinProcessingToUserNavigation

