import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import BackArrowComponent from '../../components/backArrow'
import { db } from '../../firebase';
import { doc, serverTimestamp, updateDoc} from "firebase/firestore";

const ViewNotificationScreen= ({navigation, route}) => {

  const {id, message} = route.params

  const updateMessages = async() => {

    await updateDoc(doc(db, "messages", id), {
    
      status : "read",

      timeStamp: serverTimestamp(),
      

    })

  }

  useEffect(() => {

    updateMessages()

  },[])
    
  return (
    <View style={{flex:1, paddingHorizontal:20, paddingVertical:50}}>
       <View style={{ marginVertical:20, flexDirection:'row', alignItems:'center', gap:20}}>
        <BackArrowComponent onPress={() => navigation.goBack()}/>
        <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Message</Text>  
       </View>
       <View>
        <Text>{message}</Text>
       </View>
    </View>
  )
}

export default ViewNotificationScreen