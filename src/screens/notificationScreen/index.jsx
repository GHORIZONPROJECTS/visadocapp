import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { NotificationListData, ProfileListData, documentsCardData } from '../../data';
import { Divider } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot, deleteDoc } from "firebase/firestore";


export default function NotificationScreen({navigation}) {

  const [messageInfo, setMessageInfo] = useState([])

  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState("null");

  const { user} = useContext(AuthContext)

  const messageQuery = () => {

    const q = query(collection(db, "messages"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const value = [];
      querySnapshot.forEach((doc) => {
          value.push({id : doc.id, message : doc.data().message, iconName : doc.data().iconName});
      });
      setMessageInfo(value)
      
    });
  
  }
  
    useEffect(()=>{

     messageQuery()

    }, [])


    const ShowAlert = ({ closeDialog, deleteId}) => {

      const handleDelete = async() => {

        await deleteDoc(doc(db, "messages", deleteId));
        setMessageInfo(messageInfo.filter((item) => item.id !== id))
  
      
      }

      Alert.alert(
        'Delete Message',
        'Are you sure you want to delete this message',
        
        [
          {
            text: 'No',
            onPress: () => closeDialog,
            style: 'cancel', marginRight : 50
          },
          {
            text: 'Yes',
            onPress: () => {handleDelete}
          },
        ],
        {
          cancelable: true,
          
        },
      );

    }


    function openDelete(id) {
      setOpen(true);
      setDeleteId(id);
    }


    const handleDelete = async() => {

      await deleteDoc(doc(db, "messages", deleteId));
      setMessageInfo(messageInfo.filter((item) => item.deleteId !== deleteId))

    
  }


    
 console.log('delete Id: ', deleteId)
  
    
  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

        {open && <ShowAlert 
        
        closeDialog={() => setOpen(false)}
        // title={deleteData?.name}
        deleteId={deleteId}
        
        
        />
        }
      
        <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={28} color="white" />
                </Pressable>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>Notification</Text>
                </View>
              </View>

                <Text style={{fontSize:16, color:COLORS.white}}>Mark as read</Text>
    
  
      </View>
     <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
     
      
      <View style={{width:'100%', marginTop:20}}>
      <View style={{  width:'100%', flexDirection:'row',  justifyContent:'space-between', flexWrap:'wrap', gap:20}}>

        {
          messageInfo.map((item, index)=>(

          <View key={index.toString()} style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Pressable onPress={() => navigation.navigate('ViewNotificationScreen',{id: item.id, message: item.message})} style={{  width:'80%', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', paddingHorizontal:10}}>
              <View style={{flexDirection:'row', gap:10}}>
                <View style={{width:50, height:50, borderRadius:25, alignItems:'center', justifyContent:'center', backgroundColor:'#00000012'}}>
                <Ionicons name={item.iconName} size={24} color={item.iconColor}/>
                </View>
                <View style={{flexDirection:'column', marginLeft:10, width: 200}}>
                  {
                    item.status === "unread" ? 

                    <Text style={{color:'#00000088',  fontSize:12, fontWeight:'bold'}}>{item.message}</Text>

                    :

                    <Text style={{color:'#00000088',  fontSize:12, }}>{item.message}</Text>

                  }
                   
                </View>
                
              </View>
             
              
            </Pressable>
            {/* <Pressable onPress={() =>openDelete(item.id)} style={{flexDirection:'row', alignItems:'center', marginRight:15, width: 40, height: 40, borderRadius:25,alignItems:'center', justifyContent:'center', backgroundColor:'#FAE9E9'}}>
              <MaterialCommunityIcons name="delete" size={20} color="red"/>
              </Pressable> */}
          </View>

          

           
          ))
        }

        </View>
      </View>


      </ScrollView>

    
      
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

