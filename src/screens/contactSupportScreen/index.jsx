import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { NotificationListData, ProfileListData, documentsCardData } from '../../data';
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
// import  DateTimePicker  from '@react-native-community/datetimepicker';
// import { SelectList } from 'react-native-select-bottom-list';
// import Loader from "../../components/loader";
// import Constants from "expo-constants";
// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
// import { useIsFocused } from "@react-navigation/native";





export default function ContactSupportScreen({navigation}) {

const [expiration, setExpiration] = useState('');

const [dateOfBirth, setDateOfBirth] = useState('');

const [formReady, setFormReady] = useState(false);

const [dateError, setDateError] = useState('');

const [error, setError] = useState('');

const [date, setDate] = useState(new Date());

const [state, setState] = useState('Choose a state');

// const [dateExp, setDateExp] = useState(new Date());
const [loading, setLoading ] = useState(false)

const [showPicker, setShowPicker] = useState(false);

const [value, setValue] = React.useState('male');



  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>Contact Support</Text>
                </View>
              </View>    
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

      <View style={{marginVertical:20,  height:120, alignItems:'center', justifyContent:'center', borderRadius:10, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <Image
            source= {require('../../../assets/images/supportTeam.png')}
            alt=''
            resizeMode='contain'
            style = {{ width : 100, height : 100, }}

        /> 
        <View style={{flex:1, flexDirection:'column', alignItems:'center' }}>
          <Text style={{fontSize:18, fontWeight:700, color:'black'}}>Hello, how can we</Text><Text style={{fontSize:18, fontWeight:700, color:'black'}}> help you</Text>
        </View>
       
      </View>  

{/* 
      <Pressable onPress={() => navigation.navigate('chat')} style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>

      <Text>Contact live Chat</Text>
      <Ionicons name="chevron-forward" size={24} color={COLORS.main} />
      

      </Pressable> */}
    

      <Pressable onPress={() => navigation.navigate("EmailScreen")} style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>

      <Text>Send us an email</Text>
      <Ionicons name="chevron-forward" size={24} color={COLORS.main} />
        

      </Pressable>

      <Pressable onPress={() => navigation.navigate("FAQScreen")} style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>

      <Text>Frequently asked Question</Text>
      <Ionicons name="chevron-forward" size={24} color={COLORS.main} />
        
      </Pressable>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

