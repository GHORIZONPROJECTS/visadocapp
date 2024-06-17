import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DocumentsUploadScreen = () => {
  return (
    <View>
      <Text>DocumentsUploadScreen</Text>
    </View>
  )
}

export default DocumentsUploadScreen

const styles = StyleSheet.create({})
// import React, { useState, useEffect, useContext } from "react";
// import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView } from "react-native";
// // import Constants from "expo-constants";

// // import { SubmitHandler, useForm, Controller } from "react-hook-form";
// // import { WizardStore } from "../../store";
// import { Button, Divider, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
// import { useIsFocused } from "@react-navigation/native";
// import { COLORS, SIZES } from "../../constants/theme";
// import { FontAwesome, Ionicons} from '@expo/vector-icons'
// import BackArrow from '../../components/backArrow'
// import { auth, db } from '../../firebase';
// import { AuthContext } from '../../config/AuthContext'
// import Loader from '../../components/loader'
// import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
// import { EmploymentStatusData, MaritalStatusData, fatherData, motherData } from "../../data";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default function DocumentsUploadScreen({ navigation }) {
  
//   const [errorMessage, setErrorMessage] = useState('')
//   const [visaData, setVisaData] = useState(null)
// //   const [fatherAlive, setFatherAlive] = useState('fatherAlive')

//       const { user } = useContext(AuthContext)

//       console.log(user.uid)

    
//       const getUser = async() => {
//         const docRef = doc(db, "travellers", user.uid);
//           const docSnap = await getDoc(docRef);
          
//           if (docSnap.exists()) {
    
//             setVisaData(docSnap.data())
            
//           } else {
    
//             console.log("No such document!");
//           }
//       }
    
//       useEffect(()=>{
//         getUser()
//       }, [])
    
//       console.log(visaData)
    

//     const handleMyProfile = async() => {


     

      
//     //   if(employmentLetter === null){

//     //     return setErrorMessage('Please choose an option');
        
//     //   }
//     navigation.navigate("PaymentScreen");

//     //     try {

//     //       setLoading(true)

//     //        await updateDoc(doc(db, "travellers", user.uid), {
        
//     //    internationalPassport : internationalPassport,
      
//     //    timeStamp: serverTimestamp(),
        

//     // }).then(() => {
//     //   setLoading(false)
//     //   // showToast()
//     //   // if (condition) {
        
//     //   // } else {
        
//     //   // }
//     //   navigation.navigate("UserInformationScreen");
        
//     // })
//     // navigation.navigate("UserInformationScreen");
          
//     //     } catch (error) {
//     //       console.log('error:',error.message)
//     //     }

       
//     //   }else{

//     //     return setErrorMessage('Please select your visa Type');
        
//     //   }
        
//   }


//   return (
//     <View style={styles.container}>
//       <Loader visible ={loading}/>
//     {/* <ProgressBar
//       style={styles.progressBar}
//       progress={WizardStore.getRawState().progress}
//       color={MD3Colors.primary60}
//     /> */}
//     <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
//       <BackArrow onPress={() => navigation.goBack()}/>
//       <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Parent Information</Text>  

//     </View>
    
//     <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
//       <View>
    

//      <View style={{marginBottom:50}}>

//         <Text style={{fontSize:16, marginBottom:15, fontWeight:'500', textAlign:'center'}}>Father's Information</Text>

//             <View style={{marginBottom:20}}>

//                 <Text style={{fontSize:16, marginBottom:5}}>Is your father Alive?</Text>
                
//                 <View style={{flexDirection:'row', marginTop:20}}>

//                 {fatherData.map(item => {
//                 return (
//                     <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

//                         <View style={{flexDirection:'row', alignItems:'center',}}>

//                         <Pressable key= {item.value} onPress={() => setFatherAlive(item.value)} style={{
//                         width:30,
//                         height:30,
//                         flexDirection:'column',

//                         position:'relative',

//                         alignItems:'center',
//                         justifyContent:'center',
//                         // gap:10,
//                         marginRight:10,
//                         // paddingLeft:20,
//                         // paddingTop:10,
//                         borderWidth:1,
//                         // borderRadius:10,
//                         backgroundColor:'white',
//                         borderColor: fatherAlive == item.value? COLORS.main : 'lightgray',
//                         position:'relative'
                    
//                         }}>
//                         {fatherAlive === item.value ? <View style={styles.check}>
//                             <FontAwesome name="check" size={20} color='darkblue'/>
//                         </View> : null}
                        
//                         </Pressable>

//                         <Text style={{
//                             fontSize:13,
//                             color: fatherAlive == item.value? COLORS.main : 'black',
//                         }}>
//                             {item.title}
//                         </Text>

//                         </View>

//                     </View>
                    
//                 )
//                 })}

//                 </View>

                

//                 {errorMessage &&
//                 <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
//                 }

//             </View> 

//             {fatherAlive === 'fatherAlive'?

//                 <>
                
//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='firstname'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Lastname'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Home Address'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Date of birth'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Marital status(married/divorced/separeated/widowed)'
//                         mode='outlined'
//                     />

                  
//                 </>

//                 :

//                 ''

//             }

     
      
//         {/* {errorMessage &&
//           <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
//         } */}
   
       
        
//      </View> 

//      <View style={{marginBottom:50}}>

//         <Text style={{fontSize:16, marginBottom:15, fontWeight:'500', textAlign:'center'}}>Mother's Information</Text>

//             <View style={{marginBottom:20}}>

//                 <Text style={{fontSize:16, marginBottom:0}}>Is your mother Alive?</Text>
                
//                 <View style={{flexDirection:'row', marginTop:20}}>

//                 {motherData.map(item => {
//                 return (
//                     <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

//                         <View style={{flexDirection:'row', alignItems:'center',}}>

//                         <Pressable key= {item.value} onPress={() => setMotherAlive(item.value)} style={{
//                         width:30,
//                         height:30,
//                         flexDirection:'column',

//                         position:'relative',

//                         alignItems:'center',
//                         justifyContent:'center',
//                         // gap:10,
//                         marginRight:10,
//                         // paddingLeft:20,
//                         // paddingTop:10,
//                         borderWidth:1,
//                         // borderRadius:10,
//                         backgroundColor:'white',
//                         borderColor: motherAlive == item.value? COLORS.main : 'lightgray',
//                         position:'relative'
                    
//                         }}>
//                         {motherAlive === item.value ? <View style={styles.check}>
//                             <FontAwesome name="check" size={20} color='darkblue'/>
//                         </View> : null}
                        
//                         </Pressable>

//                         <Text style={{
//                             fontSize:13,
//                             color: motherAlive == item.value? COLORS.main : 'black',
//                         }}>
//                             {item.title}
//                         </Text>

//                         </View>

//                     </View>
                    
//                 )
//                 })}

//                 </View>

                

//                 {errorMessage &&
//                 <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
//                 }

//             </View> 

//             {motherAlive === 'motherAlive'?

//                 <>
                
//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='firstname'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Lastname'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Home Address'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Date of birth'
//                         mode='outlined'
//                     />

//                     <TextInput
//                         type='text'
//                         style={{ marginTop: 15 }}
//                         label='Marital status(married/divorced/separeated/widowed)'
//                         mode='outlined'
//                     />

                
//                 </>

//                 :

//                 ''

//             }



//         {/* {errorMessage &&
//         <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
//         } */}



//         </View> 




//      </View>
//     </ScrollView>
//       <Pressable onPress = {handleMyProfile}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
//         <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
//         <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
//           <Ionicons name="chevron-forward" size={24} color="white" />
//           <Ionicons name="chevron-forward" size={24} color="white" />
//         </View>
        
//       </Pressable>
//     </View>
//   );
      
        
  
// }

// const styles = StyleSheet.create({


//     button: {
//       padding : 10,
//       alignItems: 'center',
//       justifyContent :'center',
//       margin: 8,
//       width:190,
//       backgroundColor:COLORS.main,
//       width : 250,
//       borderRadius : 5
      

//     },
//     buttonText : {
//       fontSize: 18,
//       fontWeight : 'bold',
//       color : 'white'
//     },
//     formEntry: {
//       margin: 8,
//     },
//     container: {
//       flex: 1,
//       flexDirection:'column',
//       justifyContent:'space-between',
//       paddingHorizontal:20
//     },
//     progressBar: {
//       marginBottom: 16,
//       paddingHorizontal: 0,
//     },

//     selected:{
//       // width:250,
//       // height:150,
//       // alignItems:'center',
//       // justifyContent:'center',
//       // gap:10,
//       // margin:10,
//       // borderWidth:1,
//       // borderRadius:10,
//       // borderColor:'lightgray',
//       // backgroundColor: internationalPassport == item.value? COLORS.main : 'white'

//     },

//     itemImage:{
//       width:200,
//       height:130,

//     },

   
//     check: {
//       position:'absolute',
//       top:2,
//       right:2,

//     }


// });
