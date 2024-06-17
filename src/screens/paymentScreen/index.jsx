import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { NotificationListData, ProfileListData, documentsCardData } from '../../data';
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";


export default function PaymentScreen({navigation}) {

const [visaInfo, setVisaInfo] = useState([])

const { user} = useContext(AuthContext)

const visaQuery = () => {

    const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const value = [];
      querySnapshot.forEach((doc) => {
          value.push({id : doc.id, total : doc.data().total, destination: doc.data().country, date: doc.data().timeStamp.toDate().toLocaleString()});
      });
      setVisaInfo(value)
      
      console.log("Current cities in CA: ",value);
    });

 
  
  }
  
    useEffect(()=>{
     visaQuery()
    }, [])

    console.log("Current visa info: ",visaInfo);

  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>All Payments</Text>
                </View>
              </View>    
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

      <View style={{marginVertical:20,  height:120, alignItems:'center', justifyContent:'center', borderRadius:10, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <Image
            source= {require('../../../assets/images/payment-method.png')}
            alt=''
            resizeMode='contain'
            style = {{ width : 100, height : 100, }}

        /> 
        <View style={{flex:1, flexDirection:'column', alignItems:'center' }}>
          <Text style={{fontSize:18, fontWeight:700, color:COLORS.main}}>Visa Processing and</Text><Text style={{fontSize:18, fontWeight:700, color:COLORS.primary}}> Documents Charges</Text>
        </View>
       
      </View>  

      <View style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'lightgray', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            
            <Text style={{fontWeight:'bold'}}>Destination</Text>
            <Text style={{fontWeight:'bold'}}>Date</Text>
            <Text style={{fontWeight:'bold'}}>Charges</Text>
        
            </View>

      

      {
        visaInfo.map(item => {
              return (
               
            
                <View key={item.id} style={{width:'100%', marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            
                    <Text>{item.destination}</Text>
                    <View style={{width:100}}>
                    <Text>{item.date}</Text>
                    </View>
                    <Text>${item.total}</Text>
            
                </View>
            
              )
            })
      } 

 

   
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

