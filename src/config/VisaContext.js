import React, { useState, createContext, useReducer } from 'react';
import VisaReducer from './VisaReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'

const INITIAL_STATE = {

  visaId : AsyncStorage.getItem("@currentVisaId") || null,
    // currentUser : null,
}

export const VisaContext = createContext(INITIAL_STATE);

export const VisaProvider = ({ children }) => {

    const [ state, dispatch] = useReducer(VisaReducer, INITIAL_STATE);
    
  
  return (
    <VisaContext.Provider value={{ visaId:state.visaId, dispatch }}>
      {children}
    </VisaContext.Provider>
  );
};






// import React, { useState, createContext, useReducer, useEffect } from 'react';
// import VisaReducer from './VisaReducer';
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const INITIAL_STATE = {

//   visaId : getVisaId || null,

// }

// export const VisaContext = createContext(INITIAL_STATE);

//   const getVisaId = async() => {

//     try{

//       const visaInfo = await AsyncStorage.getItem('@currentVisaId');

//        return visaInfo != null && visaInfo;

//     }catch(error){

//       console.log(error.message)

//     }
    
//   };


// // const storedState = async() => await getVisaId()


// export const VisaProvider = ({ children }) => {

//     const [ state, dispatch] = useReducer(VisaReducer, INITIAL_STATE);

    
  
//   return (

//     <VisaContext.Provider value={{ state: state.visaId ,  dispatch }}>

//       {children}

//     </VisaContext.Provider>

//   );
  
// };

