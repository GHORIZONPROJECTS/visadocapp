import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, onSnapshot, doc, getDoc, query, where, getDocs, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";import { AuthContext } from '../../config/AuthContext'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const InformationScreen = ({navigation}) => {

  // const navigation = useNavigation();

  const [userData, setUserData] = useState([])
  // const [loading, setLoading] = useState(false)
  
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


  const handleInformationScreen = async() => {

    await updateDoc(doc(db, "travellers", user.uid), {
    
        info : true,

        timeStamp: serverTimestamp(),
    
    })

      navigation.navigate("SafetyAndSecurityScreen");
        
    }





  return (
    <View style = {{
        flex : 1,
        // paddingHorizontal : 20,
        // paddingTop : 20
    }}>
      <SafeAreaView style={{ backgroundColor: COLORS.main,}}/>
      <View style={{flex:1, paddingHorizontal:20,flexDirection:'column', justifyContent:'space-between'}}>
      <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>

          <Image
            source= {require('../../../assets/logo.png')}
            alt=''
            resizeMode='contain'
            style = {{ width : 120, height : 60}}

          />
          {/* <Ionicons name="person-circle" size={32} color="gray" /> */}
          <View style = {{flexDirection : 'row'}}>
            <Text style = {{fontSize : 18, marginHorizontal : 5, color : 'gray'}}>Welcome</Text>
            <Text style = {{fontSize : 18, color : 'darkblue' }}>{userData.firstname}</Text>
          </View>
         
      </View>
      
      <ScrollView style = {{ marginTop : 10,}} showsVerticalScrollIndicator = {false}>
       
      <View style = {{ marginVertical : 5,}}>
        <Text style = {{fontSize : 18, marginVertical : 5, color : 'gray'}}>Introduction and Guidelines</Text>
        <Text style = {{color : '#3B3B3B', lineHeight : 20}}>The E-Visa documentation process is easy and straightforward, Our visa documentation process is safe and secured. </Text>
      </View>
      <View style = {{ marginVertical : 1,}}>
       

        <View style = {{ marginVertical : 10,}}>

            
          <Text style = {{color : '#000000', lineHeight : 20, fontWeight : 'bold'}}>Basic Documents. </Text>

          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Scanned International Passport Data Page. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>White/Colored Passport Photography. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Statement of Account/Payslip. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Birth Certificate/Affidavit. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Marriage Certificate.(If Married) </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>School Credentials. (for Study Visa)</Text>
        </View>

        <View style = {{ marginVertical : 15,}}>
            <Text style = {{color : 'red', lineHeight : 20}}>Note : If any of the below documents is not available, Indicate by choosing not available when asked to upload the document(s), VisaDoc will provide them for you and charges will be included in the services. </Text>

        </View>

        <View style = {{ marginVertical : 10,}}>
          <Text style = {{color : '#000000', lineHeight : 20, fontWeight :'bold'}}>Other Documents depending on your Purpose of Travel. </Text>
          
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Company Introduction Letter. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Self-Introductory Letter. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Leave Approval Letter. </Text>
          <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Employment Letter. </Text>
        
        </View>

       
        
      
      </View>
      
      {/* <View style = {{ marginVertical : 10,}}>
        <Text style = {{fontSize : 18, marginVertical : 5, color : 'gray'}}>Safety and Security</Text>
        <Text style = {{color : '#3B3B3B', lineHeight : 20}}>The following steps and guidelines is required for visa documentation </Text>
      </View> */}
      </ScrollView>
      
      {/* <Text>InformationScreen</Text> */}

      <Pressable onPress = {handleInformationScreen}  style = {{ backgroundColor : 'brown', width : '100%', marginTop : 20, alignItems : 'center', justifyContent : 'center', bottom : 0, paddingVertical : 20, flexDirection : 'row',}}>
        <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Continue</Text>
        <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
          <Ionicons name="chevron-forward" size={24} color="white" />
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
      </Pressable>

      </View>
      
      {/* <Pressable onPress = {() => logOut()}  style = {{padding :10, backgroundColor : 'brown', width : 200, marginVertical : 20}}>
        <Text style={{color : 'white'}}>Logout</Text>
      </Pressable> */}
    </View>
  )
}

export default InformationScreen

const styles = StyleSheet.create({
     appconstainer : { 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
     }
})









// import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
// import React, {useState, useContext, useEffect} from 'react'
// import { getAuth, signOut } from "firebase/auth";
// import { auth, db } from '../../firebase';
// import { collection, onSnapshot, doc, getDoc, query, where, getDocs, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
// import { AuthContext } from '../../config/AuthContext'
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { COLORS } from '../../constants/theme';
// import { VisaContext } from '../../config/VisaContext';

// const InformationScreen = ({navigation}) => {

//   // const navigation = useNavigation();

//   const [userData, setUserData] = useState([])
//   // const [loading, setLoading] = useState(false)
  
//   const { user } = useContext(AuthContext)

//   // const { visaId} = useContext(VisaContext)


//   console.log(user.uid)


//   const getUser = async() => {
//     const docRef = doc(db, "travellers", user.uid);
//       const docSnap = await getDoc(docRef);
      
//       if (docSnap.exists()) {

//         setUserData(docSnap.data())
        
//       } else {

//         console.log("No such document!");
//       }
//   }

//   useEffect(()=>{
//     getUser()
//   }, [])

//   console.log(userData)



 

//   const handleInformationScreen = async() => {

//     await updateDoc(doc(db, "travellers", user.uid), {
    
//         info : true,

//         timeStamp: serverTimestamp(),
    
//     })

//       navigation.navigate("SafetyAndSecurityScreen");
        
//     }

//     // console.log('visa id: ', visaId)

//   return (
//     <View style = {{
//         flex : 1,
//         // paddingHorizontal : 20,
//         // paddingTop : 20
//     }}>
//       <SafeAreaView style={{ backgroundColor: COLORS.main,}}/>
//       <View style={{flex:1, paddingHorizontal:20,flexDirection:'column', justifyContent:'space-between'}}>
//       <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>

//           <Image
//             source= {require('../../../assets/logo.png')}
//             alt=''
//             resizeMode='contain'
//             style = {{ width : 120, height : 60}}

//           />
//           {/* <Ionicons name="person-circle" size={32} color="gray" /> */}
//           <View style = {{flexDirection : 'row'}}>
//             <Text style = {{fontSize : 18, marginHorizontal : 5, color : 'gray'}}>Welcome</Text>
//             <Text style = {{fontSize : 18, color : 'darkblue' }}>{userData.firstname}</Text>
//           </View>
         
//       </View>
      
//       <ScrollView style = {{ marginTop : 10,}} showsVerticalScrollIndicator = {false}>
       
//       <View style = {{ marginVertical : 5,}}>
//         <Text style = {{fontSize : 18, marginVertical : 5, color : 'gray'}}>Introduction and Guidelines</Text>
//         <Text style = {{color : '#3B3B3B', lineHeight : 20}}>The E-Visa documentation process is easy and straightforward, Our visa documentation process is safe and secured. </Text>
//       </View>
//       <View style = {{ marginVertical : 1,}}>
       

//         <View style = {{ marginVertical : 10,}}>

            
//           <Text style = {{color : '#000000', lineHeight : 20, fontWeight : 'bold'}}>Basic Documents. </Text>

//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Scanned International Passport Data Page. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>White/Colored Passport Photography. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Statement of Account/Payslip. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Birth Certificate/Affidavit. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Marriage Certificate.(If Married) </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>School Credentials. (for Study Visa)</Text>
//         </View>

//         <View style = {{ marginVertical : 15,}}>
//             <Text style = {{color : 'red', lineHeight : 20}}>Note : If any of the below documents is not available, Indicate by choosing not available when asked to upload the document(s), VisaDoc will provide them for you and charges will be included in the services. </Text>

//         </View>

//         <View style = {{ marginVertical : 10,}}>
//           <Text style = {{color : '#000000', lineHeight : 20, fontWeight :'bold'}}>Other Documents depending on your Purpose of Travel. </Text>
          
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Company Introduction Letter. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Self-Introductory Letter. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Leave Approval Letter. </Text>
//           <Text style = {{color : '#3B3B3B', lineHeight : 20}}>Employment Letter. </Text>
        
//         </View>

       
        
      
//       </View>
      
//       {/* <View style = {{ marginVertical : 10,}}>
//         <Text style = {{fontSize : 18, marginVertical : 5, color : 'gray'}}>Safety and Security</Text>
//         <Text style = {{color : '#3B3B3B', lineHeight : 20}}>The following steps and guidelines is required for visa documentation </Text>
//       </View> */}
//       </ScrollView>
      
//       {/* <Text>InformationScreen</Text> */}

//       <Pressable onPress = {handleInformationScreen}  style = {{ backgroundColor : 'brown', width : '100%', marginTop : 20, alignItems : 'center', justifyContent : 'center', bottom : 0, paddingVertical : 20, flexDirection : 'row',}}>
//         <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Continue</Text>
//         <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
//           <Ionicons name="chevron-forward" size={24} color="white" />
//           <Ionicons name="chevron-forward" size={24} color="white" />
//         </View>
        
//       </Pressable>

//       </View>
      
//       {/* <Pressable onPress = {() => logOut()}  style = {{padding :10, backgroundColor : 'brown', width : 200, marginVertical : 20}}>
//         <Text style={{color : 'white'}}>Logout</Text>
//       </Pressable> */}
//     </View>
//   )
// }

// export default InformationScreen

// const styles = StyleSheet.create({
//      appconstainer : { 
//         flex : 1,
//         justifyContent : 'center',
//         alignItems : 'center'
//      }
// })