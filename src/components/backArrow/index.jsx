import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme'

const BackArrowComponent = ({onPress}) => {
    return(
        <View style={{flexDirection:'column', }}>
            <TouchableOpacity onPress={onPress} style={{marginBottom:10, width:60, height:60, borderRadius:30, alignItems:'center', justifyContent:'center', backgroundColor:'lightgray'}}>
            {/* <View style={{width:60, height:60, backgroundColor:'#dad8d8', alignItems:'center', justifyContent:'center', borderRadius:30}}> */}
                <Ionicons name="ios-chevron-back-outline" size={36} color='white' />
                {/* <Ionicons name="md-list-outline" size={24} color={COLORS.white} /> */}
            {/* </View>  */}
            </TouchableOpacity>
      
      
        
        </View>
    )
  }

export default BackArrowComponent

const styles = StyleSheet.create({})