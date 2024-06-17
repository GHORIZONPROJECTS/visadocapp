import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'

const ReviewsHeaderComponent = ({onPress}) => {
    return(
        <View style={{flexDirection:'row', height:50, alignItems:'center', justifyContent:'space-around', marginTop:50, marginBottom:20}}>
        <TouchableOpacity onPress={onPress}>
          <View style={{width:60, height:60, backgroundColor:'#dad8d8', alignItems:'center', justifyContent:'center', borderRadius:30}}>
            <Ionicons name="ios-arrow-back-sharp" size={30} color={COLORS.textBlack} />
          </View> 
        </TouchableOpacity>
        
        <Text style={{fontSize:18, fontWeight:'bold'}}>Write a Review</Text>
        <View></View>
        </View>
    )
  }

export default ReviewsHeaderComponent 

const styles = StyleSheet.create({})