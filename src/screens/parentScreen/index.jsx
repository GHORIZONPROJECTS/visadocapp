import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
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
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { EmploymentStatusData, MaritalStatusData, fatherData, motherData } from "../../data";
import DateTimePicker from '@react-native-community/datetimepicker';
import { VisaContext } from "../../config/VisaContext";
import DropDown from "react-native-paper-dropdown";

const MaritalStatusList = [
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Divorced",
    value: "divorced",
  },
  {
    label: "Seperated",
    value: "seperated",
  },
];

export default function ParentScreen({ navigation }) {
  
  // const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [motherAlive, setMotherAlive] = useState('motherAlive')
  const [fatherAlive, setFatherAlive] = useState('fatherAlive')

  const [fatherFirstname, setFatherFirstname] = useState("")

  const [fatherLastname, setFatherLastname] = useState("")

  const [fatherOthername, setFatherOthername] = useState("")

  const [fatherAddress, setFatherAddress] = useState("")

  const [fatherMaritalStatus, setFatherMaritalStatus] = useState("")


  const [errorFatherFirstname, setErrorFatherFirstname] = useState("")

  const [errorFatherLastname, setErrorFatherLastname] = useState("")

  const [errorFatherAddress, setErrorFatherAddress] = useState("")

  const [errorFatherMaritalStatus, setErrorFatherMaritalStatus] = useState("")
  
  const [errorDateOfBirthFather, setErrorDateOfBirthFather] = useState('');

  const [errorMotherFirstname, setErrorMotherFirstname] = useState("")

  const [errorMotherLastname, setErrorMotherLastname] = useState("")

  const [errorMotherAddress, setErrorMotherAddress] = useState("")

  const [errorMotherMaritalStatus, setErrorMotherMaritalStatus] = useState("")
  
  const [errorDateOfBirthMother, setErrorDateOfBirthMother] = useState('');




  const [motherFirstname, setMotherFirstname] = useState("")

  const [motherLastname, setMotherLastname] = useState("")

  const [motherOthername, setMotherOthername] = useState("")

 const [motherAddress, setMotherAddress] = useState("")

  const [motherMaritalStatus, setMotherMaritalStatus] = useState("")

  const [showPickerFather, setShowPickerFather] = useState(false);

  const [showPickerMother, setShowPickerMother] = useState(false);

  const [dateFather, setDateFather] = useState(new Date());

  const [dateMother, setDateMother] = useState(new Date());

  const {visaId} = useContext(VisaContext)

  const [dateOfBirthFather, setDateOfBirthFather] = useState('');


  const [dateOfBirthMother, setDateOfBirthMother] = useState('');

  const [showDropDownFather, setShowDropDownFather] = useState(false);

  const [showDropDownMother, setShowDropDownMother] = useState(false);

//Father

  const toggleDatePickerFather = () => {
    setShowPickerFather(!showPickerFather)
  }

  const onChangeDateFather = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDateFather(currentDate)

        if(Platform.OS ==='android'){
          toggleDatePickerFather();
          setDateOfBirthFather(currentDate.toDateString());
        }

      }else{
        toggleDatePickerFather();
      }
  }

  const confirmIOSDateFather = () => {
    setDateOfBirthFather(date.toDateString());
    toggleDatePickerFather();
    
  }


  // Mother Date Info

  const toggleDatePickerMother = () => {
    setShowPickerMother(!showPickerMother)
  }

  const onChangeDateMother = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDateMother(currentDate)

        if(Platform.OS ==='android'){
          toggleDatePickerMother();
          setDateOfBirthMother(currentDate.toDateString());
        }

      }else{
        toggleDatePickerMother();
      }
  }

  const confirmIOSDateMother = () => {
    setDateOfBirthMother(date.toDateString());
    toggleDatePickerMother();
    
  }

      const { user } = useContext(AuthContext)

      console.log(user.uid)



      const handleParent = async() => {

        if (fatherAlive === 'fatherAlive' && motherAlive === 'motherAlive') {


          if(fatherFirstname === ""){

            return setErrorFatherFirstname('Please required field');
            
          }

          if(fatherLastname === ""){

            return setErrorFatherLastname('Please required field');
            
          }
          
          if(fatherAddress === ""){

            return setErrorFatherAddress('Please enter field');
            
          }

          if(fatherMaritalStatus === ""){

            return setErrorFatherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthFather === ""){

            return setErrorDateOfBirthFather('Please enter field');
            
          }
        
          
          if(motherFirstname === ""){

            return setErrorMotherFirstname('Please enter field');
            
          }

          if(motherLastname === ""){

            return setErrorMotherLastname('Please enter field');
            
          }
          
          if(motherAddress === ""){

            return setErrorMotherAddress('Please enter field');
            
          }

          if(motherMaritalStatus === ""){

            return setErrorMotherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthMother === ""){

            return setErrorDateOfBirthMother('Please enter field');
            
          }

          setLoading(true);

            try {
      
              await updateDoc(doc(db, "visa", visaId), {

                  fatherAlive : fatherAlive,
                  motherAlive : motherAlive,
                  fatherFirstname : fatherFirstname,
                  fatherLastname: fatherLastname,
                  fatherOthername: fatherOthername,
                  fatherAddress : fatherAddress,
                  dateOfBirthFather : dateOfBirthFather,
                  fatherMaritalStatus : fatherMaritalStatus,
                  motherFirstname : motherFirstname,
                  motherLastname: motherLastname,
                  motherOthername: motherOthername,
                  motherAddress : motherAddress,
                  dateOfBirthMother : dateOfBirthMother,
                  motherMaritalStatus : motherMaritalStatus,

                  timeStamp: serverTimestamp(),
      
              });

              setLoading(false)
                
              navigation.navigate("EducationScreen");
    
       
        } catch (error) {
    
          console.log('error:',error.message)
    
        }
          
        } 
         

        if (fatherAlive === 'fatherAlive' && motherAlive === 'motherLate') {

          if(fatherFirstname === ""){

            return setErrorFatherFirstname('Please required field');
            
          }

          if(fatherLastname === ""){

            return setErrorFatherLastname('Please required field');
            
          }
          
          if(fatherAddress === ""){

            return setErrorFatherAddress('Please enter field');
            
          }

          if(fatherMaritalStatus === ""){

            return setErrorFatherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthFather === ""){

            return setErrorDateOfBirthFather('Please enter field');
            
          }

              
          if(motherFirstname === ""){

            return setErrorMotherFirstname('Please enter field');
            
          }

          if(motherLastname === ""){

            return setErrorMotherLastname('Please enter field');
            
          }
          
          if(motherAddress === ""){

            return setErrorMotherAddress('Please enter field');
            
          }

          if(motherMaritalStatus === ""){

            return setErrorMotherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthMother === ""){

            return setErrorDateOfBirthMother('Please enter field');
            
          }
        
          
         
          setLoading(true); 

          try {
    
            await updateDoc(doc(db, "visa", visaId), {

                fatherAlive : fatherAlive,
                motherAlive : motherAlive,
                fatherFirstname : fatherFirstname,
                fatherLastname: fatherLastname,
                fatherOthername: fatherOthername,
                fatherAddress : fatherAddress,
                motherLastname: motherLastname,
                fatherAddress : fatherAddress,
                dateOfBirthFather : dateOfBirthFather,
                fatherMaritalStatus : fatherMaritalStatus,
                motherFirstname : motherFirstname,
                motherLastname: motherLastname,
                motherOthername: motherOthername,
                motherAddress : motherAddress,
                dateOfBirthMother : dateOfBirthMother,
                motherMaritalStatus : motherMaritalStatus,
                timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("EducationScreen");
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (fatherAlive === 'fatherLate' && motherAlive === 'motherAlive') {

          if(fatherFirstname === ""){

            return setErrorFatherFirstname('Please required field');
            
          }

          if(fatherLastname === ""){

            return setErrorFatherLastname('Please required field');
            
          }
          
          if(fatherAddress === ""){

            return setErrorFatherAddress('Please enter field');
            
          }

          if(fatherMaritalStatus === ""){

            return setErrorFatherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthFather === ""){

            return setErrorDateOfBirthFather('Please enter field');
            
          }
        
          
          if(motherFirstname === ""){

            return setErrorMotherFirstname('Please enter field');
            
          }

          if(motherLastname === ""){

            return setErrorMotherLastname('Please enter field');
            
          }
          
          if(motherAddress === ""){

            return setErrorMotherAddress('Please enter field');
            
          }

          if(motherMaritalStatus === ""){

            return setErrorMotherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthMother === ""){

            return setErrorDateOfBirthMother('Please enter field');
            
          }

          

          setLoading(true);   

          try {
    
            await updateDoc(doc(db, "visa", visaId), {

                fatherAlive : fatherAlive,
                motherAlive : motherAlive,
                fatherFirstname : fatherFirstname,
                fatherLastname: fatherLastname,
                fatherOthername: fatherOthername,
                fatherAddress : fatherAddress,
                motherLastname: motherLastname,
                fatherAddress : fatherAddress,
                dateOfBirthFather : dateOfBirthFather,
                fatherMaritalStatus : fatherMaritalStatus,
                motherFirstname : motherFirstname,
                motherLastname: motherLastname,
                motherOthername: motherOthername,
                motherAddress : motherAddress,
                dateOfBirthMother : dateOfBirthMother,
                motherMaritalStatus : motherMaritalStatus,
                timeStamp: serverTimestamp(),
    
            });

            setLoading(false)
              
            navigation.navigate("EducationScreen");
  
       
        
      } catch (error) {
  
        console.log('error:',error.message)
  
      }
        
        } 

        if (fatherAlive === 'fatherLate' && motherAlive === 'motherLate') {

          if(fatherFirstname === ""){

            return setErrorFatherFirstname('Please required field');
            
          }

          if(fatherLastname === ""){

            return setErrorFatherLastname('Please required field');
            
          }
          
          if(fatherAddress === ""){

            return setErrorFatherAddress('Please enter field');
            
          }

          if(fatherMaritalStatus === ""){

            return setErrorFatherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthFather === ""){

            return setErrorDateOfBirthFather('Please enter field');
            
          }
        
          
          if(motherFirstname === ""){

            return setErrorMotherFirstname('Please enter field');
            
          }

          if(motherLastname === ""){

            return setErrorMotherLastname('Please enter field');
            
          }
          
          if(motherAddress === ""){

            return setErrorMotherAddress('Please enter field');
            
          }

          if(motherMaritalStatus === ""){

            return setErrorMotherMaritalStatus('Please enter field');
            
          }

          if(dateOfBirthMother === ""){

            return setErrorDateOfBirthMother('Please enter field');
            
          }

          setLoading(true);

          setLoading(true);  

          try {
    
            await updateDoc(doc(db, "visa", visaId), {

              fatherAlive : fatherAlive,
              motherAlive : motherAlive,
              fatherFirstname : fatherFirstname,
              fatherLastname: fatherLastname,
              fatherAddress : fatherAddress,
              motherLastname: motherLastname,
              fatherOthername: fatherOthername,
              fatherAddress : fatherAddress,
              dateOfBirthFather : dateOfBirthFather,
              fatherMaritalStatus : fatherMaritalStatus,
              motherFirstname : motherFirstname,
              motherLastname: motherLastname,
              motherOthername: motherOthername,
              motherAddress : motherAddress,
              dateOfBirthMother : dateOfBirthMother,
              motherMaritalStatus : motherMaritalStatus,
              timeStamp: serverTimestamp(),
  
          });

          setLoading(false)
            
          navigation.navigate("EducationScreen");
  
        
          } catch (error) {
      
            console.log('error:',error.message)
      
          }
        
        } 
        
         

        
    
      }
    

  //   const handleParent = async() => {


     

      
  //   //   if(employmentLetter === null){

  //   //     return setErrorMessage('Please choose an option');
        
  //   //   }
  //   navigation.navigate("TravelHistoryScreen");

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
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Parent Information</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
    

     <View style={{marginBottom:50}}>

        <Text style={{fontSize:16, marginBottom:15, fontWeight:'500', textAlign:'center'}}>Father's Information</Text>

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:5}}>Is your father Alive?</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>

                {fatherData.map(item => {
                return (
                    <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        <Pressable key= {item.value} onPress={() => setFatherAlive(item.value)} style={{
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
                        borderColor: fatherAlive == item.value? COLORS.main : 'lightgray',
                        position:'relative'
                    
                        }}>
                        {fatherAlive === item.value ? <View style={styles.check}>
                            <FontAwesome name="check" size={20} color='darkblue'/>
                        </View> : null}
                        
                        </Pressable>

                        <Text style={{
                            fontSize:13,
                            color: fatherAlive == item.value? COLORS.main : 'black',
                        }}>
                            {item.title}
                        </Text>

                        </View>

                    </View>
                    
                )
                })}

                </View>

                

               

            </View> 

            {fatherAlive === 'fatherAlive'?

                <>
                
                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='firstname'
                        mode='outlined'
                        value={fatherFirstname}
                        onChangeText={(e) => setFatherFirstname(e)}
                    />
                      {errorFatherFirstname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherFirstname}</Text>
                      }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Lastname'
                        mode='outlined'
                        value={fatherLastname}
                        onChangeText={(e) => setFatherLastname(e)}
                    />
                      {errorFatherLastname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherLastname}</Text>
                      }

                  <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Othername'
                    mode='outlined'
                    value={fatherOthername}
                    onChangeText={(e) => setFatherOthername(e)}
                />

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Home Address'
                        mode='outlined'
                        value={fatherAddress}
                        onChangeText={(e) => setFatherAddress(e)}
                    />
                      {errorFatherAddress &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherAddress}</Text>
                      }

                <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                    {showPickerFather && (

                      <DateTimePicker
                        
                        mode='date'
                        display='spinner'
                        value={dateFather}
                        onChange = {onChangeDateFather}
                        style={{height:70, marginTop:-10, width:'100%'}}
                      />

                    )
                    }

                    {showPickerFather && Platform.OS === 'ios' && (
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

                              onPress={toggleDatePickerFather}
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

                              onPress={confirmIOSDateFather}
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



                    {!showPickerFather && (

                    <Pressable
                        onPress={toggleDatePickerFather}
                        >
                        <TextInput
                          mode="outlined"
                          placeholder='Date of Birth'
                          label='Date of Birth'
                          value={dateOfBirthFather}
                          onChangeText = {e => setDateOfBirthFather(e)}
                          placeholderTextColor='#000'
                          editable={false}
                          style={{
                              color:!showPickerFather && 'black',width:316, borderBottomWidth:0
                          }}
                          onPressIn={toggleDatePickerFather}
                        />
                    </Pressable>

                    )

                    }

                  <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                  <AntDesign name="calendar" size={24} color="black" />
                  </View>

                  {errorDateOfBirthFather &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfBirthFather}</Text>
                  }

                </View> 

                <View style={[styles.formEntry, {position:'relative'}]}>
                    <DropDown
                      label={"Marital Status"}
                      mode={"outlined"}
                      visible={showDropDownFather}
                      showDropDown={() => setShowDropDownFather(true)}
                      onDismiss={() => setShowDropDownFather(false)}
                      // onBlur={onBlur}
                      onChangeText = {e => setFatherMaritalStatus(e)}
                      value={fatherMaritalStatus}
                      setValue={setFatherMaritalStatus}
                      list={MaritalStatusList}
                      dropDownStyle={{
                        // borderColor: '#322b7c',
                        // borderWidth: 0.7,
                        borderRadius: 4,
                        borderStyle: 'solid',
                        // backgroundColor: 'yellow',
                        marginTop:20
                      }}
                      // inputProps={{
                      //   style:{
                      //     // width:90,
                      //     backgroundColor: 'rgb(252,243,207)',
                      //     margin:0, padding:0

                      //     // height:20
                      //   }
                      // }}
                    //   dropDownStyle={{
                    //     width:'100%', margin:0, padding:0,
                    //     backgroundColor: 'rgb(252,243,207)',
                    // }}
                    />
                  <View style={{position:"absolute",width:30, height:30, top:20, right:5 }}>
                  
                  </View>
                  
                  {errorFatherMaritalStatus &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherMaritalStatus}</Text>
                  }
              </View>

                    {/* <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Marital status(married/divorced/separeated/widowed)'
                        mode='outlined'
                        value={fatherMaritalStatus}
                        onChangeText={(e) => setFatherMaritalStatus(e)}
                    /> */}

                  
                </>

                :

                <>

                 
                
                <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='firstname'
                    mode='outlined'
                    value={fatherFirstname}
                    onChangeText={(e) => setFatherFirstname(e)}
                />
                  {errorFatherFirstname &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherFirstname}</Text>
                  }

                <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Lastname'
                    mode='outlined'
                    value={fatherLastname}
                    onChangeText={(e) => setFatherLastname(e)}
                />
                  {errorFatherLastname &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherLastname}</Text>
                  }

                <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Othername'
                    mode='outlined'
                    value={fatherOthername}
                    onChangeText={(e) => setFatherOthername(e)}
                />

                <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Home Address when Alive'
                    mode='outlined'
                    value={fatherAddress}
                    onChangeText={(e) => setFatherAddress(e)}
                />
                  {errorFatherAddress &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherAddress}</Text>
                  }

            <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                {showPickerFather && (

                  <DateTimePicker
                    
                    mode='date'
                    display='spinner'
                    value={dateFather}
                    onChange = {onChangeDateFather}
                    style={{height:70, marginTop:-10, width:'100%'}}
                  />

                )
                }

                {showPickerFather && Platform.OS === 'ios' && (
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

                          onPress={toggleDatePickerFather}
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

                          onPress={confirmIOSDateFather}
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



                {!showPickerFather && (

                <Pressable
                    onPress={toggleDatePickerFather}
                    >
                    <TextInput
                      mode="outlined"
                      placeholder='Date of Birth'
                      label='Date of Birth'
                      value={dateOfBirthFather}
                      onChangeText = {e => setDateOfBirthFather(e)}
                      placeholderTextColor='#000'
                      editable={false}
                      style={{
                          color:!showPickerFather && 'black',width:316, borderBottomWidth:0
                      }}
                      onPressIn={toggleDatePickerFather}
                    />
                </Pressable>

                )

                }

              <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
              <AntDesign name="calendar" size={24} color="black" />
              </View>

              {errorDateOfBirthFather &&
                <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfBirthFather}</Text>
              }

            </View> 

            <View style={[styles.formEntry, {position:'relative'}]}>
                <DropDown
                  label={"Marital Status"}
                  mode={"outlined"}
                  visible={showDropDownFather}
                  showDropDown={() => setShowDropDownFather(true)}
                  onDismiss={() => setShowDropDownFather(false)}
                  // onBlur={onBlur}
                  onChangeText = {e => setFatherMaritalStatus(e)}
                  value={fatherMaritalStatus}
                  setValue={setFatherMaritalStatus}
                  list={MaritalStatusList}
                  dropDownStyle={{
                    // borderColor: '#322b7c',
                    // borderWidth: 0.7,
                    borderRadius: 4,
                    borderStyle: 'solid',
                    // backgroundColor: 'yellow',
                    marginTop:20
                  }}
                  // inputProps={{
                  //   style:{
                  //     // width:90,
                  //     backgroundColor: 'rgb(252,243,207)',
                  //     margin:0, padding:0

                  //     // height:20
                  //   }
                  // }}
                //   dropDownStyle={{
                //     width:'100%', margin:0, padding:0,
                //     backgroundColor: 'rgb(252,243,207)',
                // }}
                />
              <View style={{position:"absolute",width:30, height:30, top:20, right:5 }}>
              
              </View>
              
              {errorFatherMaritalStatus &&
                <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFatherMaritalStatus}</Text>
              }
          </View>

            

              
            </>

            }

     
      
        {/* {errorMessage &&
          <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
        } */}
   
       
        
     </View> 

     <View style={{marginBottom:50}}>

        <Text style={{fontSize:16, marginBottom:15, fontWeight:'500', textAlign:'center'}}>Mother's Information</Text>

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:0}}>Is your mother Alive?</Text>
                
                <View style={{flexDirection:'row', marginTop:20}}>

                {motherData.map(item => {
                return (
                    <View key= {item.value} style={{flexDirection: 'column', justifyContent:'flex-start', marginVertical:10, marginRight:100}}>

                        <View style={{flexDirection:'row', alignItems:'center',}}>

                        <Pressable key= {item.value} onPress={() => setMotherAlive(item.value)} style={{
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
                        borderColor: motherAlive == item.value? COLORS.main : 'lightgray',
                        position:'relative'
                    
                        }}>
                        {motherAlive === item.value ? <View style={styles.check}>
                            <FontAwesome name="check" size={20} color='darkblue'/>
                        </View> : null}
                        
                        </Pressable>

                        <Text style={{
                            fontSize:13,
                            color: motherAlive == item.value? COLORS.main : 'black',
                        }}>
                            {item.title}
                        </Text>

                        </View>

                    </View>
                    
                )
                })}

                </View>

            

            </View> 

            {motherAlive === 'motherAlive'?

                <>
                
                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='firstname'
                        mode='outlined'
                        value={motherFirstname}
                        onChangeText={(e) => setMotherFirstname(e)}
                    />
                      {errorMotherFirstname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherFirstname}</Text>
                      }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Lastname'
                        mode='outlined'
                        value={motherLastname}
                        onChangeText={(e) => setMotherLastname(e)}
                    />

                      {errorMotherLastname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherLastname}</Text>
                      }

                  <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Othername'
                    mode='outlined'
                    value={motherOthername}
                    onChangeText={(e) => setMotherOthername(e)}
                />

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Home Address'
                        mode='outlined'
                        value={motherAddress}
                        onChangeText={(e) => setMotherAddress(e)}
                    />

                  {errorMotherAddress &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherAddress}</Text>
                  }

                    <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                  {showPickerMother && (

                    <DateTimePicker
                      
                      mode='date'
                      display='spinner'
                      value={dateMother}
                      onChange = {onChangeDateMother}
                      style={{height:70, marginTop:-10, width:'100%'}}
                    />

                  )
                  }

                  {showPickerMother && Platform.OS === 'ios' && (
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

                            onPress={toggleDatePickerMother}
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

                            onPress={confirmIOSDateMother}
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



                      {!showPickerMother && (

                      <Pressable
                          onPress={toggleDatePickerMother}
                          >
                          <TextInput
                            mode="outlined"
                            placeholder='Date of Birth'
                            label='Date of Birth'
                            value={dateOfBirthMother}
                            onChangeText = {e => setDateOfBirthMother(e)}
                            placeholderTextColor='#000'
                            editable={false}
                            style={{
                                color:!showPickerMother && 'black',width:316, borderBottomWidth:0
                            }}
                            onPressIn={toggleDatePickerMother}
                          />
                      </Pressable>

                      )

                      }

                    <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                      <AntDesign name="calendar" size={24} color="black" />
                    </View>

                    {errorDateOfBirthMother &&
                            <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfBirthMother}</Text>
                    }

                    </View> 


                    <View style={[styles.formEntry, {position:'relative', width:316}]}>
                    <DropDown
                      label={"Marital Status"}
                      mode={"outlined"}
                      visible={showDropDownMother}
                      showDropDown={() => setShowDropDownMother(true)}
                      onDismiss={() => setShowDropDownMother(false)}
                      // onBlur={onBlur}
                      onChangeText = {e => setMotherMaritalStatus(e)}
                      value={motherMaritalStatus}
                      setValue={setMotherMaritalStatus}
                      list={MaritalStatusList}
                      dropDownStyle={{
                        // borderColor: '#322b7c',
                        // borderWidth: 0.7,
                        borderRadius: 4,
                        borderStyle: 'solid',
                        // backgroundColor: 'yellow',
                        marginTop:20
                      }}
                  
                    />
                  
                  
                  {errorMotherMaritalStatus &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherMaritalStatus}</Text>
                  }
                    </View>

                    {/* <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Marital status(married/divorced/separeated/widowed)'
                        mode='outlined'
                        value={motherMaritalStatus}
                        onChangeText={(e) => setMotherMaritalStatus(e)}
                    /> */}

                
                </>

                :

                <>

                  {/* <View style={styles.formEntryImage}>
                      <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                      {/* <FontAwesome name="check-circle" size={20} color={visaData.birthCertificate ? 'green' : 'gray'}/> */}
                      {/* <Text style={{marginHorizontal:5, fontSize:12}}>Mother's Death Certificate</Text> */}
                      {/* {visaData.birthCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                      {/* </View> */}
                      
                      {/* <TouchableOpacity 
                        onPress={() => navigation.navigate("MothersDeathCertificateImageScreen")}
                        style={{ 
                          alignItems:'center', 
                          flexDirection:'row', 
                          padding:10, 
                          backgroundColor:COLORS.main, 
                          borderRadius:5, }}>
                      <Feather name="upload" size={20} color="white" />
                      <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                      </TouchableOpacity> */}

                  {/* </View>  */}

                
                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='firstname'
                        mode='outlined'
                        value={motherFirstname}
                        onChangeText={(e) => setMotherFirstname(e)}
                    />
                      {errorMotherFirstname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherFirstname}</Text>
                      }

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label='Lastname'
                        mode='outlined'
                        value={motherLastname}
                        onChangeText={(e) => setMotherLastname(e)}
                    />

                      {errorMotherLastname &&
                        <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherLastname}</Text>
                      }

                  <TextInput
                    type='text'
                    style={{ marginTop: 15 }}
                    label='Othername'
                    mode='outlined'
                    value={motherOthername}
                    onChangeText={(e) => setMotherOthername(e)}
                  />

                    <TextInput
                        type='text'
                        style={{ marginTop: 15 }}
                        label="Mother's Home Address when alive"
                        mode='outlined'
                        value={motherAddress}
                        onChangeText={(e) => setMotherAddress(e)}
                    />

                  {errorMotherAddress &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherAddress}</Text>
                  }

                    <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                  {showPickerMother && (

                    <DateTimePicker
                      
                      mode='date'
                      display='spinner'
                      value={dateMother}
                      onChange = {onChangeDateMother}
                      style={{height:70, marginTop:-10, width:'100%'}}
                    />

                  )
                  }

                  {showPickerMother && Platform.OS === 'ios' && (
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

                            onPress={toggleDatePickerMother}
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

                            onPress={confirmIOSDateMother}
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



                      {!showPickerMother && (

                      <Pressable
                          onPress={toggleDatePickerMother}
                          >
                          <TextInput
                            mode="outlined"
                            placeholder='Date of Birth'
                            label='Date of Birth'
                            value={dateOfBirthMother}
                            onChangeText = {e => setDateOfBirthMother(e)}
                            placeholderTextColor='#000'
                            editable={false}
                            style={{
                                color:!showPickerMother && 'black',width:316, borderBottomWidth:0
                            }}
                            onPressIn={toggleDatePickerMother}
                          />
                      </Pressable>

                      )

                      }

                    <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                      <AntDesign name="calendar" size={24} color="black" />
                    </View>

                    {errorDateOfBirthMother &&
                            <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfBirthMother}</Text>
                    }

                    </View> 


                    <View style={[styles.formEntry, {position:'relative', width:316}]}>
                    <DropDown
                      label={"Marital Status"}
                      mode={"outlined"}
                      visible={showDropDownMother}
                      showDropDown={() => setShowDropDownMother(true)}
                      onDismiss={() => setShowDropDownMother(false)}
                      // onBlur={onBlur}
                      onChangeText = {e => setMotherMaritalStatus(e)}
                      value={motherMaritalStatus}
                      setValue={setMotherMaritalStatus}
                      list={MaritalStatusList}
                      dropDownStyle={{
                        // borderColor: '#322b7c',
                        // borderWidth: 0.7,
                        borderRadius: 4,
                        borderStyle: 'solid',
                        // backgroundColor: 'yellow',
                        marginTop:20
                      }}
                  
                    />
                  
                  
                  {errorMotherMaritalStatus &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMotherMaritalStatus}</Text>
                  }
                    </View>

                </>

            }




        </View> 




     </View>
    </ScrollView>
      <Pressable onPress = {handleParent}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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
      // margin: 8,
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








