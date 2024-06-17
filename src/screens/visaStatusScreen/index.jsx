import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, TouchableOpacity, Linking, Button, ToastAndroid  } from "react-native";
import Loader from '../../components/loader'
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc ,  collection, query, where, onSnapshot } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';
import DownloadButton from "../../components/downloadButton";

import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export default function VisaStatusScreen({navigation, route}) {

  const {visaId} = route.params

  const {user} = useContext(AuthContext)

  const [userData, setUserData] = useState("")

  const [visaData, setVisaData] = useState("")
  
  const [loading, setLoading] = useState(false)

  const [ applicationInfo, setApplicationInfo ] = useState("")

  const [documentInfo, setDocumentInfo] = useState(null)

  console.log(visaId)

     //user information

     const getUserData = async() => {
      const docRef = doc(db, "travellers", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          setUserData(docSnap.data())
          
        } else {
  
          console.log("No such document!");
        }
    }
  
    useEffect(()=>{
      getUserData()
    }, [])
  
  
  // visa application
  
    const getVisa = async() => {
  
      const docRef = doc(db, "visa", visaId);
  
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          setVisaData(docSnap.data())
          
        } else {
  
          console.log("No such document!");
        }
    }
  
    useEffect(()=>{
  
      getVisa()
  
    }, [])

    

const getApplicationInfo = () => {

  onSnapshot(doc(db, "visa", visaId), (doc) => {

   console.log("Current data: ", doc.data());

  //  setApplicationInfo({status:doc.data().status, visadoc:doc.data().visaDocument.downloadURL})

  setApplicationInfo({status:doc.data().status})

  setDocumentInfo(doc.data().visaDocument)
  
  // documentInfo !== "" ? setDocumentInfo(doc.data().visaDocument.downloadURL) : ""

 });


}

useEffect(()=>{

  getApplicationInfo()

}, [])


// SaveFile Documents

async function saveFile(uri, filename, mimetype) {

if (Platform.OS === "android") {
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (permissions.granted) {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, "application/pdf")
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
      })
      .catch(e => console.log(e));
  } else {
    shareAsync(uri);
  }
} else {
  shareAsync(uri);
}
}

// UPDATE DATABASE STATUS

const updateStatus = async() => {

  const confirmRef = doc(db, "visa", visaId);
  
  const updateStatus = await updateDoc(confirmRef, {
    status: "DELIVERED"
  }).then(() =>{

    alert("Visa document is saved on your device")
    // ToastAndroid.show('Image Downloaded Successfully!', ToastAndroid.SHORT);
    navigation.navigate("ReviewsScreen", visaId)
    
  });

  // Alert("Image Downloaded Successfully")
  // ToastAndroid.show('Image Downloaded Successfully!', ToastAndroid.SHORT);

}


// // DELIVERING APPLICATION DOCUMENT

async function downloadDoc(url){

    var filename = url.substring(url.lastIndexOf('/')+1, url.length);
    const result = await FileSystem.downloadAsync(
    url, FileSystem.documentDirectory + filename

  );

  // Log the download result
  console.log(result);

  // Save the downloaded file
  saveFile(result.uri, filename, result.headers["Content-Type"]);
  updateStatus()

  

  }

  console.log('Document : ', documentInfo)
  


  return (
    <View style={{flex:1, paddingLeft:20}}>
    <SafeAreaView style={{ backgroundColor: COLORS.main,}}/>
    <View style={styles.container}>
    <Loader visible ={loading}/>
   
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
    <BackArrow onPress={() => navigation.goBack()}/>
    <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Application Status</Text>  

    </View>
    
    <ScrollView style={{paddingVertical: 10, marginBottom:50}} showsVerticalScrollIndicator={false}>

    <View style={{flexDirection:'column', width:SIZES.width*0.8, backgroundColor:'#f2f2f2', alignItems:'center', justifyContent:'center', borderRadius:20,paddingTop:10}}>
          {applicationInfo.status === "DELIVERING" || applicationInfo.status === "DELIVERED" 
              ?
              <View style={{width:SIZES.width*0.78, minHeight:60, flexDirection:'row', paddingTop:10, justifyContent:'space-between'}}>
                {/* <View style={{paddingLeft:10, width:100}}>
                  <Text style={{fontSize:14,}}>Driver Name:</Text>
                  <Text style={{color:'green', fontSize:14, fontWeight:'bold'}}>{orderInfo.driverFirstname} </Text>
                  <Text></Text>
                  <Text style={{fontSize:14,}}>Telephone:</Text>
                  <Text  onPress={()=>{Linking.openURL(`tel:${orderInfo.driverTelephone}`);}} style={{ color:'green' , fontSize:14, fontWeight:'bold' }}>{orderInfo.driverTelephone}</Text>
                  
                  <Text></Text>
                  <Text style={{fontSize:14,}}>Driver Rating:</Text>
                  <Text style={{color:'green', fontSize:14, fontWeight:'bold'}}>4.5 Star</Text>
                </View> */}
                
                  <LottieView
                    style={{
                        width: 200,
                        height: 150,
                        // backgroundColor: 'red',
                    }}
                    source={require('../../../assets/json/plane.json')}
                    loop={true}
                    speed={0.5}
                    autoPlay
                  />
              </View> 
            :

            <View style={{width:SIZES.width*0.78, minHeight:60, flexDirection:'row', paddingTop:10, justifyContent:'space-between'}}>
               
                
                  <LottieView
                    style={{
                        width: 180,
                        height: 180,
                        // backgroundColor: 'red',
                    }}
                    source={require('../../../assets/json/world.json')}
                    loop={true}
                    speed={0.5}
                    autoPlay
                  />
              </View> 

          
          }
            
      <View style={{alignItems:'center', marginTop:60, marginLeft:20}}>
        <View style={{width:SIZES.width*0.8, backgroundColor:COLORS.main, borderRadius:20, alignItems:'center', flexDirection:'row', padding:10}}>
          <View style={{marginHorizontal:20}}>
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24}  color="white" />
          </View>
          <View style={{flexDirection:'column', justifyContent:'space-around', }}>
            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>
              {applicationInfo.status === "RECEIVED" && "Application Received"}
              {applicationInfo.status === "PROCESSING" && "Processing Documents"}
              {applicationInfo.status === "DELIVERING" && "Delivering Document"}
              {applicationInfo.status === "DELIVERED" && "Document Delivered"}
            </Text>

          </View>  
        </View>
      </View>
    
    </View>
           
     
      <View style={{flexDirection:'row', justifyContent:'flex-start', width:SIZES.width*0.8, height:240, alignSelf:'center', paddingLeft:25, marginBottom:20}}>
        <View>
            <Image 
              source={require('../../../assets/images/Dot.png')}
              resizeMode="contain"
              style={{height:230}}
            />
        </View>
        <View style={{flexDirection:'column', marginTop:45}}>
        <View style={{ }}>
        <View style={{width:SIZES.width*0.8, height:60, borderRadius:10,marginHorizontal:20, flexDirection:'column', marginBottom:25}}>
          <View style={{}}>
            
              {(applicationInfo.status === "PROCESSING")

              ? <>
                  <Text style={{color:COLORS.main, fontSize:16, fontWeight:'bold'}}>
                    Processing Application
                  </Text>
                  {/* <View style={{flexDirection:'row', alignItems:'center' }}>
                    <MaterialCommunityIcons name="clock-time-five-outline" size={18}  color="green" />
                    <Text style={{ color:COLORS.grayInactive , fontSize:12, }}>10am, June 22, 08</Text>
                  </View>  */}
                </>
              : <Text style={{color:'#ccc', fontSize:16, fontWeight:'bold'}}>
                 Processing Application
                </Text>
              }
            </View>
           
        </View>
      </View>
      <View style={{ }}>
        <View style={{width:SIZES.width*0.8, height:60, borderRadius:10,marginHorizontal:20, flexDirection:'column', marginBottom:25}}>
          <View style={{}}>
            
              {(applicationInfo.status === "DELIVERING" )

              ? <>
                  <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Text style={{color:COLORS.main, fontSize:16, fontWeight:'bold', marginRight:30, }}>Document Ready</Text>
                    <View>
                    {/* <Text  onPress={()=>{Linking.openURL(`tel:${orderInfo.driverTelephone}`);}} style={{ color:'white' , fontSize:14, backgroundColor:COLORS.primary,  paddingHorizontal:8, paddingVertical:5, borderRadius:5 }}>{orderInfo.driverTelephone}</Text> */}
                    </View>
                    
                  </View>
                  
                  {/* <View style={{flexDirection:'row', alignItems:'center' }}>
                    <MaterialCommunityIcons name="clock-time-five-outline" size={18}  color="green" />
                    
                  </View>  */}
                </>
              : 
              <Text style={{color:'#ccc', fontSize:16, fontWeight:'bold'}}>
                  Document Ready
                </Text>
              }
            </View>
           
        </View>
      </View>
      <View style={{ }}>
        <View style={{width:SIZES.width*0.8, height:60, borderRadius:10,marginHorizontal:20, flexDirection:'column', marginBottom:25}}>
          <View style={{}}>
            
              {applicationInfo.status === "DELIVERED" 

              ? <>
                  <Text style={{color:COLORS.main, fontSize:16, fontWeight:'bold'}}>
                    Completed
                  </Text>
                 
                </>
              : <Text style={{color:'#ccc', fontSize:16, fontWeight:'bold'}}>
                  Completed
                </Text>
              }
            </View>
           
        </View>
      </View>
     
        </View>
      </View>
      
     
       <View style={{alignItems:'center', marginBottom:15}}>

       {applicationInfo.status === "DELIVERING" || applicationInfo.status === "DELIVERED" 

       ?

       <View style={styles.container}>
          <Button title = "Download Visa Document Now" onPress = {() => downloadDoc(documentInfo)} />

          {/* <Button title="Download" onPress={() =>downloadDoc(item.visaDocument)}/>  */}
      </View>

   
      :
          <></>
      
        }

      </View>

    </ScrollView>
    </View>

    </View> 
  )
}

const styles = StyleSheet.create({})





