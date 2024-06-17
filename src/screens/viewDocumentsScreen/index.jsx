import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import BackArrowComponent from '../../components/backArrow'

const ViewDocumentsScreen = ({navigation, route}) => {

  const {image, name} = route.params  

//   const [imageUrl, setImageUrl] = useState(null)
  
    
  return (
    <View style={{flex:1, width:'100%', height:'100%', backgroundColor:'black', paddingTop:50, paddingHorizontal:10}}>
      <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20, }}>
        <BackArrowComponent onPress={() => navigation.goBack()}/>
        <Text style={{color:'white'}}>{name}</Text>
      </View>
      <Image
         source={{ uri: image }}
        alt='image'
        style={{width:'100%', height:'90%'}}
      />
    </View>
  )
}

export default ViewDocumentsScreen