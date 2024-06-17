import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback,  } from 'react-native'
import React, {useState} from 'react'
import {AntDesign} from '@expo/vector-icons';

export default function Accordion({title, details}) {
  
  const [opened, setOpened] = useState(false)
  const [animation] = useState(new Animated.Value(0))

  const numberOfWords = details.split("").length;

  function toggleAccordion(){

    if(!opened){
        Animated.timing(animation,{
            toValue:1,
            duration:100,
            useNativeDriver:false
        }).start()
    }else{
        Animated.timing(animation,{
            toValue:0,
            duration:100,
            useNativeDriver:false
        }).start()
    }
    setOpened(!opened)
  }

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0,1],
    outputRange: [0, (numberOfWords/13) *10]
  })


  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={toggleAccordion}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <AntDesign name={opened ? 'minus' : 'plus'} size={20}/>
            </View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.content, {height:heightAnimationInterpolation}]}>
            <Text style={styles.details}>{details}</Text>
        </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginVertical:10,
        padding:15,
        backgroundColor:'white',
        borderRadius:6
    },
    title: {
        fontWeight: 'bold',
        textTransform : 'capitalize',
        opacity: 0.65
    },
    content : {
        marginTop: 8
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    details: {
        opacity: 0.5
    }
})