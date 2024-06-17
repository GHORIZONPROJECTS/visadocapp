import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { NotificationListData, ProfileListData, documentsCardData } from '../../data';
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import {serverTimestamp, doc, getDoc, setDoc, updateDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import Loader from '../../components/loader';



export default function EducationInformationScreen({navigation}) {


const [date, setDate] = useState(new Date());

const [state, setState] = useState('Choose a state');

const [loading, setLoading ] = useState(false)

const [isEdit, setIsEdit] = React.useState(false)

const [showPicker, setShowPicker] = useState(false);

const [schoolAttendedError, setSchoolAttended] = useState("")

const [dateOfAdmission, setDateOfAdmission] = useState("")

const [dateOfGraduation, setDateOfGraduation] = useState("")

const [course, setCourse] = useState("")

const [value, setValue] = React.useState('male');

const { user} = useContext(AuthContext)

const [userData, setUserData] = useState({})


  
  const getUser = async() => {
    const docRef = doc(db, "travellers", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        setUserData(docSnap.data())

        console.log('user info: ', docSnap.data());
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getUser()
  }, [])

  console.log('user data: ', userData )


  const handleChangeText = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }


  const handleUpdate = async() => {

    setLoading(true);

    try {

      await updateDoc(doc(db, "travellers", user.uid), {

        schoolAttended : userData.schoolAttended,
        dateOfAdmission : userData.dateOfAdmission,
        dateOfGraduation : userData.dateOfGraduation,
        course : userData.course,
        schoolAddress : userData.schoolAddress,
        timeStamp: serverTimestamp(),

      })
      

      setLoading(false);

      alert("Your document is updated successfully!!!")

      setIsEdit(false)

        
    } catch (error) {

      console.log('error:',error.message)

    }

  }



  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <Loader visible ={loading}/>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>Education Information</Text>
                </View>
              </View>

      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20, paddingVertical:20}}>

      <View style={{alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingHorizontal:30}}>
          <Text style={{fontSize:18}}>Edit details</Text>

          <View style={{marginTop:60,  alignItems:'center', justifyContent:'center', borderRadius:10, position:'relative'}}>
      
          <Pressable onPress={handleEdit} style={{position:'absolute', backgroundColor:isEdit?COLORS.main:'gray', bottom:0,right:0, width: 40, height:40, alignItems:'center', justifyContent:'center'}} >
              <MaterialIcons name="mode-edit" size={24} color="white" />
  
          </Pressable>
        </View> 
        </View> 
     
      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="School Attended"
            backgroundColor="white"
            disabled={!isEdit}
            onChangeText={(value) => handleChangeText("schoolAttended", value)}
            value={userData.schoolAttended}
        />

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
        <TextInput
            mode="flat"
            label="Date of Admission"
            backgroundColor="white"
            disabled={!isEdit}
            onChangeText={(value) => handleChangeText("dateOfAdmission", value)}
            value={userData.dateOfAdmission}
           
        />

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
        <TextInput
            mode="flat"
            label="Date of Graduation"
            backgroundColor="white"
            disabled={!isEdit}
            onChangeText={(value) => handleChangeText("dateOfGraduation", value)}
            value={userData.dateOfGraduation}
        />

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
        <TextInput
            mode="flat"
            label="Course"
            backgroundColor="white"
            disabled={!isEdit}
            onChangeText={(value) => handleChangeText("course", value)}
            value={userData.course}
        />

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
        <TextInput
            mode="flat"
            label="School Address"
            backgroundColor="white"
            disabled={!isEdit}
            onChangeText={(value) => handleChangeText("schoolAddress", value)}
            value={userData.schoolAddress}
           
        />

      </View>


      {
        isEdit && 

        <Pressable onPress={handleUpdate} style={{width:'100%', height:60, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.main, marginVertical:20}}>
          <Text style={{color:'white'}}>Update</Text>
        </Pressable>


      }
      
      
      
      </ScrollView>

    
      
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
