import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
// import Constants from "expo-constants";

// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
import { Button, Divider, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { EmploymentStatusData, MaritalStatusData } from "../../data";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { VisaContext } from "../../config/VisaContext";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EmploymentScreen({ navigation }) {

  
  const {visaId} = useContext(VisaContext)
  
  const [loading, setLoading] = useState(false)

  const [isEmployed, setIsEmployed] = useState('employed')

  const [currentCompany, setCurrentCompany] = useState("")  

  const [companyAddress, setCompanyAddress] = useState("") 

  const [natureOfJob, setNatureOfJob] = useState("")  

  const [workPosition, setWorkPosition] = useState("")    

  const [jobDuties, setJobDuties] = useState("") 

  const [previousCompany, setPreviousCompany] = useState("")   

  const [previousCompanyAddress, setPreviousCompanyAddress] = useState("") 

  const [previousCompanyNatureOfJob, setPreviousCompanyNatureOfJob] = useState("")  

  const [previousJobPosition, setPreviousJobPosition] = useState("")  

  const [previousJobDuties, setPreviousJobDuties] = useState("") 
           
  const [showPickerEmploymentDate, setShowPickerEmploymentDate] = useState(false);

  const [dateEmployment, setDateEmployment] = useState(new Date());

  const [dateOfEmployment, setDateOfEmployment] = useState('');

  const [showPickerPreviousCompanyDateOfEmployment, setShowPickerPreviousCompanyDateOfEmployment] = useState(false);


  const [dateOfPreviousEmployment, setDateOfPreviousEmployment] = useState('');


  const [datePreviouslyEmployed, setDatePreviouslyEmployed] = useState(new Date());

  const [errorCurrentCompany, setErrorCurrentCompany] = useState("")

  const [errorCompanyAddress, setErrorCompanyAddress] = useState("")

  const [errorNatureOfJob, setErrorNatureOfJob] = useState("")

  const [errorDateOfEmployment, setErrorDateOfEmployment] = useState("")

  const [errorWorkPosition, setErrorWorkPosition] = useState("")

  const [errorJobDuties, setErrorJobDuties] = useState("")

  const [errorPreviousCompany, setErrorPreviousCompany] = useState("")

  const [errorPreviousCompanyAddress, setErrorPreviousCompanyAddress] = useState("")

  const [errorPreviousCompanyNatureOfJob, setErrorPreviousCompanyNatureOfJob] = useState("")

  const [errorPreviousDateOfEmployment, setErrorPreviousDateOfEmployment] = useState("")

  const [errorPreviousJobPosition, setErrorPreviousJobPosition] = useState("")

  const [errorPreviousJobDuties, SetErrorPreviousJobDuties] = useState("")


  const toggleDatePickerEmployment = () => {
    setShowPickerEmploymentDate(!showPickerEmploymentDate)
  }

  const onChangeDateEmployment = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDateEmployment(currentDate)

        if(Platform.OS ==='android'){
          toggleDatePickerEmployment();
          setDateOfEmployment(currentDate.toDateString());
        }

      }else{
        toggleDatePickerEmployment();
      }
  }

  const confirmIOSDateEmployment = () => {
    setDateOfEmployment(date.toDateString());
    toggleDatePickerEmployment();
    
  }

  // Previous Employment date Info

  const toggleDatePreviouslyEmployed = () => {
    setShowPickerPreviousCompanyDateOfEmployment(!showPickerPreviousCompanyDateOfEmployment)
  }

  const onChangeDatePreviousEmployedDate = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDatePreviouslyEmployed(currentDate)

        if(Platform.OS ==='android'){
          toggleDatePreviouslyEmployed();
          setDateOfPreviousEmployment(currentDate.toDateString());
        }

      }else{
        toggleDatePreviouslyEmployed();
      }
  }

  const confirmIOSDatePreviousEmployedDate = () => {
    setDateOfPreviousEmployment(date.toDateString());
    toggleDatePreviouslyEmployed();
    
  }

      const { user } = useContext(AuthContext)

      console.log(user.uid)

      console.log(isEmployed)


      const handleMyEmployment = async() => {

                if (isEmployed === 'employed') {

                  if(currentCompany === ""){

                    return setErrorCurrentCompany('Please required field');
                    
                  }

                  if(companyAddress === ""){

                    return setErrorCompanyAddress('Please required field');
                    
                  }
          
                  if(natureOfJob === ""){
          
                    return setErrorNatureOfJob('Please required field');
                    
                  }
          
                  if(dateOfEmployment === ""){
          
                    return setErrorDateOfEmployment('Please required field');
                    
                  }
          
               
                  if(workPosition === ""){
          
                    return setErrorWorkPosition('Please required field');
                    
                  }

                  
                  if(jobDuties === ""){

                    return setErrorJobDuties('Please required field');
                    
                  }

                  if(previousCompany === ""){

                    return setErrorPreviousCompany('Please required field');
                    
                  }
          
                  if(previousCompanyAddress === ""){
          
                    return setErrorPreviousCompanyAddress('Please required field');
                    
                  }
          
                  if(previousCompanyNatureOfJob === ""){
          
                    return setErrorPreviousCompanyNatureOfJob('Please required field');
                    
                  }
          
               
                  if(dateOfPreviousEmployment === ""){
          
                    return setErrorPreviousDateOfEmployment('Please required field');
                    
                  }

                  if(previousJobPosition === ""){
          
                    return setErrorPreviousJobPosition('Please required field');
                    
                  }
          
               
                  if(previousJobDuties === ""){
          
                    return SetErrorPreviousJobDuties('Please required field');
                    
                  }
                  


                  setLoading(true);

                try {
          
                  await updateDoc(doc(db, "visa", visaId), {
          
                    currentCompany : currentCompany,                    
                    companyAddress :  companyAddress,                   
                    natureOfJob : natureOfJob,
                    dateOfEmployment : dateOfEmployment,
                    workPosition : workPosition,
                    jobDuties : jobDuties,
                    previousCompany : previousCompany,
                    previousCompanyAddress : previousCompanyAddress,
                    previousCompanyNatureOfJob : previousCompanyNatureOfJob,
                    dateOfPreviousEmployment : dateOfPreviousEmployment,
                    previousJobPosition : previousJobPosition,      
                    previousJobDuties : previousJobDuties,
                    isEmployed : isEmployed,
                    timeStamp: serverTimestamp(),
          
                  }).then(async() => {

                    await updateDoc(doc(db, "travellers", user.uid), {
          
                      currentCompany : currentCompany,                    
                      companyAddress :  companyAddress,                   
                      natureOfJob : natureOfJob,
                      dateOfEmployment : dateOfEmployment,
                      workPosition : workPosition,
                      jobDuties : jobDuties,
                      previousCompany : previousCompany,
                      previousCompanyAddress : previousCompanyAddress,
                      previousCompanyNatureOfJob : previousCompanyNatureOfJob,
                      dateOfPreviousEmployment : dateOfPreviousEmployment,
                      previousJobPosition : previousJobPosition,      
                      previousJobDuties : previousJobDuties,
                      isEmployed : isEmployed,
                      timeStamp: serverTimestamp(),
                   })
          

                  setLoading(false)
                    
                  navigation.navigate("TravelHistoryScreen");

                })
             
                } catch (error) {

                  console.log('error:',error.message)

                }

          }

            if (isEmployed === 'unemployed') {

              try{

              await updateDoc(doc(db, "visa", visaId), {
          
                isEmployed : isEmployed,
                timeStamp: serverTimestamp(),
      
              });

              setLoading(false)
                
              navigation.navigate("TravelHistoryScreen");

         
              } catch (error) {

                console.log('error:',error.message)

              }

            } 
    
      }
    

  //   const handleMyProfile = async() => {


     

      
  //   //   if(employmentLetter === null){

  //   //     return setErrorMessage('Please choose an option');
        
  //   //   }
  //   navigation.navigate("ParentScreen");

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
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Employment Information</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
      <View style={{marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Fill in all Informations</Text>  
        {/* <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text> */}
      </View> 

     <View style={{marginBottom:50}}>

        {/* <Text style={{fontSize:16, marginBottom:5, fontWeight:'500'}}>Please Fill in this Information as it is in your International Passport</Text> */}

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:5}}>Are you Employed?</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>

                {EmploymentStatusData.map(item => {
                return (
                    <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        <Pressable key= {item.value} onPress={() => setIsEmployed(item.value)} style={{
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
                        borderColor: isEmployed == item.value? COLORS.main : 'lightgray',
                        position:'relative'
                    
                        }}>
                        {isEmployed === item.value ? <View style={styles.check}>
                            <FontAwesome name="check" size={20} color='darkblue'/>
                        </View> : null}
                        
                        </Pressable>

                        <Text style={{
                            fontSize:13,
                            color: isEmployed == item.value? COLORS.main : 'black',
                        }}>
                            {item.title}
                        </Text>

                        </View>

                    </View>
                    
                )
                })}

                </View>

            </View> 

            {isEmployed === 'employed'?

                <>
                
                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Current Comapany name'
                        mode='outlined'
                        onChangeText = {e => setCurrentCompany(e)}
                        value={currentCompany}
                    />

                    {errorCurrentCompany &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorCurrentCompany}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='current company address'
                        mode='outlined'
                        onChangeText = {e => setCompanyAddress(e)}
                        value={companyAddress}
                    />
                     {errorCompanyAddress &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorCompanyAddress}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Nature of your job'
                        mode='outlined'
                        onChangeText = {e => setNatureOfJob(e)}
                        value={natureOfJob}
                    />

                    {errorNatureOfJob &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorNatureOfJob}</Text>
                    }



                    <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                    {showPickerEmploymentDate && (

                      <DateTimePicker
                        
                        mode='date'
                        display='spinner'
                        value={dateEmployment}
                        onChange = {onChangeDateEmployment}
                        style={{height:70, marginTop:-10, width:'100%'}}
                      />

                    )
                    }

                    {showPickerEmploymentDate && Platform.OS === 'ios' && (
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

                              onPress={toggleDatePickerEmployment}
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

                              onPress={confirmIOSDateEmployment}
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



                    {!showPickerEmploymentDate && (

                    <Pressable
                        onPress={toggleDatePickerEmployment}
                        >
                        <TextInput
                          mode="outlined"
                          placeholder='Date of Current Employment'
                          label='Date of Current Employment'
                          value={dateOfEmployment}
                          onChangeText = {e => setDateOfEmployment(e)}
                          placeholderTextColor='#000'
                          editable={false}
                          style={{
                              color:!showPickerEmploymentDate && 'black',width:316, borderBottomWidth:0
                          }}
                          onPressIn={toggleDatePickerEmployment}
                        />
                    </Pressable>

                    )

                    }

                      <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                        <AntDesign name="calendar" size={24} color="black" />
                     
                      </View>
                  

                    </View> 
                    {errorDateOfEmployment &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfEmployment}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Your position at work e.g Manager'
                        mode='outlined'
                        onChangeText = {e => setWorkPosition(e)}
                        value={workPosition}
                    />

                    {errorWorkPosition &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorWorkPosition}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='briefly explain job duties'
                        mode='outlined'
                        onChangeText = {e => setJobDuties(e)}
                        value={jobDuties}
                    />
                       {errorJobDuties &&
                          <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorJobDuties}</Text>
                       }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Previous company name'
                        mode='outlined'
                        onChangeText = {e => setPreviousCompany(e)}
                        value={previousCompany}
                    />

                    {errorPreviousCompany &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousCompany}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='previous company address'
                        mode='outlined'
                        onChangeText = {e => setPreviousCompanyAddress(e)}
                        value={previousCompanyAddress}
                    />
                    {errorPreviousCompanyAddress &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousCompanyAddress}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Nature of the job'
                        mode='outlined'
                        onChangeText = {e => setPreviousCompanyNatureOfJob(e)}
                        value={previousCompanyNatureOfJob}
                    />

                    {errorPreviousCompanyNatureOfJob &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousCompanyNatureOfJob}</Text>
                    }
                

                    <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                    {showPickerPreviousCompanyDateOfEmployment && (

                      <DateTimePicker
                        
                        mode='date'
                        display='spinner'
                        value={datePreviouslyEmployed}
                        onChange = {onChangeDatePreviousEmployedDate}
                        style={{height:70, marginTop:-10, width:'100%'}}
                      />

                    )
                    }

                    {showPickerPreviousCompanyDateOfEmployment && Platform.OS === 'ios' && (
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

                              onPress={toggleDatePreviouslyEmployed}
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

                              onPress={confirmIOSDatePreviousEmployedDate}
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



                        {!showPickerPreviousCompanyDateOfEmployment && (

                        <Pressable
                            onPress={toggleDatePreviouslyEmployed}
                            >
                            <TextInput
                              mode="outlined"
                              placeholder='Date of Previous Employment'
                              label='Date of Previous Employment'
                              value={dateOfPreviousEmployment}
                              onChangeText = {e => setDateOfPreviousEmployment(e)}
                              placeholderTextColor='#000'
                              editable={false}
                              style={{
                                  color:!showPickerPreviousCompanyDateOfEmployment && 'black',width:316, borderBottomWidth:0
                              }}
                              onPressIn={toggleDatePreviouslyEmployed}
                            />
                        </Pressable>

                        )

                        }

                      <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                        <AntDesign name="calendar" size={24} color="black" />
                      </View>    

                    </View> 
                    {errorPreviousDateOfEmployment &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousDateOfEmployment}</Text>
                    }
                                        


                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Your Positon at your last job'
                        mode='outlined'
                        onChangeText = {e => setPreviousJobPosition(e)}
                        value={previousJobPosition}
                    />

                    {errorPreviousJobPosition &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousJobPosition}</Text>
                    }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='explain your job duties'
                        mode='outlined'
                        onChangeText = {e => setPreviousJobDuties(e)}
                        value={previousJobDuties}
                    />
                    {errorPreviousJobDuties &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPreviousJobDuties}</Text>
                    }

                </>

                :

                ''

            }

     </View> 
     
     </View>
    </ScrollView>
      <Pressable onPress = {handleMyEmployment}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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

    }


});
