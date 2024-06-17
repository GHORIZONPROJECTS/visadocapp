import { View, Text, Pressable } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { auth, db } from '../../firebase';
import { SIZES, COLORS } from '../../constants/theme'
import { AuthContext } from '../../config/AuthContext'
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { where, collection, query, onSnapshot,   orderBy, limit } from "firebase/firestore";

const Notification = ({onPress}) => {

    const [userData, setUserData] = useState([]) 
    const { user} = useContext(AuthContext)
    const [messageCount, setMessageCount] = useState(null)

    const alertsAndNotifications = async() => {

        const q = query(collection(db, "messages"), where("userId", "==", user.uid), where("status", "==", "unread"));
      
        onSnapshot(q, (querySnapshot) => {
         
          setMessageCount(querySnapshot.docs.length)
          
        });
      
      
      }
      
      useEffect(() => {
        alertsAndNotifications()
      }, [])
      
      

  return (
 
    <Pressable onPress={onPress}>
        <View>
        <Ionicons name="ios-notifications-outline" size={24} color="white" />
        {messageCount

        ?
        
        <View style={{position:'absolute', right:-5, top:-5, width:16, height:16, borderRadius:8, backgroundColor:'red', alignItems:'center', justifyContent:'center' }}><Text style={{color:'white', fontSize:10, fontWeight:'bold'}}>{messageCount}</Text></View>

        : 

        ""

        }
        
        </View>
    </Pressable>
  )
}

export default Notification