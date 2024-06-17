import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, Keyboard, TouchableOpacity } from "react-native";
// import Constants from "expo-constants";

// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
import { Button, Divider, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign, Feather} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, onSnapshot  } from "firebase/firestore";
import { MaritalStatusData } from "../../data";
import DateTimePicker from '@react-native-community/datetimepicker';
import { VisaContext } from "../../config/VisaContext";

export default function MaritalAndEmploymentScreen({ navigation }) {

  const {visaId} = useContext(VisaContext)

  const { user } = useContext(AuthContext)

  const [userData, setUserData] = useState({})

  const [visaData, setVisaData] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [isMarried, setIsMarried] = useState('married')
  const [children, setChildren] = useState([{firstname : "", birthDay : ""}])
  const [spouseName, setSpouseName] = useState("")
  // const [birthDay, setBirthDay] = useState("")
  const [consent, setConsent] = useState(null)
  
//   const [marriedStatus, setMarriedStatus] = useState(true)

const [dateOfBirth, setDateOfBirth] = useState('');

const [errorSpouseName, setErrorSpouseName] = useState("");

const [errorSpouseDob, setErrorSpouseDob] = useState('');

const [visaDataError, setVisaDataError] = useState('');

// const [showPickerChild, setShowPickerChild] = useState(false);

// const [dateChild, setDateChild] = useState(new Date());


// const [dateOfBirthChild, setDateOfBirthChild] = useState('');

// const [formReady, setFormReady] = useState(false);

// const [dateError, setDateError] = useState('');

const [showPicker, setShowPicker] = useState(false);

const [date, setDate] = useState(new Date());


const toggleDatePicker = () => {
  setShowPicker(!showPicker)
}

const onChangeDate = ({type}, selectedDate ) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate)

      if(Platform.OS ==='android'){
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }

    }else{
      toggleDatePicker();
    }
}

const confirmIOSDate = () => {
  setDateOfBirth(date.toDateString());
  toggleDatePicker();
  
}

    const getVisa = () => {

      onSnapshot(doc(db, "visa", visaId), (doc) => {
    
      //  console.log("Current data: ", doc.data().ConsentOrBirthCertificate);
    
       setVisaData(doc.data())
    
     });
    
    
    }
    
    useEffect(()=>{
    
      getVisa()
    
    }, [])


    // const getVisa = async() => {

    //   const docRef = doc(db, "visa", visaId);
  
    //     const docSnap = await getDoc(docRef);
        
    //     if (docSnap.exists()) {
  
    //       setVisaData(docSnap.data().ConsentOrBirthCertificate)
          
    //     } else {
  
    //       console.log("No such document!");
    //     }
    // }
  
    // useEffect(()=>{

    //   getVisa()
  
    // }, [])

     

      console.log(user.uid)

      console.log('consent Letter: ',visaData)



    const handleAdd = () => {
            
        setChildren([...children, {firstname : "", birthDay : ""}])

    }

    const handleDelete = (i) => {
            
        const deleteVal = [...children]
        deleteVal.splice(i, 1)
        setChildren(deleteVal)

      }


    const handleChangeName = (e,i) => {
      // const { name, value } = text;
      const onChangeVal = [...children]
            onChangeVal[i].firstname = e
            // onChangeVal[i].i = i
            setChildren(onChangeVal)


    }

    const handleChangeDate = (e,i) => {
      // const { name, value } = text;
      const onChangeVal = [...children]
            onChangeVal[i].birthDay = e
            // onChangeVal[i].i = i
            setChildren(onChangeVal)


    }


    // const handleChange = (event, index) => {
    //   let { name, value } = event.target;
    //   let onChangeValue = [...inputs];
    //   onChangeValue[index][name] = value;
    //   setInputs(onChangeValue);
    // };

    const deleteConsentLetterImage = () => {

    }
    
    
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



    
      
      const handleSubmit = async() => {

        Keyboard.dismiss()

        if (isMarried === 'married') {

            if(spouseName === ""){

              return setErrorSpouseName('Please enter your spouse name');
              
            }

            if(dateOfBirth === ""){

              return setErrorSpouseDob('Please enter your spouse Date of Birth');
              
            }

            if(children !== null){

              if(visaData === ""){

                return setVisaDataError('Consent letter is required');
                
              }

            }

           

            

              setLoading(true);

            try {
      
              await updateDoc(doc(db, "visa",visaId), {
      
                  spouseName: spouseName,
                  spouseDob: dateOfBirth,
                  children: children,
                  isMarried: isMarried,
                  timeStamp: serverTimestamp(),
      
              })

             
    
            .then(async() => {
    
              await updateDoc(doc(db, "travellers", user.uid), {
    
                marital: true,
    
             })
    
             setLoading(false)
              
            setLoading(false)
                
            navigation.navigate("ParentScreen");
    
            
            })
          
        } catch (error) {
    
          console.log('error:',error.message)
    
        }
          
        } else {

          setLoading(false)
          navigation.navigate("ParentScreen");
          
        }
         
        
         

        
    
      }
    

 console.log('children: ', children)

  return (
    <View style={styles.container}>
      <Loader visible ={loading}/>
    
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
      <BackArrow onPress={() => navigation.goBack()}/>
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Marital Information</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
      <View style={{marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Fill in all Informations</Text>  
        {/* <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text> */}
      </View> 

     <View style={{marginBottom:50}}>

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:5}}>Are you Married?</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>

                {MaritalStatusData.map(item => {
                return (
                    <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        <Pressable key= {item.value} onPress={() => setIsMarried(item.value)} style={{
                        width:30,
                        height:30,
                        flexDirection:'column',

                        position:'relative',

                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:10,
                        borderWidth:1,
                        backgroundColor:'white',
                        borderColor: isMarried == item.value? COLORS.main : 'lightgray',
                        position:'relative'
                    
                        }}>
                        {isMarried === item.value ? <View style={styles.check}>
                            <FontAwesome name="check" size={20} color='darkblue'/>
                        </View> : null}
                        
                        </Pressable>

                        <Text style={{
                            fontSize:13,
                            color: isMarried == item.value? COLORS.main : 'black',
                        }}>
                            {item.title}
                        </Text>

                        </View>

                    </View>
                    
                )
                })}

                </View>

                
            </View> 

            {isMarried === 'married'?

                <>

                <View>

                  
                  <TextInput
                      type='text'
                      style={{  }}
                      label='Spouse Name'
                      mode='outlined'
                      value={spouseName}
                      onChangeText={(e) => setSpouseName(e)}
                  />

                  {errorSpouseName &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSpouseName}</Text>
                  }
                  </View>


            <View style={{ width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                {showPicker && (

                  <DateTimePicker
                    
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange = {onChangeDate}
                    style={{height:70, marginTop:-10, width:'100%'}}
                  />

                )
                }

                {showPicker && Platform.OS === 'ios' && (
                    <View
                      style={{
                        flexDirection:'row',
                        justifyContent:'space-between'
                      }}
                    >
                        <TouchableOpacity
                          style={{
                            backgroundColor:'#11182711', paddingHorizontal:20, height:50,
                            justifyContent:'center', alignItems:'center', borderRadius:50,
                            marginTop:10, marginBottom:15
                          }}

                          onPress={toggleDatePicker}
                        >
                          <Text
                            style={{
                              color:'#075985',
                              fontSize:14,
                              fontWeight:"500"
                            }}
                          >Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            backgroundColor:COLORS.main, paddingHorizontal:20, height:50,
                            justifyContent:'center', alignItems:'center', borderRadius:50,
                            marginTop:10, marginBottom:15
                          }}

                          onPress={confirmIOSDate}
                        >
                          <Text
                            style={{
                              color:'#fff',
                              fontSize:14,
                              fontWeight:"500"
                            }}
                          >Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}



                {!showPicker && (

                <Pressable
                    onPress={toggleDatePicker}
                    >
                    <TextInput
                      mode="outlined"
                      placeholder='Date of Birth'
                      label='Date of Birth'
                      value={dateOfBirth}
                      onChangeText = {e => setDateOfBirth(e)}
                      placeholderTextColor='#000'
                      editable={false}
                      style={{
                          color:!showPicker && 'black',width:316, borderBottomWidth:0
                      }}
                      onPressIn={toggleDatePicker}
                    />
                </Pressable>

                )

                }

                <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>

                <AntDesign name="calendar" size={24} color="black" />
                </View>

                <View>
                  {errorSpouseDob &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSpouseDob}</Text>
                  }
                </View>
                

              </View> 
                
                  

                    {/* <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Marriage Date (certificate date)'
                        mode='outlined'
                    /> */}
                    <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:15}}>
                        <Text>Add Child Info (if any)</Text>
                        <TouchableOpacity onPress={() => handleAdd()} style={{paddingVertical:10, paddingHorizontal:20,backgroundColor:COLORS.main, borderRadius:5}}>
                             <Text style={{color:'white', fontWeight:'500'}}>+Add</Text> 
                        </TouchableOpacity>
                    </View>
                        {
                            children.map((val, i) =>
                                <View key = {i} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:40 }}>
                                    <View style={{flexDirection:'column', width:'70%'}}>
                                    <TextInput
                                        type='text'
                                        style={{ marginTop: 5 }}
                                        label='firstname'
                                        mode='outlined'
                                        value={val.firstname}
                                        onChangeText={e => handleChangeName(e,i)}
                                        name = "firstname"
                                    />

                                    
                                    <TextInput
                                        type='text'
                                        style={{ marginTop: 5 }}
                                        label='12 June, 2015'
                                        mode='outlined'
                                        value={val.birthDay}
                                        onChangeText={e => handleChangeDate(e,i)}
                                        name = "birthDay"
                                        
                                    />


{/* 
                                  <View style={{ alignItems:'center', justifyContent:'flex-start', borderRadius:5,  marginVertical:10,  }}>

                                    {showPickerChild && (

                                      <DateTimePicker
                                        
                                        mode='date'
                                        display='spinner'
                                        value={dateChild}
                                        onChange = {onChangeDateChild}
                                        // style={{height:70, marginTop:-10, width:'100%'}}
                                      />

                                    )
                                    }

                                    {showPickerChild && Platform.OS === 'ios' && (
                                        <View
                                          style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                          }}
                                        >
                                            <TouchableOpacity
                                              style={{
                                                backgroundColor:'#11182711', paddingHorizontal:20, height:50,
                                                justifyContent:'center', alignItems:'center', borderRadius:50,
                                                marginTop:10, marginBottom:15
                                              }}

                                              onPress={toggleDatePickerChild}
                                            >
                                              <Text
                                                style={{
                                                  color:'#075985',
                                                  fontSize:14,
                                                  fontWeight:"500"
                                                }}
                                              >Cancel</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                              style={{
                                                backgroundColor:COLORS.main, paddingHorizontal:20, height:50,
                                                justifyContent:'center', alignItems:'center', borderRadius:50,
                                                marginTop:10, marginBottom:15
                                              }}

                                              onPress={confirmIOSDateChild}
                                            >
                                              <Text
                                                style={{
                                                  color:'#fff',
                                                  fontSize:14,
                                                  fontWeight:"500"
                                                }}
                                              >Confirm</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}



                                    {!showPickerChild && (

                                    <Pressable
                                        onPress={toggleDatePickerChild}
                                        >
                                        <TextInput
                                          placeholder='Child Date of Birth'
                                          value={dateOfBirthChild}
                                          // onChangeText = {e => setDateOfBirth(e)}
                                          placeholderTextColor='#000'
                                          editable={false}
                                          style={{
                                              color:!showPicker && 'black',width:220,
                                          }}
                                          onPressIn={toggleDatePicker}


                                          // type='text'
                                          // style={{ marginTop: 5 }}
                                          label='Date of Birth'
                                          mode='outlined'
                                          // value={val.birthDay}
                                          onChangeText={(e) => handleChange(e,i)}
                                        />
                                    </Pressable>

                                    )

                                    }

                                    </View>  */}


                                    </View>
                                    <Pressable onPress={() => handleDelete(i)} style={{paddingVertical:10, paddingHorizontal:20,backgroundColor:'brown', borderRadius:5}}>
                                        <Text style={{color:'white'}}>Delete</Text>
                                    </Pressable>
                                </View>
                                

                            )
                        }
                    </View>
                </>

                :

                ''

            }

     
      
        {/* {errorMessage &&
          <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
        } */}
   
       
        
     </View> 



     </View>
    </ScrollView>
      <Pressable onPress = {handleSubmit}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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
      marginTop:12,
      height:50,
      borderWidth:1,
      borderRadius:5,
      borderColor:'gray',
      // backgroundColor:'blue',
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',
      paddingLeft:10,
      paddingRight: 5
    }


});























// import React, { useEffect, useState } from 'react'
// import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

// const MaritalAndEmploymentScreen = ()=>{
  
//   const [inputs, setInputs] = useState([{key: '', value: ''}]);

//   const addHandler = ()=>{
//     const _inputs = [...inputs];
//     _inputs.push({key: '', value: ''});
//     setInputs(_inputs);
//   }
  
//   const deleteHandler = (key)=>{
//     const _inputs = inputs.filter((input,index) => index != key);
//     setInputs(_inputs);
//   }

//   const inputHandler = (text, key)=>{
//     const _inputs = [...inputs];
//     _inputs[key].value = text;
//     _inputs[key].key   = key;
//     setInputs(_inputs);
    
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.inputsContainer}>
//       {inputs.map((input, key)=>(
//         <View key={key} style={styles.inputContainer}>
//           <TextInput placeholder={"Enter Name"} value={input.value}  onChangeText={(text)=>inputHandler(text,key)}/>
//           <TouchableOpacity onPress = {()=> deleteHandler(key)}>
//             <Text style={{color: "red", fontSize: 13}}>Delete</Text>
//           </TouchableOpacity> 
//         </View>
//       ))}
//       </ScrollView>
//       <Button title="Add" onPress={addHandler} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white'
//   },
//   inputsContainer: {
//     flex: 1, marginBottom: 20
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: "lightgray"
//   }
// })

// export default MaritalAndEmploymentScreen

