import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, Platform, Button } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { documentsCardData, visaApprovedData } from '../../data';
import { Divider } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";

import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import DownloadButton from '../../components/downloadButton';
import Notification from '../../components/notification';


export default function VisaScreen({navigation}) {

  const [userData, setUserData] = useState([])  
  
  const [loading, setLoading] = useState(false)

  const [applicationData, setapplicationData] =useState([])

  const [statusData, setStatusData] =useState([])

  const [ applicationInfo, setApplicationInfo ] = useState("")

  const [visaInfo, setVisaInfo] = useState("")

  const [userVisa, setUserVisa] = useState([])

  const { user} = useContext(AuthContext)

  const {visaId} = useContext(VisaContext)

  useEffect(() => {

    applicationQuery = () => {

       const q = query(collection(db, "visa"), where("userId", "==", user.uid), where('status', 'in', ['DELIVERING','DELIVERED', 'APPROVED']));
        onSnapshot(q, (querySnapshot) => {
        let list = []
        let status = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id,  timeStamp: doc.data().timeStamp.toDate().toDateString(), country : doc.data().country, visaDocument : doc.data().visaDocument, status: doc.data().status})
          status.push(doc.data().status)
          setapplicationData(list)
          setStatusData(status)
        });
        // console.log("Current : ", visa.join(", "));
    });

      // unsubscribe()

    }

    applicationQuery()

  },[])



  // useEffect(() => {
    
  //   //LISTEN REAL TIME

  //   const applicationQuery = async() => {

  //     const applicationRef = (collection(db, "visa"));
  //     // const q = query(applicationRef, where("userId", "==", user.uid));
  //     const r = query(applicationRef, where("userId", "==", user.uid), where("status", "==", "APPROVED"));

  //     const querySnapshot = await getDocs(r);
  //       let list = []
  //       let status = []

  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc.id,  timeStamp: doc.data().timeStamp.toDate().toDateString(), country : doc.data().country, visaDocument : doc.data().visaDocument.downloadURL, status: doc.data().status})
  //       status.push(doc.data().status)
  //       setapplicationData(list)
  //       setStatusData(status)
  //       // console.log(applicationData)
  //     });

  //     console.log(applicationData)

  //   }
    
  //   applicationQuery()   
  // },[])

  async function downloadDoc(url) {

      var filename = url.substring(url.lastIndexOf('/')+1, url.length);
      const result = await FileSystem.downloadAsync(
      url, FileSystem.documentDirectory + filename

    );
  
    console.log(result);
  
    saveFile(result.uri, filename, result.headers["Content-Type"]);
    alert("Your document is downloaded successfully!!!")
  }


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





  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingTop:0}}> 
      <Pressable onPress={() =>navigation.navigate('ProfileScreen')}>
      <Ionicons name="ios-person-outline" size={32} color="white"  /> 
      </Pressable>  
     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width: 200}}>
        <Text style={{fontSize:16, color:COLORS.white}}>Approved Document</Text>
      </View>
      
    
      <Notification onPress={() => (navigation.navigate('NotificationScreen'))}/>
        
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
     

      <View style={{width:'100%', padding:20, marginTop:0}}>
        <View style={{  width:'100%', minHeight:60, backgroundColor:'#D9E7EE', borderRadius:5,  justifyContent:'', flexDirection:'row', paddingHorizontal:20, alignItems:'center'}}>
          <View style={{justifyContent:'center', width:40, height:40, backgroundColor:COLORS.main, justifyContent:'center', alignItems:'center',  borderRadius:8}}>
            <Ionicons name="ios-information-circle" size={24} color="white" />
          </View>
          <View style={{marginLeft:20, width:230, minHeight:60, alignItems:'center', paddingVertical:10}}>
          <Text style={{color:'#00000088',fontSize:14, fontWeight:500, }}>Download your documents for your visa Interviews</Text>
          </View>
         
          
        </View>
      </View>

      <View style={{width:'100%', paddingHorizontal:20, backgroundColor:'#00000011', marginVertical:20}}>
        <View style={{  width:'100%', height:60,alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            {/* <Text style={{color:'#00000088', fontWeight:400, marginRight:10, fontSize:14, fontWeight:'bold'}}>S/N</Text> */}
            <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>Destination</Text>
          
          </View>
          <Text style={{color:COLORS.main, fontWeight:400, fontSize:14}}>Status</Text>
          <Pressable onPress={() => navigation.navigate('Documents')} style={{flexDirection:'row', alignItems:'center', }}>
          <Text style={{color:COLORS.main, fontWeight:400, fontSize:14, marginRight:3,}}>Action</Text>
          </Pressable>
        </View>
      </View>

      {applicationData.status !== "APPROVED" 
      
          ? 
      
          <View style={{width:'100%'}}>
          <View style={{  width:'100%', flexDirection:'row',  justifyContent:'space-between', flexWrap:'wrap', gap:20}}>
    
            {
              applicationData.map((item)=>(
    
                <View key={item.id} style={{width:'100%', paddingHorizontal:20,}}>
                <View style={{  width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', marginBottom:10}}>
                  <View style={{flexDirection:'row', alignItems:'center', }}>
                   
                    <View style={{flexDirection:'column', gap:5}}>
                        <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>{item.country} Visa</Text>
                        <Text style={{color:'#00000088', fontWeight:400, fontSize:12,}}>{item.timeStamp}</Text>
                    </View>
                    
                  
                  </View>
                  <View>
    
                    <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>Ready</Text>
                  
                  </View>
                  {/* <Pressable onPress={downloadDoc(item.visaDocument)} style={{flexDirection:'row', alignItems:'center', marginRight:20}}>
                  <Feather name="download" size={24} color={COLORS.main} />
                  </Pressable> */}

                  <View style={styles.container}>
                    {/* <Button title="Download" onPress={() =>downloadDoc(item.visaDocument)}/> */}
                    {/* <Button title="Download" onPress={() =>downloadDoc(item.visaDocument)}/> */}
                    <DownloadButton title = "Download" onPress = {() =>downloadDoc(item.visaDocument)} />
                  </View>

                </View>
                <Divider/>
              </View>
    
              
    
              ))
            }
    
           
            
             
            </View>
          </View>

          :

          <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'100%'}}><Text>None Yet</Text></View>

          

      }

     


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

// import { StyleSheet, Text, Pressable, View } from 'react-native'
// import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const HomeScreen = () => {

//   const clearOnboarding = async() => {

//     try {

//       await AsyncStorage.removeItem('@viewedOnboarding')
      
//       return true;

//     } catch (error) {
      
//       console.log('Error @remeoveItem :', error)

//     }

//   }

//   return (

//     <View>

//       <Text>Home</Text>

//       <Pressable onPress={clearOnboarding}>
      
//         <Text>Clear Onboarding</Text>
        
//       </Pressable>

//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({})