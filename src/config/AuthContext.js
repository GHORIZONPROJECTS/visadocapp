import React, { useState, createContext } from 'react';

export const AuthContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false)
  const [info, setInfo] = useState(false)
  const [safety, setSafety] = useState(false)
  const [destination, setDestination] = useState(false)
  const [purpose, setPurpose] = useState(false)
  const [type, setType] = useState(false)
  const [available, setAvailable] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [marital, setMarital] = useState(false)
  const [parent, setParent] = useState(false)
  const [education, setEducation] = useState(false)
  const [employment, setEmployment] = useState(false)
  const [history, setHistory] = useState(false)
  
 

  
  return (
    <AuthContext.Provider value={{ user, setUser, registered, setRegistered, info, setInfo, safety, setSafety, destination, setDestination, purpose, setPurpose, type, setType, available,setAvailable, userInfo,setUserInfo, marital, setMarital, parent, setParent, education, setEducation, employment, setEmployment, history, setHistory }}>
      {children}
    </AuthContext.Provider>
  );
};




// import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from "./AuthReducer";
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const INITIAL_STATE = {

//     // currentUser : JSON.parse(AsyncStorage.getItem("user")) || null,

//     currentUser : AsyncStorage.getItem("user") || null,

// }

// export const AuthContext = createContext(INITIAL_STATE)

// export const AuthenticatedUserProvider = ({children}) => {

//     const [user, setUser] = useState(null);

//     const [ state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


//     useEffect(() => {

//       AsyncStorage.setItem("user", state.currentUser)

//       // AsyncStorage.setItem("user", JSON.stringify(state.currentUser))

//     }, [state.currentUser])

//     return(

//         <AuthContext.Provider value={{currentUser: state.currentUser, dispatch}}>

//             {children}

//         </AuthContext.Provider>

//     );
// }