import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import OnboardingScreen from './src/screens/onboardingScreen';
import HomeScreen from './src/screens/homeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RootNavigation from './src/navigations/rootNavigation';
import LoginScreen from './src/screens/loginScreen';
import AuthNavigation from './src/navigations/authNavigation';
import WelcomeScreen from './src/screens/welcomeScreen';
import RegisterScreen from './src/screens/registerScreen';
import { AuthenticatedUserProvider } from './src/config/AuthContext';
import Loading from './src/components/loading';



export default function App() {

  const [ loading, setLoading ] = useState(true);

  const [ viewedOnboarding, setViewedOnboarding ] = useState(false)

  // const [currentUser, setCurrentUser] = useState(null)

  const checkOnboarding = async() => {

    try {

        const value = await AsyncStorage.getItem('@viewedOnboading')

        if (value !== null) {

          setViewedOnboarding(true)

        }

    } catch (error) {

      console.log( 'Error @viewedOnboarding :', error )
      
    } finally {

      setLoading(false)

    }

  }


  useEffect( () => {

    checkOnboarding()

  }, [])


  return (

    <AuthenticatedUserProvider>

      <GestureHandlerRootView style={styles.container}>

        { loading ? <Loading/> : viewedOnboarding ? <RootNavigation/> : <OnboardingScreen/>}

        {/* <OnboardingScreen/> */}

          <StatusBar style="auto" />

      </GestureHandlerRootView>

    </AuthenticatedUserProvider>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#fff',

    // alignItems: 'center',

    justifyContent: 'center',

  },

});
