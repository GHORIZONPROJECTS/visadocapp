import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView } from "react-native";
// import Constants from "expo-constants";

// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
import { Button, Divider, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, Feather} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db, storage } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, onSnapshot , deleteField } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable,  deleteObject} from "firebase/storage";
import { DestinationChoiceData, EmploymentStatusData, MaritalStatusData, RelativeData, TravelHistoryData } from "../../data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { VisaContext } from "../../config/VisaContext";

export default function TravelHistoryScreen({ navigation }) {
  
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const [travelled, setTravelled] = useState('travelled')

  const [haveRelative, setHaveRelative] = useState('haveRelative')

  const [relativeName, setRelativeName] = useState('')

  const [relativeAddress, setRelativeAddress] = useState('')
  
  const [refused, setRefused] = useState('refused')

  const [errorReletiveName, setErrorRelativeName] = useState('');

  const [errorRelativeAddress, setErrorRelativeAddress] = useState('');

  const [errorHistory, setHistoryError] = useState("")

  const [errorDecision, setDecisionError] = useState("")

  const [history, setHistory] = useState("")

  const [decision, setDecision] = useState("")



  const getVisaHistory = () => {

    onSnapshot(doc(db, "visa", visaId), (doc) => {
  
    //  console.log("Current data: ", doc.data().travelHistoryPage);
  
     setHistory(doc.data().travelHistoryImage)
  
   });
  
  }
  
  useEffect(()=>{
  
    getVisaHistory()
  
  }, [history])


  const deleteDecisionLetterImage = () => {

    const deleteRef = ref(storage, decision);

    // Delete the file
    deleteObject(deleteRef).then(async() => {


    const visaRef = doc(db, 'visa', visaId);

    // Remove the 'capital' field from the document
    await updateDoc(visaRef, {
      decisionLetterImage: deleteField()
    });

    
    Alert.alert("Photo deleted successfully")

   
    // navigation.navigate("StatementOfAccountImageScreen")

  }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
  });



  }



  const deleteTravelHistoryImage = () => {

    const deleteRef = ref(storage, history);

    // Delete the file
    deleteObject(deleteRef).then(async() => {


    const visaRef = doc(db, 'visa', visaId);

    // Remove the 'capital' field from the document
    await updateDoc(visaRef, {
      travelHistoryImage: deleteField()
    });

    
    Alert.alert("Photo deleted successfully")

   
    // navigation.navigate("StatementOfAccountImageScreen")

  }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
  });



  }

  // const getVisa = async() => {

  //   const docRef = doc(db, "visa", visaId);

  //     const docSnap = await getDoc(docRef);
      
  //     if (docSnap.exists()) {

  //       setHistory(docSnap.data().travelHistoryPage)
        
  //     } else {

  //       console.log("No such document!");
  //     }
  // }

  // useEffect(()=>{

  //   getVisa()

  // }, [history])


  
  const getVisaDecision = () => {

    onSnapshot(doc(db, "visa", visaId), (doc) => {
  
    //  console.log("Current data: ", doc.data().decisionLetterImage);
  
     setDecision(doc.data().decisionLetterImage)
  
   });
  
  }
  
  useEffect(()=>{
  
    getVisaDecision()
  
  }, [decision])


  // const getVisaDecision = async() => {

  //   const docRef = doc(db, "visa", visaId);

  //     const docSnap = await getDoc(docRef);
      
  //     if (docSnap.exists()) {

  //       setDecision(docSnap.data().decisionLetter)
        
  //     } else {

  //       console.log("No such document!");
  //     }
  // }

  // useEffect(()=>{

  //   getVisaDecision()

  // }, [])
//   const [marriedStatus, setMarriedStatus] = useState(true)

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerLeft: () => null,
    //     });
    // }, [navigation]);

    // const {
    //     handleSubmit,
    //     control,
    //     formState: { errors },
    //   } = useForm({ defaultValues: WizardStore.useState((s) => s) });
    //   const isFocused = useIsFocused();
    
    //   useEffect(() => {
    //     isFocused &&
    //       WizardStore.update((s) => {
    //         s.progress = 0;
    //       });
    
    //   }, [isFocused]);
    
    //   const onSubmit = (internationalPassport) => {
    //     WizardStore.update((s) => {
    //       s.progress = 33;
    //       s.service = internationalPassport.value;
    //       // s.age = data.age;
    //     });
    //     navigation.navigate("");
    //   };

      const { user } = useContext(AuthContext)

      const {visaId} = useContext(VisaContext)

      console.log(user.uid)


      const handleMyTravel = async() => {

        

        if (travelled === 'travelled' && haveRelative === 'haveRelative' && refused === 'refused') {

            if(relativeName === ""){

              return setErrorRelativeName('Please enter field');
              
            }

            if(relativeAddress === ""){

              return setErrorRelativeAddress('Please enter field');
              
            }

            if(history === ""){

              return setHistoryError('Travel History letter is required');
              
            }

            if(decision === ""){

              return setHistoryError('decision letter is required');
              
            }
             
            setLoading(true);

            try {
      
              await updateDoc(doc(db, "visa", visaId), {
      
                  travelledBefore : travelled,
                  haveRelative : haveRelative,
                  relativeName : relativeName,
                  relativeAddress : relativeAddress,
                  refused : refused,
                  timeStamp: serverTimestamp(),
      
              });

              setLoading(false)
                
              navigation.navigate("DocumentsAvailableScreen");
    
            // .then(async() => {
    
            //   await updateDoc(doc(db, "travellers", user.uid), {
    
            //     surname: surname,
            //     gender: gender,
            //     socials: socials,
            //     timeStamp: serverTimestamp(),
    
            //  })
    
            //  setLoading(false)
              
            //   navigation.navigate("MaritalAndEmploymentScreen");
    
            
    
          
        } catch (error) {
    
          console.log('error:',error.message)
    
        }
          
        } 
         

        if (travelled === 'notTravelled' && haveRelative === 'dntHaveRelative' && refused === 'notRefused') {

             

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
          // .then(async() => {
  
          //   await updateDoc(doc(db, "travellers", user.uid), {
  
          //     surname: surname,
          //     gender: gender,
          //     socials: socials,
          //     timeStamp: serverTimestamp(),
  
          //  })
  
          //  setLoading(false)
            
          //   navigation.navigate("MaritalAndEmploymentScreen");
  
          
  
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (travelled === 'travelled' && haveRelative === 'dntHaveRelative' && refused === 'refused') {

          if(history === ""){

            return setHistoryError('Travel history page is required');
            
          }

          if(decision === ""){

            return setDecisionError('Decision letter is required');
            
          }

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
          // .then(async() => {
  
          //   await updateDoc(doc(db, "travellers", user.uid), {
  
          //     surname: surname,
          //     gender: gender,
          //     socials: socials,
          //     timeStamp: serverTimestamp(),
  
          //  })
  
          //  setLoading(false)
            
          //   navigation.navigate("MaritalAndEmploymentScreen");
  
          
  
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (travelled === 'travelled' && haveRelative === 'dntHaveRelative' && refused === 'notRefused') {

          if(history === ""){

            return setHistoryError('Travel history page is required');
            
          }
           

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
        
          } catch (error) {
      
            console.log('error:',error.message)
      
          }
        
        } 
        
        if (travelled === 'notTravelled' && haveRelative === 'haveRelative' && refused === 'notRefused') {

          if(relativeName === ""){

            return setErrorRelativeName('Please enter field');
            
          }

          if(relativeAddress === ""){

            return setErrorRelativeAddress('Please enter field');
            
          }

        

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              relativeName : relativeName,
              relativeAddress : relativeAddress,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
          // .then(async() => {
  
          //   await updateDoc(doc(db, "travellers", user.uid), {
  
          //     surname: surname,
          //     gender: gender,
          //     socials: socials,
          //     timeStamp: serverTimestamp(),
  
          //  })
  
          //  setLoading(false)
            
          //   navigation.navigate("MaritalAndEmploymentScreen");
  
          
  
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (travelled === 'notTravelled' && haveRelative === 'dntHaveRelative' && refused === 'refused') {

        
          if(decision === ""){

            return setHistoryError('decision letter is required');
            
          }

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
         
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (travelled === 'travelled' && haveRelative === 'haveRelative' && refused === 'notRefused') {

          if(relativeName === ""){

            return setErrorRelativeName('Please enter field');
            
          }

          if(relativeAddress === ""){

            return setErrorRelativeAddress('Please enter field');
            
          }

          if(history === ""){

            return setHistoryError('History letter is required');
            
          }

      
           
          setLoading(true); 

          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
              travelledBefore : travelled,
              haveRelative : haveRelative,
              relativeName : relativeName,
              relativeAddress : relativeAddress,
              refused : refused,
              timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("DocumentsAvailableScreen");
  
          // .then(async() => {
  
          //   await updateDoc(doc(db, "travellers", user.uid), {
  
          //     surname: surname,
          //     gender: gender,
          //     socials: socials,
          //     timeStamp: serverTimestamp(),
  
          //  })
  
          //  setLoading(false)
            
          //   navigation.navigate("MaritalAndEmploymentScreen");
  
          
  
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        
    
      }


      // const getUser = async() => {
      //   const docRef = doc(db, "travellers", user.uid);
      //     const docSnap = await getDoc(docRef);
          
      //     if (docSnap.exists()) {
    
      //       setUserData(docSnap.data())
            
      //     } else {
    
      //       console.log("No such document!");
      //     }
      // }
    
      // useEffect(()=>{
      //   getUser()
      // }, [])
    
      // console.log(userData)
    

  //   const handleMyProfile = async() => {


     

      
  //   //   if(employmentLetter === null){

  //   //     return setErrorMessage('Please choose an option');
        
  //   //   }
  //   navigation.navigate("DocumentsAvailableScreen");

  //   //     try {

  //   //       setLoading(true)

  //   //        await updateDoc(doc(db, "travellers", user.uid), {
        
  //   //    internationalPassport : internationalPassport,
      
  //   //    timeStamp: serverTimestamp(),
        

  //   // }).then(() => {
  //   //   setLoading(false)
  //   //   // showToast()
  //   //   // if (condition) {
        
  //   //   // } else {
        
  //   //   // }
  //   //   navigation.navigate("UserInformationScreen");
        
  //   // })
  //   // navigation.navigate("UserInformationScreen");
          
  //   //     } catch (error) {
  //   //       console.log('error:',error.message)
  //   //     }

       
  //   //   }else{

  //   //     return setErrorMessage('Please select your visa Type');
        
  //   //   }
        
  // }


  return (
    <View style={styles.container}>
      <Loader visible ={loading}/>
    {/* <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color={MD3Colors.primary60}
    /> */}
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
      <BackArrow onPress={() => navigation.goBack()}/>
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Travel History</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
      <View style={{marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Fill in all Informations</Text>  
        {/* <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text> */}
      </View> 

     <View style={{marginBottom:50}}>


     <View style={{marginBottom:20}}>

        <Text style={{fontSize:16, marginBottom:5}}>Have you travelled before?</Text>

        <View style={{flexDirection:'row', marginTop:20}}>

        {TravelHistoryData.map(item => {

        return (
          
            <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                <View style={{flexDirection:'row', alignItems:'center',}}>

                <Pressable key= {item.value} onPress={() => setTravelled(item.value)} style={{
                width:30,
                height:30,
                flexDirection:'column',

                position:'relative',

                alignItems:'center',
                justifyContent:'center',
                // gap:10,
                marginRight:10,
                // paddingLeft:20,
                // paddingTop:10,
                borderWidth:1,
                // borderRadius:10,
                backgroundColor:'white',
                borderColor: travelled == item.value? COLORS.main : 'lightgray',
                position:'relative'
            
                }}>
                {travelled === item.value ? <View style={styles.check}>
                    <FontAwesome name="check" size={20} color='darkblue'/>
                </View> : null}
                
                </Pressable>

             

                <Text style={{
                    fontSize:13,
                    color: travelled == item.value? COLORS.main : 'black',
                }}>
                    {item.title}
                </Text>

                </View>

            </View>
            
        )
        })}

        </View>



        {/* {errorMessage &&
        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
        } */}

        </View>

        {travelled === 'travelled' ?

            <View style={styles.formEntryImage}>
            <View style={{ flexDirection:'row', alignItems:'space-between'}}>
            {/* <FontAwesome name="check-circle" size={20} color={visaData.birthCertificate ? 'green' : 'gray'}/> */}
            
            {
                  history ? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>Uploaded Travel History</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Travel History Data Page </Text>
            }
            
            {/* <Text style={{marginHorizontal:5, fontSize:12}}></Text> */}
            {/* {visaData.birthCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
            </View>


            {
                  history ?

                  <TouchableOpacity 
                  onPress={deleteTravelHistoryImage}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:5,
                      paddingHorizontal:30, 
                      backgroundColor:"pink", 
                      borderRadius:5, }}>
                  <Ionicons name="close-sharp" size={20} color="gray" />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity 
                  onPress={() => navigation.navigate("TravelHistoryImageScreen", )}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:5,
                      paddingHorizontal:10, 
                      backgroundColor:COLORS.main, 
                      borderRadius:5, }}>
                  <Feather name="upload" size={20} color="white" />
                  <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                  </TouchableOpacity>


                }
            
{/* 
            <TouchableOpacity 
              onPress={() => navigation.navigate("ScannedTravelHistoryImageScreen")}
              style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:10, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
            <Feather name="upload" size={20} color="white" />
            <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity> */}

            

            </View>

           
          
            :

            ""

            }

            {errorHistory &&
              <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorHistory}</Text>
            } 
            <View style={{marginBottom:0}}>

                <Text style={{fontSize:16, marginBottom:5}}>Do you have any relatives in the destination you are travelling to?</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>

                {RelativeData.map(item => {
                return (
                    <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        <Pressable key= {item.value} onPress={() => setHaveRelative(item.value)} style={{
                        width:30,
                        height:30,
                        flexDirection:'column',

                        position:'relative',

                        alignItems:'center',
                        justifyContent:'center',
                        // gap:10,
                        marginRight:10,
                        // paddingLeft:20,
                        // paddingTop:10,
                        borderWidth:1,
                        // borderRadius:10,
                        backgroundColor:'white',
                        borderColor: haveRelative == item.value? COLORS.main : 'lightgray',
                        position:'relative'
                    
                        }}>
                        {haveRelative === item.value ? <View style={styles.check}>
                            <FontAwesome name="check" size={20} color='darkblue'/>
                        </View> : null}
                        
                        </Pressable>

                        <Text style={{
                            fontSize:13,
                            color: haveRelative == item.value? COLORS.main : 'black',
                        }}>
                            {item.title}
                        </Text>

                        </View>

                    </View>
                    
                )
                })}

                </View>

                

                {/* {errorMessage &&
                <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
                } */}

            </View> 

            {haveRelative === 'haveRelative'?

                <>
                
                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='relative name'
                        mode='outlined'
                        value={relativeName}
                        onChangeText={(e) => setRelativeName(e)}
                    />

                      {errorReletiveName &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorReletiveName}</Text>
                      }
                      

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='relative address'
                        mode='outlined'
                        value={relativeAddress}
                        onChangeText={(e) => setRelativeAddress(e)}
                    />

                      {errorRelativeAddress &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorRelativeAddress}</Text>
                      }

              
                </>

                :

                ''

            }

     
      
        {/* {errorMessage &&
          <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
        } */}
   
       
        
     </View> 


     <View style={{marginBottom:50}}>

        <Text style={{fontSize:16, marginBottom:5}}>Have you been refused at your choice of destination embassy before?</Text>

        <View style={{flexDirection:'row', marginTop:20}}>

        {DestinationChoiceData.map(item => {
        return (
            <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                <View style={{flexDirection:'row', alignItems:'center',}}>

                <Pressable key= {item.value} onPress={() => setRefused(item.value)} style={{
                width:30,
                height:30,
                flexDirection:'column',

                position:'relative',

                alignItems:'center',
                justifyContent:'center',
                // gap:10,
                marginRight:10,
                // paddingLeft:20,
                // paddingTop:10,
                borderWidth:1,
                // borderRadius:10,
                backgroundColor:'white',
                borderColor: refused == item.value? COLORS.main : 'lightgray',
                position:'relative'
            
                }}>
                {refused === item.value ? <View style={styles.check}>
                    <FontAwesome name="check" size={20} color='darkblue'/>
                </View> : null}
                
                </Pressable>

                <Text style={{
                    fontSize:13,
                    color: refused == item.value? COLORS.main : 'black',
                }}>
                    {item.title}
                </Text>

                </View>

            </View>
            
        )
        })}

     

        </View>


        {refused === 'refused' ?


          

          <View style={styles.formEntryImage}>

          {
                  decision ? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>Uploaded Decision Letter</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Decision Letter (Rejection letter)</Text>
            }

            {
                  decision ?

                  <TouchableOpacity 
                  onPress={deleteDecisionLetterImage}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:5,
                      paddingHorizontal:30, 
                      backgroundColor:"pink", 
                      borderRadius:5, }}>
                  <Ionicons name="close-sharp" size={20} color="gray" />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity 
                  onPress={() => navigation.navigate("DecisionLetterImageScreen", )}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:5,
                      paddingHorizontal:10, 
                      backgroundColor:COLORS.main, 
                      borderRadius:5, }}>
                  <Feather name="upload" size={20} color="white" />
                  <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                  </TouchableOpacity>


                }

          </View>

          

          :

          ""

          }
                

          </View> 

      
          {errorDecision &&

            <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDecision}</Text>
          
          }




     </View>


    </ScrollView>
      <Pressable onPress = {handleMyTravel}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
        <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
        <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
          <Ionicons name="chevron-forward" size={24} color="white" />
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
      </Pressable>
    </View>
  );
      
        
  
}

const styles = StyleSheet.create({


    button: {
      padding : 10,
      alignItems: 'center',
      justifyContent :'center',
      margin: 8,
      width:190,
      backgroundColor:COLORS.main,
      width : 250,
      borderRadius : 5
      

    },
    buttonText : {
      fontSize: 18,
      fontWeight : 'bold',
      color : 'white'
    },
    formEntry: {
      margin: 8,
    },
    container: {
      flex: 1,
      flexDirection:'column',
      justifyContent:'space-between',
      paddingHorizontal:20
    },
    progressBar: {
      marginBottom: 16,
      paddingHorizontal: 0,
    },

    selected:{
      // width:250,
      // height:150,
      // alignItems:'center',
      // justifyContent:'center',
      // gap:10,
      // margin:10,
      // borderWidth:1,
      // borderRadius:10,
      // borderColor:'lightgray',
      // backgroundColor: internationalPassport == item.value? COLORS.main : 'white'

    },

    itemImage:{
      width:200,
      height:130,

    },

   
    check: {
      position:'absolute',
      top:2,
      right:2,

    },

    formEntryImage:{
      flex:1,
      marginVertical:12,
      width:316,
      height:50,
      borderWidth:1,
      borderRadius:5,
      borderColor:'gray',
      padding:5,
      // backgroundColor:'blue',
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',
      paddingHorizontal:10
    }


});
