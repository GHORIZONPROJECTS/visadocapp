import { Image, StatusBar, StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import { auth, authPass } from '../../firebase';
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = ({navigation}) => {

  const [email, setEmail] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const forgotPassword = () => {

    sendPasswordResetEmail(authPass, email)

        .then(() => {

            alert('Password reset email sent')

            navigation.navigate("WelcomeScreen")
            // Password reset email sent!
            // ..
        })
        .catch((error) => {

            setErrorMessage(error.message)
            
        });

  }


    
  return (
    <View style={styles.loginContainer}>
    <SafeAreaView style = {{paddingTop : 10, paddingLeft : 20, paddingRight : 20}}>
        <StatusBar />
        <View style={{}}>

            {errorMessage !== "" &&
            
            <View>
                <Text style={{color:'red'}}>{errorMessage}</Text>
            </View>

            }
            
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
                        style={{width : 250, height : 100}}
                        resizeMode = 'cover'

                    />
                </View>
            </View>

          

            <View style = {{width : '100%', height : '50', alignItems : 'center', justifyContent : 'space-between', flexDirection : 'column', marginVertical : 10}}>
                <Text style={{fontSize : 24, fontWeight : 'bold', color : 'lightgray', marginBottom : 5}}>Forgot Password</Text>
            </View>
          
        </View>
    </SafeAreaView>
    <View style = {{width : '100%', height : '90%', backgroundColor : 'white', borderTopRightRadius : 50, borderTopLeftRadius : 50, paddingHorizontal : 40}}>
        <View style={{paddingTop : 40}}>
            <Text style={{fontSize : 14, color : 'gray', marginBottom : 10 }}>Enter Email</Text>
            <TextInput
                placeholder = ''
                value = {email}
                onChangeText = {value => setEmail(value)}
                style={{backgroundColor : '#f2f2f2', paddingVertical:12, paddingHorizontal : 15, borderRadius : 5, borderWidth : 1, borderColor : '#f2f2f2'}}
            />
        </View>
      
        <View style={{ backgroundColor : 'brown', borderRadius : 5, alignItems : 'center', justifyContent : 'center', marginVertical : 20, width : '100%', height : 50}}>
            <Pressable style={{  }} onPress = {forgotPassword}>
                <Text style = {{ fontSize : 16, color : 'white'}}>Send</Text>
            </Pressable>
        </View>

       
    </View>
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({

    loginContainer : {
        backgroundColor : '#2596be',
        width : '100%',
        height : '100%',
        // padding : 20
        
         alignItems : '',
         


    }
})