import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, ImageBackground, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import Accordion from '../../components/accordion';

faqs = [
  {
    question: 'how long is visa processing time ',
    answer: 'usually takes one month'
  },
  {
    question: ' is canada a good location for tourism ',
    answer: 'canada is the most recommended country and choice location for holidays, honey moon, reunion and residential '
  },
  {
    question: 'how many times do i have to apply',
    answer: 'most of our applicants apply just once and get their visa without stress of extra charges'
  },
  {
    question: 'what is visadoc success recorded',
    answer: 'visadoc has recorded over a hundreds of successfull applicants so far'
  },
  {
    question: 'does visadoc provide other visa services',
    answer: 'Yes, we provide other visa services like work, school and more'
  },
]

export default function FAQScreen({navigation}) {


  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>FAQ</Text>
                </View>
              </View>    
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width, paddingHorizontal:20}}>

        {
          faqs.map((faq, index) =>   <Accordion key={index.toString()} title={faq.question} details={faq.answer}/>)
        }

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

