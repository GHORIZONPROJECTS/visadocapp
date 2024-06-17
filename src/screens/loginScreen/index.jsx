import { Image, StatusBar, StyleSheet, Text, TextInput, View, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { AuthContext } from '../../config/AuthContext';
import Loader from '../../components/loader';


const LoginScreen = ({navigation}) => {

    const [showErrors, setShowErrors] = useState(false)  
    const [errors, setErrors] = useState({})
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(false)
    const [loading, setLoading ] = useState(false)

    // const { dispatch } = useContext(AuthContext)



    const getErrors = (email, password, confirmPassword) => {

        const errors = {}
    
    
        if (!email) {
            
            errors.email = 'Please enter your email';
    
        } else if (!email.includes('@') || !email.includes('.')) {
            
            errors.email = 'Please enter a Valid email'
    
        }
    
    
    
        if (!password) {
            
            errors.password = 'Enter password';
    
        } else if (password.length < 8) {
            
            errors.password = 'incorrect password'
    
        }
    
    
        return errors;
    
      }


  const onLogin = () => {

    const errors = getErrors(email, password);

    if (Object.keys(errors).length > 0) {
        
        setShowErrors (true);
        setErrors(showErrors && errors)

    } else {

        setErrors({})
        setShowErrors(false)
        
        console.log('log in')

        handleLogin(email, password)

    }


  }

  const handleLogin = (email, password) => {

    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
      // Signed in 
      
      const user = userCredential.user;


    //   dispatch({type:"LOGIN", payload:user})

      setLoading(false)

      // ...
    })
    .catch((error) => {

      const errorCode = error.code;

      const errorMessage = error.message;

      console.log(errorCode)
      console.log(errorMessage)

      if(errorCode === 'auth/auth/user-not-found'){

        return setErrors({email : 'Email not found'})

      }

      if(errorCode === 'auth/invalid-credential'){

        return setErrors({email : 'Invalid login credentials'})

      }

      
      if(errorCode === 'auth/invalid-password'){

        return setErrors({password : 'Invalid login credentials'})

      }

      setLoading(false)

    });

    
    setLoading(false)

  }

  const togglePassword = () => {

    setHidePassword(!hidePassword)

  }
    
  return (
    <View style={styles.loginContainer}>

    <Loader visible = {loading} />

    <SafeAreaView style = {{paddingTop : 10, paddingLeft : 20, paddingRight : 20}}>
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
                        style={{width : 150, height : 100, marginLeft:50}}
                        resizeMode = 'contain'

                    />
                </View>
            </View>

          

            <View style = {{width : '100%', height : '50', alignItems : 'center', justifyContent : 'space-between', flexDirection : 'column', marginVertical : 10}}>
                <Text style={{fontSize : 24, fontWeight : 'bold', color : 'lightgray', marginBottom : 5}}>Welcome Back</Text>
                <Text style= {{ fontSize : 16, color : 'lightgray'}}>Sign in to continue</Text>
            </View>
          
        </View>
    </SafeAreaView>
    <ScrollView 
        showsVerticalScrollIndicator = {false}
        style = {{width : '100%', height : '90%', backgroundColor : 'white', borderTopRightRadius : 50, borderTopLeftRadius : 50, paddingHorizontal : 40}}>

            {errors.email && (
                <Text style={{fontSize : 14, color : 'red', marginTop : 20}}>
                    {errors.email}
                </Text>
            )}    
        <View style={{paddingTop : 10}}>
            <Text style={{fontSize : 14, color : 'gray', marginBottom : 10 }}>Enter Email</Text>
            <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2',}}>
                <MaterialIcons name="email" size={20} color='gray'/>
                <TextInput
                placeholder = ''
                value = {email}
                
                onChangeText = {e => setEmail(e)}
                style={{fontSize : 16, color : 'gray', marginHorizontal : 10, width : 220,}}
            />

            </View>
            
           
        </View>
        <View style={{paddingTop : 20}}>
            <Text style={{fontSize : 14, color : 'gray', marginBottom : 10 }}>Enter Password</Text>
            <View style = {{flexDirection : 'row', alignItems : 'center', paddingVertical:12,  paddingHorizontal : 10, backgroundColor : '#f2f2f2', borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2', justifyContent :'space-between'}}>

                <Ionicons name = 'ios-lock-closed' size={20} color='gray'/>

                <TextInput
                    placeholder = ''
                    value = {password}
                    onChangeText = {e => setPassword(e)}
                    secureTextEntry = {hidePassword ? false : true}
                    style={{ width : 200, fontSize : 16, color : 'gray'}}
                />
                <TouchableOpacity onPress = {() => togglePassword()}>
                    <Ionicons name = {hidePassword ? 'eye-off' : 'eye'} size={20} color={hidePassword ? 'gray' : 'lightgray'} />
                </TouchableOpacity>
            </View>
          
           
        </View>
        <View style={{paddingTop : 6,alignItems:'flex-end', width : '100%', }}>
            <Pressable onPress = {() => {navigation.navigate('ForgotPasswordScreen')}}>
                <Text style={{color : 'gray', fontWeight : 400}}>Forgot Password?</Text>
            </Pressable>
        </View>
        <View style={{ backgroundColor : 'brown', borderRadius : 5, alignItems : 'center', justifyContent : 'center', marginVertical : 20, width : '100%', height : 50}}>
            <Pressable style={{  }} onPress = {() => onLogin()}>
                <Text style = {{ fontSize : 16, color : 'white'}}>Log In</Text>
            </Pressable>
        </View>

        {/* <View style= {{ marginVertical : 10, alignItems : 'center', justifyContent : 'center', width : '100%'}}>
            <Text style= {{ fontSize : 20, fontWeight : 'bold', color : 'gray'}}>or</Text>
        </View>

        <View style= {{ marginVertical : 10, alignItems : 'center', justifyContent : 'space-evenly', width : '100%', flexDirection : 'row',  alignSelf : 'center' }}>
            <View style={{width : 50, height : 50, borderRadius : 25, backgroundColor : '#f2f2f2', alignItems : 'center', justifyContent : 'center'}}>

                <Image
                    source = {require('../../../assets/images/google.png')}
                    alt = ''
                    style = {{width : 25, height : 25}}
                    resizeMode = 'contain'

                />
            </View>
            <View style={{width : 50, height : 50, borderRadius : 25, backgroundColor : '#f2f2f2', alignItems : 'center', justifyContent : 'center'}}>
                <Image
                    source = {require('../../../assets/images/facebook.png')}
                    alt = ''
                    style = {{width : 30, height : 30}}
                    resizeMode = 'contain'

                />
            </View>
           
           
        </View> */}
        <View style={{width : '100%', height : 100, alignItems : 'center', justifyContent : 'center', flexDirection : 'row'}}>
            <Text style={{ fontSize : 14, color : 'gray', marginRight : 7}}>Don't have an account? </Text>
            <Pressable
                 onPress = {() => {navigation.navigate('Signup')}}
            >
                <Text style={{ fontSize : 14, color : 'brown', }}>Sign Up </Text>
            </Pressable>
            
        </View>

    </ScrollView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

    loginContainer : {
        backgroundColor : '#2596be',
        width : '100%',
        height : '100%',
        // padding : 20
        
         alignItems : '',
         
    } 
})