import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons} from '@expo/vector-icons';


export default function EmailScreen({navigation}) {


  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>Our Emails</Text>
                </View>
              </View>    
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

      
      <View style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>


      <Ionicons name="mail-outline" size={24} color={COLORS.main} />
      <Text>visadocflymate@gmail.com</Text>
      
        

      </View>

      <View style={{width:'100%', marginTop:20, marginBottom:5, borderWidth:1, borderRadius:5, borderColor:'lightgray', backgroundColor:'white', padding:20, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>


    <Ionicons name="mail-outline" size={24} color={COLORS.main} />
    <Text>info@visadocflymate.com</Text>

    

    </View>


      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

