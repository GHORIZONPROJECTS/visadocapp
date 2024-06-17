import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator, Alert  } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { TextInput} from "react-native-paper";
import { AuthContext } from '../../config/AuthContext'
import {serverTimestamp, doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {storage, db} from '../../firebase'
import * as FileSystem from 'expo-file-system'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable,  deleteObject } from "firebase/storage";
import Loader from '../../components/loader';


export default function PersonalInformationScreen({navigation}) {

  const [userData, setUserData] = useState([]) 


  const [firstname, setFirstname] = useState("");

  const [surname, setSurname] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("")

  const [othername, setOthername] = useState("");

  const [dateError, setDateError] = useState('');

  const [error, setError] = useState('');

  const [phoneNumberError, setPhoneNumberError] = useState("")

  const [date, setDate] = useState(new Date());

  const [state, setState] = useState('Choose a state');

  // const [dateExp, setDateExp] = useState(new Date());
  const [loading, setLoading ] = useState(false)

  const [showPicker, setShowPicker] = useState(false);

  const [value, setValue] = React.useState('male');

  const [isEdit, setIsEdit] = React.useState(false)

  const [image, setImage] = useState(null);

  const { user} = useContext(AuthContext)

  const [url, setUrl] = useState("")

  const [ImageLoading, setImageLoading] = useState(false)

  
  const getUser = async() => {

    const docRef = doc(db, "travellers", user.uid);

      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        const userInfo = docSnap.data()

        setUserData(userInfo)
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{

    getUser()

  }, [])

  console.log(userData)


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    uploadMedia()

  };

  const uploadMedia = async() => {

    // setUploading(true);

    // setImageLoading(true)

    try {

        const {uri} = await FileSystem.getInfoAsync(image)
        const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
              resolve(xhr.response);
        };

        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const name = new Date().getTime() + image.substring(image.lastIndexOf('/') + 1);
      
        const storageRef = ref(storage, name);

        const uploadTask = await uploadBytesResumable(storageRef, blob);

        setUrl(await getDownloadURL(storageRef));

        // setUploading(false)

        Alert.alert("Birthday certificate has been uploaded successfully!!!")

        // setImage(null)

        // setImageLoading(false)

        blob.close();
        
      
        
    } catch (error) {

        console.log(error)
        // setUploading(false)
        
    }

  }


  useEffect(() => {
    updateDoc(doc(db, "travellers", user.uid), {
      profileImage : url,
      timeStamp: serverTimestamp(),

    });
  },[url])

  


  const handleChangeText = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }


  const handleUpdate = async() => {

    if(phoneNumber !== ""){

      setPhoneNumberError ("this field is required")
      return
    }

    setLoading(true);

    try {

      await updateDoc(doc(db, "travellers", user.uid), {

          phoneNumber : userData.phoneNumber,

          timeStamp: serverTimestamp(),

      })
      

      setLoading(false);

      alert("Your Info is updated successfully!!!")

      setIsEdit(false)

        
    } catch (error) {

      console.log('error:',error.message)

    }

  }

  console.log('profileimage: ', userData.profileImage)

  return (

    <SafeAreaView style={{flex:1, alignItems:'center', marginBottom:20}}>
      <Loader visible ={loading}/>

      <StatusBar translucent={false} backgroundColor={COLORS.main}  barStyle="light-content"/>

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>Personal Information</Text>
                </View>
              </View>

       
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

       <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

       {
          userData.profileImage
          
          ?

          <View style={{marginVertical:20, width: 120, height:120, backgroundColor:'#00000033', alignItems:'center', justifyContent:'center', borderRadius:10, position:'relative'}}>
          
          <Image source={{ uri: userData.profileImage }} alt='photo' style = {{ width : 100, height : 100, }}/>

          <Pressable onPress={pickImage} style={{position:'absolute', backgroundColor:'white', bottom:0,right:0, width: 40, height:40, borderBottomRightRadius:10, alignItems:'center', justifyContent:'center'}} >
            <MaterialIcons name="photo-camera" size={24} color="#00000088" />

        </Pressable>

          </View>

          :


          <View style={{marginVertical:20, width: 120, height:120, backgroundColor:'#00000033', alignItems:'center', justifyContent:'center', borderRadius:10, position:'relative'}}>

        <ImageBackground
            source= {require('../../../assets/images/user.png')}
            alt='personal info'
            resizeMode='contain'
            style = {{ width : 100, height : 80, }}

        /> 
        <Pressable onPress={pickImage} style={{position:'absolute', backgroundColor:'white', bottom:0,right:0, width: 40, height:40, borderBottomRightRadius:10, alignItems:'center', justifyContent:'center'}} >
            <MaterialIcons name="photo-camera" size={24} color="#00000088" />

        </Pressable>
        </View> 
          
        }

       

        <Pressable onPress={handleEdit} style={{position:'absolute', backgroundColor:isEdit?COLORS.main:'gray', bottom:0,right:0, width: 40, height:40, alignItems:'center', justifyContent:'center'}} >
              <MaterialIcons name="mode-edit" size={24} color="white" />
  
          </Pressable>


       </View>

      

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="Firstname"
            backgroundColor="white"
            disabled = "true"
            value={userData.firstname}
            onChangeText={(value) => handleChangeText("firstname", value)}
          
        />

            {error.firstname && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="surname"
            backgroundColor="white"
            disabled = "true"
            value={userData.surname}
            onChangeText={(value) => handleChangeText("surname", value)}
           
        />

            {error.surname && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="Other name"
            backgroundColor="white"
            disabled = "true"
            value={userData.othername}
            onChangeText={(value) => handleChangeText("othername", value)}
        />

      </View>


      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="Phone Number"
            backgroundColor="white"
            disabled = {!isEdit}
            value={userData.phoneNumber}
            onChangeText={(value) => handleChangeText("phoneNumber", value)}
        />

{phoneNumberError && <Text style={{color:'red', marginVertical:5}}>{phoneNumberError}</Text>}

      </View>


      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="Email"
            backgroundColor="white"
            disabled="true"
            onChangeText={(value) => handleChangeText("phoneNumber", value)}
            value={userData.email}
           
        />


      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5}}>
      <TextInput
            mode="flat"
            label="Gender"
            backgroundColor="white"
            disabled="true"
            onChangeText={(value) => handleChangeText("gender", value)}
            value={userData.gender}
           
        />


      </View>
        {/* <View style={{  width:'100%', minHeight:60, backgroundColor:'#D9E7EE', borderRadius:5,  flexDirection:'row', paddingHorizontal:20, alignItems:'center', marginVertical:20}}>
        
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={userData.gender}>
            
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

              <View style={{flexDirection:'row', alignItems:'center', marginRight:50}}>
              <RadioButton value="male"/>
              <Text>Male</Text>
              </View>

              <View style={{flexDirection:'row', alignItems:'center'}}>
                    <RadioButton value="female"/>  
                    <Text>Female</Text>
                </View>
              
            </View>
            
        </RadioButton.Group>
         
          
        </View> */}

        <View style={{width:'100%', marginTop:20, marginBottom:20, position:'relative'}}>
        <TextInput
            mode="flat"
            label="Date of Birth"
            disabled="true"
            backgroundColor="white"
            onChangeText={(value) => handleChangeText("dob", value)}
            value={userData.dob}

            />
            <Pressable style={{position:'absolute', left:280, top:10}}>
                <Fontisto name="date" size={24} color="#00000077" />
            </Pressable>
            

            {error.lastname && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}

      </View>

      {
        isEdit && 

        <Pressable  onPress={handleUpdate} style={{width:'100%', height:60, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.main, marginVertical:20}}>
          <Text style={{color:'white'}}>Update</Text>
        </Pressable>


      }

     

      </ScrollView>

    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
