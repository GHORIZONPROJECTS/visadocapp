import { StyleSheet, Text, View, StatusBar, Image, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = ({navigation}) => {

//   const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <StatusBar />
      <View style={styles.welcomeBody}>
        <Text style ={styles.welcomeTextHeader}>Let's Get Started!</Text>

        <View style = {styles.welcomeImageBody}>
            <Image 
                source = {require('../../../assets/images/travel.png')}
                style = {styles.welcomeImage}
                alt = ''
                resizeMode = 'contain'
            />
        </View>

        <Pressable onPress = {() => {navigation.navigate('LoginScreen')}} style ={styles.welcomeButton}>
            <Text style = {styles.welcomeButtonText}>Log in</Text>
        </Pressable>
        <View style={{flexDirection : 'row', marginVertical : 10, justifyContent : 'flex-end'}}>
        <Text style={{color : 'white'}}>Already have an account ?</Text>
        <TouchableOpacity  onPress = {() => {navigation.navigate('Signup')}}>
            <Text style = {{color : 'black', marginLeft : 8, color : 'brown'}}>Sign Up</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    welcomeContainer : {
        flex : 1,
        backgroundColor : '#2596be',
        width : '100%',
        height : '100%'

    },

    welcomeBody : {
        height : '100%',
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'column'
    },

    welcomeTextHeader : {
        fontWeight : 'bold',
        fontSize : 30,
        color : 'white'
    },

    welcomeImageBody : {
        marginVertical : 100,
    },

    welcomeImage : {
        width : 300,
        height : 300
    },

    welcomeButton : {
        width : '80%',
        paddingVertical : 15,
        backgroundColor : 'brown',
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center'
    }, 

    welcomeButtonText : { 
        color : 'white',
        fontSize : 16,
        fontWeight : '400'

    }
})