import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, Image } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { InspectionStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign} from '@expo/vector-icons'
import LottieView from 'lottie-react-native';

import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import Loader from "../../components/loader";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function NewPaymentSuccessfulScreen({ navigation }) {


  const [userData, setUserData] = useState({})
    const [image, setImage] = useState(null)  
    const [uploading, setUploading] = useState(false)
    const [visaData, setVisaData] = useState({})
    const [loading, setLoading] = useState(false)
  
    const { user, registered, setRegistered } = useContext(AuthContext)
  
    const {visaId, dispatch} = useContext(VisaContext)

   
  
  
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
  



const onSubmit= async() => {

  setLoading(true)


 try {

    await updateDoc(doc(db, "visa", visaId), {

      status : "RECEIVED",

     })

       setLoading(false)

       navigation.navigate("bottomTab", )
  
 } catch (error) {

     console.log(error)
  
 }

 


  

// try {

//     await updateDoc(doc(db, "visa", visaId), {

//       status : "RECEIVED",

//     })


//       await updateDoc(doc(db, "travellers", user.uid), {

//         registered : true,
//         timeStamp: serverTimestamp(),



        
//       }).then(async() => {

//         const docRef = doc(db, "travellers", user.uid);
//         const docSnap = await getDoc(docRef);
        
//         if (docSnap.exists()) {

//             try{

//               docSnap.data().registered ? setRegistered(docSnap.data().registered) : setRegistered(false)

//             }catch (error) {

//               console.log(error);

//             }

//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//           // setIsLoading(false)
//         }


//       })

//       await AsyncStorage.removeItem("@currentVisaId");

     
//       setLoading(false)
  
// } catch (error) {

//     console.log(error)
  
// }

//   navigation.navigate("bottomTab", )

 } 

 

  return (
    <ScrollView style={styles.container}>
    <Loader visible ={loading}/>
   
      <View style={{  alignItems:'center', justifyContent:'center', marginVertical:80, marginHorizontal:20}}>

      <LottieView
            // ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
           
            source={require('../../../assets/json/success.json')}
            loop={false}
            speed={0.9}
            autoPlay
      /> 
            <Text style={{fontSize:40, fontWeight:500, marginBottom:10, color:'#38D3F5', textAlign:'center', }}>
                Payment Successfull
            </Text> 

            <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray', textAlign:'center', lineHeight:30}}>
            You will receive an email in your inbox to confirm your PAYMENT.
            Then track you visa application process on your VisaDoc App !
             
            </Text> 
            <Text style={{fontSize:13, fontWeight:400, marginBottom:10, color:'blue'}}>Congratulations!</Text>

            <Pressable onPress={onSubmit} style = {{ backgroundColor : 'brown', width : '100%', marginTop : 80, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
         <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Track your application</Text>
         <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
           <Ionicons name="chevron-forward" size={24} color="white" />
           <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
       </Pressable> 

            <View style={styles.formEntryImage}>
           
            
        </View>

        <View style={{alignItems:'center', justifyContent:'center', marginVertical:40}}>
           
        </View>
      </View> 



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
  },
  formEntryImage:{
    flex:1,
    margin:8,
    marginTop:12,
    width:SIZES.width*0.8,
    height:50,
    
    borderColor:'gray',
    padding:5,
    // backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10
  }
});
