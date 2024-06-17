import { StyleSheet, Text, View, ImageBackground, useWindowDimensions, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { auth, db } from '../../firebase';
import { COLORS, SIZES } from '../../constants/theme';
import BackArrow from '../../components/backArrow';
import CountryPicker from 'react-native-country-picker-modal'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../config/AuthContext'
import {serverTimestamp, doc, getDoc, setDoc, updateDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import { VisaContext } from '../../config/VisaContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DestinationCountryScreen = ({navigation}) => {


  const {width, height} =  useWindowDimensions();

  console.log(width, height)

  const [userData, setUserData] = useState([]) 
  const [countryCode, setCountryCode] = useState('CA')
  const [country, setCountry] = useState('Canada')
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)

  const { dispatch, visaId } = useContext(VisaContext)
  
  const { user } = useContext(AuthContext)

  console.log(user.uid)


  const getUser = async() => {
    const docRef = doc(db, "travellers", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        setUserData(docSnap.data())
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getUser()
  }, [])

  console.log(userData)

  

  const handleCountrySelect = country => {

    if(country === 'Canada' ){

      setCountryCode(country.cca2)
      
      setCountry(country.name)

    }else{

      alert("Only Canada Visa is available for now")

      return

    }

    

  }


    const handleCountry = async() => {

    try {

        const docRef = await addDoc(collection(db, "visa"), {

          country : country,

          userId : user.uid,

          visaDocument : "",

          constant : "inactive",

          interveiwDate : null,

          availableInternationalPassport : 'pending',

          availablePassportPhotograph : 'pending',

          availableBirthCertificate : 'pending',

          availableMarriageCertificate : 'pending',

          availableStatementOfAccount : 'pending',

          availableCompanyIntroduction : 'pending',

          availableSelfIntroduction : 'pending', 

          availableLeaveApprovalLetter : 'pending',

          availableEmploymentLetter : 'pending',
      
          unavailableInternationalPassport : 'pending',

          unavailablePassportPhotograph : 'pending', 

          unavailableBirthCertificate : 'pending',

          unavailableMarriageCertificate : 'pending',

          unavailableStatementOfAccount : 'pending',

          unavailableCompanyIntroduction : 'pending',

          unavailableSelfIntroduction : 'pending',

          unavailableLeaveApprovalLetter : 'pending',
          
          unavailableEmploymentLetter : 'pending',

          timeStamp: serverTimestamp(),

        })
          const visaId = docRef.id

        await updateDoc(doc(db, "visa", visaId), {

          visaId: visaId,

          email : userData.email,
          
          timeStamp: serverTimestamp(),

       })
       

          AsyncStorage.setItem("@currentVisaId", visaId)

          dispatch({type:"APPLICANT", payload:visaId})

          await updateDoc(doc(db, "travellers", user.uid), {
      
            destination : true,
    
            timeStamp: serverTimestamp(),
            
            visaId: visaId,

          })


        

        navigation.navigate('PurposeOfTravelScreen')
        
      
    } catch (error) {

      console.log(error.message);

    }


   
  }

  

  return (

    <SafeAreaView style={{ backgroundColor: COLORS.main,}}>

      <StatusBar/>
      <ImageBackground
        source={require('./../../../assets/images/country.png')}
        alt=''
        style={{
          width: "100%",
          height: 200,
          // padding: 20,
          // paddingVertical: 40,
          position: 'absolute',
          // top: 0,
          right: 0,
          top: 0,
          left: 0
      }}
        imageStyle={{
          resizeMode: "contain",
          // alignSelf: "flex-end"
      }}

      />
     
      <View style={{position:'absolute', width:'100%', height: SIZES.height, padding:20, flexDirection:'column', justifyContent:'space-between'}}>
        <View>
          <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
              <BackArrow onPress={() => navigation.goBack()}/>
              <View style = {{flexDirection : 'row'}}>
                <Text style = {{fontSize : 18, marginHorizontal : 5, color : 'gray'}}>Welcome</Text>
                <Text style = {{fontSize : 18, color : 'darkblue' }}>{userData.firstname}</Text>
              </View>
          </View>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:24, fontWeight:'bold'}}>Where To?</Text>
          </View>

          <View style={{flexDirection:'column', width: '100%', marginTop: 50}}>
            <Text style={{fontSize : 18, color:'black'}}>Choose Destination Country :</Text>
            <View style={{marginVertical: 10, width:'100%', height: 80, borderRadius: 5 }}>

              <CountryPicker
                onSelect={handleCountrySelect}
                withCountryNameButton={true}
                withFilter
                withAlphaFilter
                withCallingCode = {true}
                withEmoji = {false}
                withCloseButton
                country = {country}
                countryCode={countryCode}
                withFlagButton = {true}
                // visible
                containerButtonStyle={styles.countryPickerButton}
                placeholder = 'Select Country'
                closeButtonImageStyle={styles.countryPickerCloseItem}
                filterPlaceholderTextColor = '#999'
                filterInputStyle = {styles.countryPickerFilterInput}

              />
              <Text>You just selected {country} as your destination Country </Text> 
                      {/* {country !== null && (
                <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
              )} */}


            </View>
          </View>


      </View>

      <Pressable onPress = {handleCountry}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 80, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
        <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
        <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
          <Ionicons name="chevron-forward" size={24} color="white" />
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
      </Pressable>
      </View>
      
     
    </SafeAreaView>
    
   
  )
}

export default DestinationCountryScreen

const styles = StyleSheet.create({

  countryPickerButton : {
    width : 320,
    height : 60,
    borderColor : 'gray',
    borderWidth : 2,
    marginBottom : 16,
    paddingHorizontal : 10,
    justifyContent : 'center',
    alignItems : 'flex-start',
  },

  countryPickerCloseItem : {
    width : 20,
    height : 20,
  },

  countryPickerFilterInput : {
    paddingVertical : 8,
    fontSize : 20
  }

  
})


