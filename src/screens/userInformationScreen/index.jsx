import React, { useState, useEffect, useContext, useRef } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, StatusBar } from "react-native";
// import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput, Provider, Divider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import PhoneInput from "react-native-phone-number-input";
import DateTimePicker from '@react-native-community/datetimepicker';


const genderList = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export default function UserInformationScreen({ navigation }) {

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({})


  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState("");
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(true);


  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);



const [showPicker, setShowPicker] = useState(false);

const [date, setDate] = useState(new Date());

const [dateOfBirth, setDateOfBirth] = useState("")

const [firstname, setFirstname] = useState("");

const [surname, setSurname] = useState("");

const [othername, setOthername] = useState("");

const [socials, setSocials] = useState("");

const [address, setAddress] = useState("");



const [errorFirstname, setErrorFirstname] = useState(null)

const [errorSurname, setErrorSurname] = useState(null)

const [errorGender, setErrorGender] = useState(null)

const [errorDob, setErrorDob] = useState(null)

const [errorSocials, setErrorSocials] = useState(null)

const [errorPhonenumber, setErrorPhonenumber] = useState(null)

const [errorAddress, setErrorAddress] = useState(null)

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



      const { user } = useContext(AuthContext)

      const {visaId} = useContext(VisaContext)

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


      // const onSubmit = async(data, formattedValue, gender, dateOfBirth) => {
      //   setLoading(true);

      //   try {

      //     await updateDoc(doc(db, "visa", visaId), {

      //         firstname: data.firstname,
      //         surname: data.surname,
      //         // gender: gender,
      //         // dob: dateOfBirth,
      //         socials: data.socials,
      //         // phoneNumber: formattedValue,
      //         timeStamp: serverTimestamp(),

      //      })

      //     .then(async() => {

      //       await updateDoc(doc(db, "travellers", user.uid), {

      //         surname: data.surname,
      //         gender: data.gender,
      //         socials: data.socials,
      //         timeStamp: serverTimestamp(),

      //      })
            
      //       navigation.navigate("MaritalAndEmploymentScreen");
          
      //     })

        
      // } catch (error) {

      //   console.log('error:',error.message)

      // }

      // console.log('data',data)



      //   // WizardStore.update((s) => {
      //   //   s.progress = 66;
      //   //   s.firstname = data.firstname
      //   //   s.lastname = data.lastname
      //   //   s.state = state
      //   //   s.license = data.license
      //   //   s.expiration = data.expiration
      //   //   s.dob = data.dob
      //   //   // s.birthPlace = data.birthPlace;
      //   //   // s.maidenName = data.maidenName;
      //   //   console.log("updated state...", WizardStore.getRawState().firstname);
      //   // });
      //   // setLoading(false);
      //   // navigation.navigate("VehicleDetails");
      // };
    

  const handleSubmit = async() => {

    if(firstname === ""){

      return setErrorFirstname('Please enter your firstname');

    }

    if(surname === ""){

      return setErrorSurname('Please enter your surname');
      
    }

    if(gender === ""){

      return setErrorGender('Please enter your gender');

    }

    if(dateOfBirth === ""){

      return setErrorDob('Please enter your DOB');
      
    }

    if(address === ""){

      return setErrorDob('Please enter your Address');
      
    }

    // if(socials === ""){

    //   return setErrorSocials('Please enter your socials');

    // }

    if(formattedValue === ""){

      return setErrorPhonenumber('Please enter your phone number');
      
    }

    setLoading(true);

      try {

        await updateDoc(doc(db, "visa", visaId), {

            firstname: firstname,
            surname: surname,
            othername: othername,
            gender: gender,
            dob: dateOfBirth,
            socials: socials,
            phoneNumber: formattedValue,
            address: address,
            timeStamp: serverTimestamp(),

         })

        .then(async() => {

          await updateDoc(doc(db, "travellers", user.uid), {

            firstname: firstname,
            surname: surname,
            othername: othername,
            gender: gender,
            dob: dateOfBirth,
            socials: socials,
            address: address,
            phoneNumber: formattedValue,
            timeStamp: serverTimestamp(),
            userInfo:true,

         })

         setLoading(false)

          // dispatch({type:"APPLICANT", payload:userData.visaId}) 
          navigation.navigate("MaritalAndEmploymentScreen");

         
        
        })

      
    } catch (error) {

      console.log('error:',error.message)

    }

  }


  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.main}  barStyle="light-content"/>
      <Loader visible ={loading}/>
    {/* <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color={MD3Colors.primary60}
    /> */}
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
      <BackArrow onPress={() => navigation.goBack()}/>
      <Text style={{fontSize:18, color:'black', marginLeft: 50, fontWeight:'bold'}}>My Personal Info</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
      <View>
      {/* <View style={{marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Fill in all Informations</Text>  
      </View>  */}

     <View style={{marginBottom:50,}}>
        <View style={{padding:5, marginHorizontal:10, marginVertical:5}}>
           <Text style={{fontSize:16, marginBottom:5, fontWeight:'400', color:'gray'}}> Please Fill in all Information as it appears on your International Passport</Text>
        </View>
        
       

        {/* <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Firstname"
                 placeholder="Enter Firstname"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="firstname"
           />
           {errors.firstname && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View> */}

        {/* <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Surname"
                 placeholder="Enter Surname"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="surname"
           />
           {errors.surname && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View> */}

           <View style={styles.formEntry}>
           
            <TextInput
              mode="outlined"
              label="Firstname"
              placeholder="Enter Firstname"
              // onBlur={onBlur}
              onChangeText = {e => setFirstname(e)}
              value={firstname}
            />
           
           {errorFirstname &&
              <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorFirstname}</Text>
           }
        </View> 

         <View style={styles.formEntry}>
          
               <TextInput
                 mode="outlined"
                 label="Surname"
                 placeholder="Enter Surname"
                //  onBlur={onBlur}
                 onChangeText = {e => setSurname(e)}
                 value={surname}
               />
            {errorSurname &&
              <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSurname}</Text>
           }
        </View>

        <View style={styles.formEntry}>
          
               <TextInput
                 mode="outlined"
                 label="Othername"
                 placeholder="Enter Othername"
                //  onBlur={onBlur}
                 onChangeText = {e => setOthername(e)}
                 value={othername}
               />
         
        </View> 


          <View style={[styles.formEntry, {position:'relative'}]}>
              <DropDown
                label={"Gender"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                // onBlur={onBlur}
                onChangeText = {e => setGender(e)}
                value={gender}
                setValue={setGender}
                list={genderList}
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
              <Image 
                  source = {require('../../../assets/images/gender.png')}
                  style = {{width:20, height:20, }}
                  alt = ''
                  resizeMode = 'contain'
              />
             </View>
             
             {errorGender &&
              <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorGender}</Text>
             }
         </View>




        {/* Gender */}

         {/* <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
              
              <DropDown
                label={"Gender"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                // onBlur={onBlur}
                onChangeText={onChange}
                value={gender}
                setValue={setGender}
                list={genderList}
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
             )}
             name="gender"
           />
           {/* {errors.gender && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )} */}
        {/* </View> */}


         {/* dob */}


          <View style={{ alignItems:'center', justifyContent:'flex-start', width:304, borderWidth:1, borderColor:'gray', backgroundColor:'white',borderRadius:5, marginLeft:8, marginVertical:10, borderBottomWidth:0 }}>

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
                  justifyContent:'space-between',
                  position:'relative'
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
              placeholder='Date of Birth'
              value={dateOfBirth}
              onChangeText = {e => setDateOfBirth(e)}
              placeholderTextColor='#000'
              editable={false}
              style={{
                  color:!showPicker && 'black',width:302, borderBottomWidth:0
              }}
              onPressIn={toggleDatePicker}
              />
          </Pressable>

          )
          
          }

            <View style={{position:"absolute",width:30, height:30, top:15, right:5 }}>
              <AntDesign name="calendar" size={24} color="black" />
      
            </View>

          </View> 
          {errorDob &&
              <Text style={{color:'red', fontSize:10, marginVertical:5, marginLeft:5}}> {errorDob}</Text>
           }



         {/* <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Socials (Optional)"
                 placeholder=""
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="socials"
           />
           {/* {errors.socials && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )} */}
         {/* </View>  */}

         <View style={styles.formEntry}>
           
           <TextInput
             mode="outlined"
             label="Home Address"
             placeholder="Enter Home Address"
             // onBlur={onBlur}
             onChangeText = {e => setAddress(e)}
             value={address}
           />
          
          {errorAddress &&
             <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorAddress}</Text>
          }
        </View> 

         <View style={styles.formEntry}>
           
               <TextInput
                 mode="outlined"
                 label="Socials (Optional)"
                 placeholder="Social media username"
                //  onBlur={onBlur}
                onChangeText = {e => setSocials(e)}
                 value={socials}
               />
              {/* {errorSocials &&
                <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSocials}</Text>
              } */}
         </View> 




        {/* Address */}


        {/* Phone Number */}

       <View style={{marginHorizontal:10, marginVertical:15, borderWidth:1, borderRadius:5, alignItems:'center', backgroundColor:'white'}}>
        <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="NG"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus = {false}
              textInputStyle = {{color:'#000000'}}
              codeTextStyle = {{color:'#000000'}}
              flagButtonStyle = {{backgroundColor:'white'}}
              countryPickerButtonStyle = {{}}

/>
       </View>
       
       {errorPhonenumber &&
              <Text style={{color:'red', fontSize:10, marginVertical:5, marginHorizontal:10}}> {errorPhonenumber}</Text>
        }

      
     </View> 

   



     </View>
    </ScrollView>
       <Pressable onPress={handleSubmit} style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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
