import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useContext} from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { NotificationListData, ProfileListData, documentsCardData } from '../../data';
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import {serverTimestamp, doc, getDoc, setDoc, updateDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import Loader from '../../components/loader';





export default function EmploymentDetailsScreen({navigation}) {

const [expiration, setExpiration] = useState('');

const [dateOfBirth, setDateOfBirth] = useState('');

const [formReady, setFormReady] = useState(false);

const [dateError, setDateError] = useState('');

const [error, setError] = useState('');

const [date, setDate] = useState(new Date());

const [state, setState] = useState('Choose a state');

const [firstname, setFirstname] = useState("");

const [lastname, setLastname] = useState("");

// const [dateExp, setDateExp] = useState(new Date());
const [loading, setLoading ] = useState(false)

const [showPicker, setShowPicker] = useState(false);

const [value, setValue] = React.useState('male');

const [userData, setUserData] = useState({})

const { user} = useContext(AuthContext)

const [isEdit, setIsEdit] = React.useState(false)


  
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

        currentCompany : userData.currentCompany,                    
        companyAddress :  userData.companyAddress,                   
        natureOfJob : userData.natureOfJob,
        dateOfEmployment : userData.dateOfEmployment,
        workPosition : userData.workPosition,
        jobDuties : userData.jobDuties,
        previousCompany : userData.previousCompany,
        // previousComapanyAddress : userData.previousCompanyAddress,
        // previousCompanyNatureOfJob : userData.previousCompanyNatureOfJob,
        // dateOfPreviousEmployment : userData.dateOfPreviousEmployment,
        // previousJobPosition : userData.previousJobPosition,      
        // previousJobDuties : userData.previousJobDuties,
        timeStamp: serverTimestamp(),

      })
      

      setLoading(false);

      alert("Your info is updated successfully!!!")

      setIsEdit(false)

        
    } catch (error) {

      console.log('error:',error.message)

    }

  }



  console.log('user data: ', userData )


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
                    <Text style={{fontSize:16, color:COLORS.white}}>Employment Details</Text>
                </View>
              </View>

              
      </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

        <View style={{alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingHorizontal:30}}>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Edit details</Text>

          <View style={{marginTop:60,  alignItems:'center', justifyContent:'center', borderRadius:10, position:'relative'}}>
      
          <Pressable onPress={handleEdit} style={{position:'absolute', backgroundColor:isEdit?COLORS.main:'gray', bottom:0,right:0, width: 40, height:40, alignItems:'center', justifyContent:'center'}} >

              <MaterialIcons name="mode-edit" size={24} color="white" />

          </Pressable>
        </View> 
        </View>

         
     
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
  
          <TextInput
              mode="flat"
              label="Current Company"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("currentCompany", value)}
              value={userData.currentCompany}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Company Address"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("companyAddress", value)}
              value={userData.companyAddress}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Nature of Job"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("natureOfJob", value)}
              value={userData.natureOfJob}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Date of Employment"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("dateOfEmployment", value)}
              value={userData.dateOfEmployment}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Job position"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("workPosition", value)}
              value={userData.workPosition}
             
          />
  
        </View>
  
  
        
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
  
          <TextInput
              mode="flat"
              label="Job Duties"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("jobDuties", value)}
              value={userData.jobDuties}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Previous Company Name"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("previousCompany", value)}
              value={userData.previousCompany}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Previous Company Address"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("previousComapanyAddress", value)}
              value={userData.previousComapanyAddress}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Previous Nature of Job"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("previousCompanyNatureOfJob", value)}
              value={userData.previousCompanyNatureOfJob}
             
          />
  
        </View>
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Previous date of employment"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("dateOfPreviousEmployment", value)}
              value={userData.dateOfPreviousEmployment}
             
          />
  
        </View>
        
        
  
        <View style={{width:'100%', marginTop:20, marginBottom:5}}>
          <TextInput
              mode="flat"
              label="Previous Job Position"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("previousJobPosition", value)}
              value={userData.previousJobPosition}
             
          />
  
        </View>
  
        
  
        <View style={{width:'100%', marginTop:20, marginBottom:20}}>
          <TextInput
              mode="flat"
              label="Previous Job Duties"
              backgroundColor="white"
              disabled={!isEdit}
              onChangeText={(value) => handleChangeText("previousJobDuties", value)}
              value={userData.previousJobDuties}
             
          />
  
        </View>

        {
        isEdit && 

        <Pressable onPress={handleUpdate} style={{width:'100%', height:60, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.main, marginVertical:0}}>
          <Text style={{color:'white'}}>Update</Text>
        </Pressable>


      }
  
        
       
        
  
        </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

