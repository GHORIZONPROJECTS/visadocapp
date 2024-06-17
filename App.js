import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Image, StatusBar, StyleSheet, Text, View, ImageBackground, } from 'react-native';
import React, { useState, useEffect} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SIZES, COLORS } from './src/constants/theme';
import { Ionicons } from '@expo/vector-icons'
import { AuthenticatedUserProvider } from './src/config/AuthContext';
import RootNavigation from './src/navigations/rootNavigation';
import { PaperProvider } from 'react-native-paper';
import { VisaProvider } from './src/config/VisaContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/components/loading';
import SplashScreen from './src/screens/splashScreen';



const slides = [
  {
      id : '0',
      title : 'Visa Processing',
      description : 'We offer professional, quick and easy visa processing to clients ',
      image : require('./assets/images/visa-registration.png')
  },
  {
      id : '1',
      title : ' View Processing ',
      description : 'All registered client can review each stage of their visa process',
      image : require('./assets/images/visa-form.png')
  },
  {
      id : '2',
      title : 'Guidance and approval',
      description : 'We provide the neccessary visa guidance required for your visa approval',
      image : require('./assets/images/visa-approved.png')
  },
  {
      id : '3',
      title : ' Continous Support',
      description : 'After Visa approval, our clients can always get back to us for support',
      image : require('./assets/images/visa-trip.png')
  },
]  




export default function App() {


  StatusBar.setBarStyle('light-content', true);
  
  const [ loading, setLoading ] = useState(true);

  const [showHomePage, setShowHomePage] = useState(false);

  const [ viewedOnboarding, setViewedOnboarding ] = useState(false)

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


   const buttonLabel = (label)=>{
    return(
      <View style={{padding:12}}>
         <Text style={{color:COLORS.title, fontSize:SIZES.h4, fontWeight:'600'}}>{label}</Text>
      </View>
    )
    
  }


  const onDone = () => {
    AsyncStorage.setItem('@viewedOnboading', 'true').then(()=>{

      setShowHomePage(true);

    });
    
 }


  const startLabel = ()=>{
    return(
      <View style={{width:50, height:50, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'center', borderRadius:25}}>
            <Ionicons name="ios-arrow-forward-sharp" size={30} color={COLORS.white} />
          
      </View>
    )
    
  }


  useEffect( () => {

    checkOnboarding()

  }, [])


  const Onboarding = () => {

    return (

      <>  
      <AppIntroSlider 
         data={slides} 
         renderItem={({item}) => {
           return(
            <View style={{flex:1, alignItems:"center", paddingTop:70}} key={item.id}>
 
               <Image 
                 source={item.image}
                 style={{width:SIZES.width-10, height:400}}
                 alt="photo"
                 resizeMode="contain"
               />
               <View style={{marginTop:20, paddingHorizontal: 20}}>
               <Text style={{fontSize:SIZES.h1, fontWeight:"bold", lineHeight: 30, color:"black", textAlign:'center', marginBottom : 10}}>{item.title}</Text>
               <Text style={{fontSize:SIZES.h3, fontWeight:400, lineHeight: 30, color:"gray", textAlign:'center'}}>{item.description}</Text>
              </View>
             </View>
           )
         }}
         showSkipButton
         activeDotStyle={{backgroundColor:COLORS.main, width:30}}
         renderNextButton={()=> buttonLabel("Next")}
         renderSkipButton={()=> buttonLabel("Skip")}
         renderDoneButton={()=> startLabel()}
         onDone={async() => onDone(
          await AsyncStorage.setItem('@viewedOnboading', 'true'),
          setViewedOnboarding(true)
         )}
      />
      </> 

    )
  }

  return (

    <AuthenticatedUserProvider>
      <GestureHandlerRootView style={{flex:1}}>
        <VisaProvider>
          <PaperProvider>
            { loading ? <Loading/> : viewedOnboarding ? <RootNavigation/> : <Onboarding/>}
          </PaperProvider>
        </VisaProvider>
      </GestureHandlerRootView>
    </AuthenticatedUserProvider>


   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

