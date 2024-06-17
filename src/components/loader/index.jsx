import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme';

const Loader = ({visible = false}) => {

  const {height, width} = useWindowDimensions();

  return (

    visible && (
        <View style={[styles.container, {height, width}]}>
        
          <ActivityIndicator
              size='large'
              color='lightgray'
          />
        
      </View>
    )
  
  )

}

export default Loader

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        justifyContent:'center',
        alignItems: 'center'
    },
    loader:{
        height:70,
        // backgroundColor:COLORS.white,
        // marginHorizontal:50,
        // borderRadius: 5,
        // flexDirection:'row',
        alignItems:'center',
        // paddingHorizontal:20,
        justifyContent : 'center'
    }
})