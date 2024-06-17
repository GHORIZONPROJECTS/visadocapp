import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./authNavigation";
import {auth} from '../firebase';
import { AuthContext } from '../config/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import JoinProcessingToUserNavigation from './joinProcessingToUserNavigation';
import Loading from '../components/loading';

const RootNavigation = () => {

  const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
          try {
            await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }

          setIsLoading(false)
        });
    
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
        
      }, []);

      console.log(user)

    return (


      <PaperProvider>

        <NavigationContainer>

            {isLoading ? <Loading/> : user ? < JoinProcessingToUserNavigation />  : <AuthNavigation />}

        </NavigationContainer>

      </PaperProvider>

    )

}

export default RootNavigation