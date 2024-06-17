import { Image, StatusBar, StyleSheet, Text, TextInput, View, Pressable,  ScrollView, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, db, firebaseApp } from '../../firebase';
import {serverTimestamp, setDoc, doc, getDoc, addDoc, collection, updateDoc, } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, sendSignInLinkToEmail, signOut, getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup  } from 'firebase/auth';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader';
import Toast from '../../components/toast';
import { VisaContext } from '../../config/VisaContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Signup = ({navigation}) => {

    const [showErrors, setShowErrors] = useState(false)  
  
    const [errors, setErrors] = useState({})
  
    const [email, setEmail] = useState('')
  
    const [firstname, setFirstname] = useState('')
  
    const [password, setPassword] = useState('')
  
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const [loading, setLoading ] = useState(false)
  
    const [toast, setToast ] = useState(false)

    const { dispatch } = useContext(VisaContext)
  
    const [hidePassword, setHidePassword] = useState(false)
  
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false)
  
  
    const getErrors = (email, firstname, password, confirmPassword) => {
  
      const errors = {}
  
  
      if (!email) {
          
          errors.email = 'Please enter email';
  
      } else if (!email.includes('@') || !email.includes('.')) {
          
          errors.email = 'Please enter a Valid email'
  
      }
  
  
      if (!firstname) {
          
          errors.firstname = 'Please enter firstname';
  
      } else if (firstname.includes('@"^([0-9]|#|\+|\*)+$"')) {
          
          errors.firstname = 'Please enter a name'
  
      }
  
  
  
      if (!password) {
          
          errors.password = 'Enter password';
  
      } else if (password.length < 8) {
          
          errors.password = ' 8 or more characters'
  
      }
  
  
  
      if (!confirmPassword) {
          
          errors.confirmPassword = 'Enter password';
  
      }  else if (confirmPassword.length < 8) {
          
          errors.confirmPassword = ' 8 or more characters'
  
      }  else if (password !== confirmPassword) {
          
          errors.confirmPassword = ' Password not matched'
  
      }
  
  
      return errors;
  
    }
  
  
    const onSignUp = () => {
  
      const errors = getErrors(email, firstname, password, confirmPassword);
  
      if (Object.keys(errors).length > 0) {
          
          setShowErrors (true);
  
          setErrors(showErrors && errors)
  
      } else {
  
          setErrors({})
  
          setShowErrors(false)
          
          // console.log('sign up')
  
          handleSignUp(email, password, firstname)
      }
  
    } 
  
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://visadocflymate.com/',
      handleCodeInApp: true,
    //   iOS: {
    //     bundleId: 'com.visadocflymate.visadoc'
    //   },
    //   android: {
    //     packageName: 'com.visadocflymate.visadoc',
    //     installApp: true,
    //     minimumVersion: '12'
    //   },
     
    };
  
 
   const handleSignUp = async(email, password) => {
  
      setLoading(true);
  
      await createUserWithEmailAndPassword(auth, email, password)
      
      .then(() => {

        sendEmailVerification(auth.currentUser, actionCodeSettings
            
        )
          .then(() => {
            
            alert(`Email verification sent to ${email}, verify email and login fro your app `)

            setLoading(false)
            
          }).catch((error) => {

            alert(error.message)

          }).then(() => {

            const user = auth.currentUser;
  
              setDoc(doc(db, "travellers", user.uid), {
      
                  userId : user.uid,
      
                  firstname: firstname,
      
                  email: email,
      
                  timeStamp: serverTimestamp(),
      
                  registered : false,

                  info : false,

                  safety : false,
                  
                  destination : false,

                  purpose : false,

                  type : false,

                  available : false,

                  userInfo : false,

                  marital : false,

                  parent : false,

                  education : false,

                  employment : false,
                  
                  history : false,

                  status : "active",
              
                  }
              ).then(() => {

                        setLoading(false)
                        auth.signOut();
                
              })
      
      

          }).catch((error) =>{

            alert(error.message)

          })
   
      })
  
     .catch((error) => {
  
          const errorCode = error.code;
  
          const errorMessage = error.message;
  
          if(errorCode === 'auth/email-already-in-use'){
  
               setErrors({email : 'Email already in use'})
              
  
          }
  
          if(errorCode === 'auth/invalid-email'){
  
               setErrors({email : 'Email is invalid'})
  
          }
  
          if (errorCode === 'auth/invalid-email-verified') {
  
              setErrors({email : 'Email is not correct'})
              
          }
  
  
          setLoading(false)
          // ..
      });
    }
  
  
    const togglePassword = () => {
  
      setHidePassword(!hidePassword)
  
    }
  
    const toggleConfirmPassword = () => {
  
      setHideConfirmPassword(!hideConfirmPassword)
  
    }
  
// Start  Google sign up

// const provider = new GoogleAuthProvider();

// const auth = getAuth();

//  const auth = getAuth();

// const handleGoogleSignin = () => {

//     signInWithRedirect(auth, provider);

// }


const handleGoogleSignin = () => {

    let provider = new GoogleAuthProvider(firebaseApp);

    signInWithPopup(auth, provider)

      .then((result) => {

        console.log(result);

      })

      .catch((err) => alert(err.message));
  };


// Close Google Signup


const handleFacebookSignin = () => {



}

  
    return (
      <View style={styles.loginContainer}>
  
      <Loader visible = {loading} />   
  
      <Toast show = {toast} /> 
  
      <SafeAreaView style = {{paddingHorizontal : 20}}>
  
          <StatusBar />
          <View style={{}}>
  
          <View style={{flexDirection : 'row', alignItems : 'center'}}>
  
              <TouchableOpacity
                  onPress = {() => {navigation.goBack()}}
                  style = {{ width : 50, height : 50, alignItems: 'center', justifyContent : 'center', borderTopRightRadius : 20, borderBottomLeftRadius : 20, paddingLeft : 10, backgroundColor : '#348EAE' }}
              >
                  <MaterialIcons name="arrow-back-ios" size={28} color="lightgray" />
              </TouchableOpacity>
  
              
              <View style={{ }}>
                  <Image
                      source = {require('../../../assets/images/logo.png')}
                      alt=''
                      style={{width : 150, height : 80, marginLeft:50}}
                      resizeMode = 'contain'
  
                  />
              </View>
              </View>
            
              <View style = {{width : '100%', height : '200', alignItems : 'center', justifyContent : 'space-between', flexDirection : 'column', marginVertical : 10}}>
                  
                  <Text style= {{ fontSize : 16, color : 'lightgray'}}>Sign up</Text>
              </View>
            
          </View>
      </SafeAreaView>
      <ScrollView 
          showsVerticalScrollIndicator = {false}
          style = {{width : '100%', height : '90%', backgroundColor : 'white', borderTopRightRadius : 50, borderTopLeftRadius : 50, paddingHorizontal : 40}}>
  
            <View style={{paddingTop : 30}}>
              <Text style={{fontSize : 14, color : 'gray', marginBottom : 2 }}>Firstname</Text>
  
              <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2',}}>
                  <Ionicons name = 'ios-person' size={20} color='gray'/>
                  <TextInput
                  placeholder = ''
                  placeholderTextColor = 'lightgray'
                  value = {firstname}
                  selectionColor="gray"
                  onChangeText = {e => setFirstname(e)}
                  style={{fontSize : 16, color : 'gray', marginHorizontal : 10, width : 220,}}
              />
  
              </View>
         
               {errors.password && (
                  <Text style={{fontSize : 14, color : 'red', marginTop : 4}}>
                      {errors.firstname}
                  </Text>
              )}
          </View>    
          <View style={{paddingTop : 10}}>
              <Text style={{fontSize : 14, color : 'gray', marginBottom : 2 }}>Enter Email</Text>
  
              <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2',}}>
                  <MaterialIcons name="email" size={20} color="gray" />
                  <TextInput
                  placeholder = ''
                  value = {email}
                  selectionColor="gray"
                  placeholderTextColor = 'lightgray'
                  onChangeText = {e => setEmail(e)}
                  style={{fontSize : 16, color : 'gray', marginHorizontal : 10, width : 220,}}
              />
  
              </View>
  
              {errors.email && (
                  <Text style={{fontSize : 14, color : 'red', marginTop : 4}}>
                      {errors.email}
                  </Text>
              )}
          </View>
        
          
          <View style={{paddingTop : 10}}>
              <Text style={{fontSize : 14, color : 'gray', marginBottom : 2 }}>Enter Password</Text>
           
               <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2', justifyContent :'space-between'}}>
  
              <Ionicons name = 'ios-lock-closed' size={20} color='gray'/>
  
              <TextInput
                  placeholder = ''
                  value = {password}
                  selectionColor="gray"
                  onChangeText = {e => setPassword(e)}
                  secureTextEntry = {hidePassword ? false : true}
                  style={{ width : 200, fontSize : 16, color : 'gray'}}
              />
              <TouchableOpacity onPress = {() => togglePassword()}>
                  <Ionicons name = {hidePassword ? 'eye-off' : 'eye'} size={20} color={hidePassword ? 'gray' : 'lightgray'} />
              </TouchableOpacity>
              </View>
               {errors.password && (
                  <Text style={{fontSize : 14, color : 'red', marginTop : 4}}>
                      {errors.password}
                  </Text>
              )}
          </View>
          <View style={{paddingTop : 10}}>
              <Text style={{fontSize : 14, color : 'gray', marginBottom : 2 }}>Confirm Password</Text>
              <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2', justifyContent :'space-between'}}>
  
              <Ionicons name = 'ios-lock-closed' size={20} color='gray'/>
  
              <TextInput
                  placeholder = ''
                  value = {confirmPassword}
                  selectionColor="gray"
                  onChangeText = {e => setConfirmPassword(e)}
                  secureTextEntry = {hideConfirmPassword ? false : true}
                  style={{ width : 200, fontSize : 16, color : 'gray'}}
              />
              <TouchableOpacity onPress = {() => toggleConfirmPassword()}>
                  <Ionicons name = {hideConfirmPassword ? 'eye-off' : 'eye'} size={20} color={hideConfirmPassword ? 'gray' : 'lightgray'} />
              </TouchableOpacity>
              </View>
               {errors.confirmPassword && (
                  <Text style={{fontSize : 14, color : 'red', marginTop : 4}}>
                      {errors.confirmPassword}
                  </Text>
              )}
          </View>
          
          
  
          <Pressable onPress = {() => onSignUp()} style ={{ backgroundColor : 'brown', borderRadius : 10, alignItems : 'center', justifyContent : 'center', marginVertical : 20, width : '100%', height : 50, elevation : 4}}>
              <Text style = {{ fontSize : 16, color : 'white'}}>Sign Up</Text>
          </Pressable>
  
          {/* <View style= {{  alignItems : 'center', justifyContent : 'center', width : '100%'}}>
              <Text style= {{ fontSize : 20, fontWeight : 'bold', color : 'gray'}}>or</Text>
          </View> */}
  
          {/* <View style= {{ marginVertical : 10, alignItems : 'center', justifyContent : 'space-evenly', width : '100%', flexDirection : 'row',  alignSelf : 'center' }}>
              <Pressable onPress={handleGoogleSignin} style={{width : 50, height : 50, borderRadius : 25, backgroundColor : '#f2f2f2', alignItems : 'center', justifyContent : 'center'}}>
  
                  <Image
                      source = {require('../../../assets/images/google.png')}
                      alt = ''
                      style = {{width : 25, height : 25}}
                      resizeMode = 'contain'
  
                  />
              </Pressable>
              <Pressable onPress={handleFacebookSignin} style={{width : 50, height : 50, borderRadius : 25, backgroundColor : '#f2f2f2', alignItems : 'center', justifyContent : 'center'}}>
                  <Image
                      source = {require('../../../assets/images/facebook.png')}
                      alt = ''
                      style = {{width : 30, height : 30}}
                      resizeMode = 'contain'
  
                  />
              </Pressable>
             
             
          </View> */}
          
          <View style={{width : '100%', height : 50, alignItems : 'center', justifyContent : 'center', flexDirection : 'row'}}>
              <Text style={{ fontSize : 14, color : 'gray', marginRight : 7}}>Don't have an account? </Text>
              <Pressable onPress = {() => {navigation.navigate('LoginScreen')}}>
                  <Text style={{ fontSize : 14, color : 'brown', }}>Log in </Text>
              </Pressable>
              
          </View>
  
      </ScrollView>
      </View>
    )
  }
  
  export default Signup
  
  const styles = StyleSheet.create({
  
      loginContainer : {
          backgroundColor : '#2596be',
          width : '100%',
          height : '100%',
          alignItems : '',
  
  
      }
  })