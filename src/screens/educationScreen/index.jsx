import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView } from "react-native";
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
import { MaritalStatusData } from "../../data";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDown from "react-native-paper-dropdown";
import { VisaContext } from "../../config/VisaContext";
import DateTimePicker from '@react-native-community/datetimepicker';


const EducationList = [
  {
    label: "Doctorate Degree",
    value: "doctorate",
  },
  {
    label: "Masters Degree",
    value: "masters",
  },
  {
    label: "Bachelors Degree",
    value: "bachelors",
  },
  {
    label: "Associate Degree",
    value: "associate",
  },
  {
    label: "High School",
    value: "highschool",
  },
  {
    label: "Apprenticeship",
    value: "apprenticeship",
  },
  

];

export default function EducationScreen({ navigation }) {

  
  
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [education, setEducation] = useState("")
  const [schoolAttended, setSchoolAttended] = useState("")
  const [course, setCourse] = useState("")
  const [schoolAddress, setSchoolAddress] = useState("")
  const [showDropDown, setShowDropDown] = useState(false);

  const [showPickerAdmissionDate, setShowPickerAdmissionDate] = useState(false);

  const [showPickerGraduationDate, setShowPickerGraduationDate] = useState(false);

  const [dateOfAdmission, setDateOfAdmission] = useState('');

  const [dateOfGraduation, setDateOfGraduation] = useState('');

  const [dateAdmitted, setDateAdmitted] = useState(new Date());

  const [dateGraduated, setDateGraduated] = useState(new Date());


  const [errorEducation, setErrorEducation] = useState('');

  const [errorSchoolAttended, setErrorSchoolAttended] = useState('');

  const [errorCourse, setErrorCourse] = useState('');

  const [errorDateOfAdmission, setErrorDateOfAdmission] = useState('');

  const [ErrordateOfGraduation, setErrorDateOfGraduation] = useState('');

  const [errorSchoolAddress, setErrorSchoolAddress] = useState('');


  const toggleDateAdmitted = () => {
    setShowPickerAdmissionDate(!showPickerAdmissionDate)
  }

  const onChangeDateAdmitted = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDateAdmitted(currentDate)

        if(Platform.OS ==='android'){
          toggleDateAdmitted();
          setDateOfAdmission(currentDate.toDateString());
        }

      }else{
        toggleDateAdmitted();
      }
  }

  const confirmIOSDateAdmitted = () => {
    setDateOfAdmission(date.toDateString());
    toggleDateAdmitted();
    
  }


  // Graduate Date Info

  const toggleDateGraduated = () => {
    setShowPickerGraduationDate(!showPickerGraduationDate)
  }

  const onChangeDateGraduated = ({type}, selectedDate ) => {
      if(type == 'set'){
        const currentDate = selectedDate;
        setDateGraduated(currentDate)

        if(Platform.OS ==='android'){
          toggleDateGraduated();
          setDateOfGraduation(currentDate.toDateString());
        }

      }else{
        toggleDateGraduated();
      }
  }

  const confirmIOSDateGraduated = () => {
    setDateOfGraduation(date.toDateString());
    toggleDateGraduated();
    
  }

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



    //   const handleAdd = () => {
            
    //     setChildren([...children, {firstname : "" , surname : ""}])

    // }

    //    const handleDelete = (i) => {
            
    //     const deleteVal = [...children]
    //     deleteVal.splice(i, 1)
    //     setChildren(deleteVal)

    // }
    
    
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


      const handleMyProfile = async() => {


        if(education === ""){

          return setErrorEducation('Please required field');
          
        }

     
        
        if(schoolAttended === ""){

          return setErrorSchoolAttended('Please required field');
          
        }


        if(course === ""){

          return setErrorCourse('Please required field');
          
        }

        if(dateOfAdmission === ""){

          return setErrorDateOfAdmission('Please required field');
          
        }

        if(dateOfGraduation === ""){

          return setErrorDateOfGraduation('Please required field');
          
        }

     
        if(schoolAddress === ""){

          return setErrorSchoolAddress('Please required field');
          
        }

        setLoading(true);
    
          try {
    
            await updateDoc(doc(db, "visa", visaId), {
    
                education: education,
                schoolAttended: schoolAttended,
                dateOfAdmission : dateOfAdmission,
                dateOfGraduation : dateOfGraduation,
                course: course,
                schoolAddress : schoolAddress,
                timeStamp: serverTimestamp(),
    
             }).then(async() => {

              await updateDoc(doc(db, "travellers", user.uid), {
    
                education: education,
                schoolAttended: schoolAttended,
                dateOfAdmission : dateOfAdmission,
                dateOfGraduation : dateOfGraduation,
                course: course,
                schoolAddress : schoolAddress,
                timeStamp: serverTimestamp(),
    
             })
    
           
    
             setLoading(false)
              
              navigation.navigate("EmploymentScreen");

            })
    
        } catch (error) {
    
          console.log('error:',error.message)
    
        }
    
      }
    

  //   const handleMyProfile = async() => {


     

      
  //   //   if(employmentLetter === null){

  //   //     return setErrorMessage('Please choose an option');
        
  //   //   }
  //   navigation.navigate("EmploymentScreen");

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
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Education Information</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
      <View style={{marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Fill in all Informations</Text>  
        {/* <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text> */}
      </View> 

     <View style={{marginBottom:50}}>

        {/* <Text style={{fontSize:16, marginBottom:5, fontWeight:'500'}}>Please Fill in this Information as it is in your International Passport</Text> */}

            <View style={{marginBottom:20, position:'relative'}}>

                <Text style={{fontSize:16, marginBottom:10}}>What is your Level of Education</Text>

                <View style={{}}>
              <DropDown
                label={"Education Level"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                // onBlur={onBlur}
                onChangeText = {e => setEducation(e)}
                value={education}
                setValue={setEducation}
                list={EducationList}
                dropDownStyle={{
                  // borderColor: '#322b7c',
                  // borderWidth: 0.7,
                  borderRadius: 4,
                  borderStyle: 'solid',
                  // backgroundColor: 'yellow',
                  marginTop:20
                }}
               
              />
                 <View style={{position:"absolute",width:30, height:30, top:20, right:10 }}>
                    <Image 
                        source = {require('../../../assets/images/caret.png')}
                        style = {{width:20, height:20, }}
                        alt = ''
                        resizeMode = 'contain'
                    />
                  </View>
                  {errorEducation &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorEducation}</Text>
                  }
                </View>

                {/* <TextInput
                        type='text'
                        style={{ marginTop: 5 }}
                        label='Highest Level of Education'
                        mode='outlined'
                /> */}
            

            </View> 

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:0}}>School you attended(most recent)</Text>

                <TextInput
                        type='text'
                        style={{ marginTop: 5 }}
                        label='School attended'
                        mode='outlined'
                        onChangeText = {e => setSchoolAttended(e)}
                        value={schoolAttended}
                />

                {errorSchoolAttended &&
                <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSchoolAttended}</Text>
                }

            </View> 

            <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:0}}>Course of Study</Text>

                <TextInput
                        type='text'
                        style={{ marginTop: 5 }}
                        label='course of study'
                        mode='outlined'
                        onChangeText = {e => setCourse(e)}
                        value={course}
                />

                  {errorCourse &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorCourse}</Text>
                  }

                </View> 

                <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:0}}>Admission Date</Text>

                <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                  {showPickerAdmissionDate && (

                    <DateTimePicker
                      
                      mode='date'
                      display='spinner'
                      value={dateAdmitted}
                      onChange = {onChangeDateAdmitted}
                      style={{height:70, marginTop:-10, width:'100%'}}
                    />

                  )
                  }

                  {showPickerAdmissionDate && Platform.OS === 'ios' && (
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

                            onPress={toggleDateAdmitted}
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

                            onPress={confirmIOSDateAdmitted}
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



                      {!showPickerAdmissionDate && (

                      <Pressable
                          onPress={toggleDateAdmitted}
                          >
                          <TextInput
                            mode="outlined"
                            placeholder='Date of Birth'
                            label='Date of Admission'
                            value={dateOfAdmission}
                            onChangeText = {e => setDateOfAdmission(e)}
                            placeholderTextColor='#000'
                            editable={false}
                            style={{
                                color:!showPickerAdmissionDate && 'black',width:316, borderBottomWidth:0
                            }}
                            onPressIn={toggleDateAdmitted}
                          />
                      </Pressable>

                      )

                      }

                    <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                        <AntDesign name="calendar" size={24} color="black" />
                     
                    </View>

                      </View> 

                  {errorDateOfAdmission &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorDateOfAdmission}</Text>
                  }

                </View> 

                <View style={{marginBottom:20}}>

                  <Text style={{fontSize:16, marginBottom:0}}>Year of Graduation</Text>

                    <View style={{ alignItems:'center', justifyContent:'flex-start', width:318, borderRadius:5,  marginVertical:10, borderBottomWidth:0, position:'relative' }}>

                    {showPickerGraduationDate && (

                      <DateTimePicker
                        
                        mode='date'
                        display='spinner'
                        value={dateGraduated}
                        onChange = {onChangeDateGraduated}
                        style={{height:70, marginTop:-10, width:'100%'}}
                      />

                    )
                    }

                    {showPickerGraduationDate && Platform.OS === 'ios' && (
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

                              onPress={toggleDateGraduated}
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

                              onPress={confirmIOSDateGraduated}
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



                        {!showPickerGraduationDate && (

                        <Pressable
                            onPress={toggleDateGraduated}
                            >
                            <TextInput
                              mode="outlined"
                              placeholder='Date of Birth'
                              label='Date of Graduation'
                              value={dateOfGraduation}
                              onChangeText = {e => setDateOfGraduation(e)}
                              placeholderTextColor='#000'
                              editable={false}
                              style={{
                                  color:!showPickerGraduationDate && 'black',width:316, borderBottomWidth:0
                              }}
                              onPressIn={toggleDateGraduated}
                            />
                        </Pressable>

                        )

                        }

                      <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
                        <AntDesign name="calendar" size={24} color="black" />
                      </View>

                    </View> 
                    {ErrordateOfGraduation &&
                      <Text style={{color:'red', fontSize:10, marginVertical:5}}> {ErrordateOfGraduation}</Text>
                    }

                </View> 

                <View style={{marginBottom:20}}>

                    <Text style={{fontSize:16, marginBottom:0}}>School Address</Text>

                    <TextInput
                            type='text'
                            style={{ marginTop: 5 }}
                            label='School Address'
                            mode='outlined'
                            onChangeText = {e => setSchoolAddress(e)}
                            value={schoolAddress}
                    />

                  {errorSchoolAddress &&
                    <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSchoolAddress}</Text>
                  }

                </View> 

         

     
      
        {/* {errorMessage &&
          <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMessage}</Text>
        } */}
   
       
        
     </View> 



     </View>
    </ScrollView>
      <Pressable onPress = {handleMyProfile}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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
