import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { ProfileListData, documentsCardData } from '../../data';
import { Divider } from 'react-native-paper';
import {auth, db} from '../../firebase'
import { signOut } from 'firebase/auth';

import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import Notification from '../../components/notification';

export default function ProfileScreen({navigation}) {

  
  const [userData, setUserData] = useState({})

  const { user } = useContext(AuthContext)

  const logout = () =>{

    auth.signOut();

  }

  const getUser = async() => {
    const docRef = doc(db, "travellers", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        setUserData(docSnap.data())
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getUser()
  }, [])

  console.log(userData)

  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}> 
      <View style={{flexDirection:'row'}}>
               
               <Image
                   source= {require('../../../assets/images/user.png')}
                   alt=''
                   resizeMode='contain'
                   style = {{ width : 40, height : 40, }}

               />
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontSize:16, color:COLORS.white}}>{userData.firstname} {userData.surname}</Text>
                    <Text style={{fontSize:12, color:'#ffffff99', fontWeight:'bold'}}>{userData.email}</Text>
                </View>
     </View>

     <Notification/>
    
   
        
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
     
      
      <View style={{width:'100%', marginTop:50}}>
      <View style={{  width:'100%', flexDirection:'row',  justifyContent:'space-between', flexWrap:'wrap', gap:20}}>

        {
          ProfileListData.map((item)=>(

            <View key={item.id} style={{width:'100%', paddingHorizontal:20,}}>
                <Pressable onPress={() => navigation.navigate(item.screen)} style={{flexDirection:'row', alignItems:'center', marginRight:20}}>
            <View style={{  width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', marginBottom:10}}>
              <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                <Ionicons name={item.icon} size={24} color={item.iconColor}/>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{color:'#00000088', fontWeight:400, fontSize:16,}}>{item.title}</Text>
                </View>
                
              
              </View>
{/*              
              <Pressable onPress={() => navigation.navigate(item.screen)} style={{flexDirection:'row', alignItems:'center', marginRight:20}}> */}
              <Ionicons name="chevron-forward" size={24} color={COLORS.main} />
              {/* </Pressable> */}
            </View>
            </Pressable>
            <Divider/>
          </View>


          ))
        }

        </View>

        <Pressable onPress={logout} style={{  width:'90%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', marginBottom:10, alignSelf:'center', marginTop:20}}>
              <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                <Ionicons name="ios-log-out-outline" size={24} color="red"/>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{color:'#00000088', fontWeight:400, fontSize:16,}}>Logout</Text>
                </View>
                
              
              </View>
             
              <View style={{flexDirection:'row', alignItems:'center', marginRight:20}}>
              <Ionicons name="chevron-forward" size={24} color={COLORS.main} />
              </View>
        </Pressable>
      
      </View>

     
      <Pressable onPress={() => navigation.goBack()} style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:200}}>
            <Ionicons name='ios-arrow-back-outline' size={24} color="#00000099"/>
            <Text  style={{color:COLORS.main, marginLeft:10, fontSize:18, }}>Back to Home</Text>
      </Pressable>
      
     
      
      </ScrollView>

    
      
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

// import { StyleSheet, Text, Pressable, View } from 'react-native'
// import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const HomeScreen = () => {

//   const clearOnboarding = async() => {

//     try {

//       await AsyncStorage.removeItem('@viewedOnboarding')
      
//       return true;

//     } catch (error) {
      
//       console.log('Error @remeoveItem :', error)

//     }

//   }

//   return (

//     <View>

//       <Text>Home</Text>

//       <Pressable onPress={clearOnboarding}>
      
//         <Text>Clear Onboarding</Text>
        
//       </Pressable>

//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({})