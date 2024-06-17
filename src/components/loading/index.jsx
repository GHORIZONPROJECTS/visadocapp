import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.background}>

      <ActivityIndicator size='large' color='white'/>

    </View>
  )
}

export default Loading

const styles = StyleSheet.create({

  background : {
    width : '100%',
    height : '100%',
    backgroundColor : '#00000077',
    justifyContent : 'center'
  }
})


