import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { documentsCardData, visaApprovedData } from '../../data';
import { Divider } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import BackArrowComponent from '../../components/backArrow';

export default function AllApplicationScreen({navigation}) {

  const [userData, setUserData] = useState([])  
  
  const [loading, setLoading] = useState(false)

  const [applicationData, setapplicationData] =useState([])

  const [statusData, setStatusData] =useState([])

  const [ applicationInfo, setApplicationInfo ] = useState("")

  const [visaInfo, setVisaInfo] = useState("")

  const [userVisa, setUserVisa] = useState([])

  const { user} = useContext(AuthContext)

  const {visaId} = useContext(VisaContext)

  const [documents, setDocuments] = useState([])

  const [imageClicked, setImageClicked] = useState(false);


  const imageView = (url) => {

    setImageClicked(true);

  };



  useEffect(() => {
    
    //LISTEN REAL TIME

    const applicationQuery = async() => {

      const applicationRef = (collection(db, "visa"));
      // const q = query(applicationRef, where("userId", "==", user.uid));
      const r = query(applicationRef, where("userId", "==", user.uid), where("constant", "==", "active"));

      const querySnapshot = await getDocs(r);
        let list = []
        

      querySnapshot.forEach((doc) => {

        list.push({ id: doc.id,  date: doc.data().timeStamp.toDate().toDateString(), country : doc.data().country, status: doc.data().status})


        setapplicationData(list)
      });

    }

    applicationQuery()   
  },[])

  
  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />


   
      <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', }}>
        <BackArrowComponent onPress={() => navigation.goBack()}/>
        <Text style={{fontSize:18, color:'black', marginLeft: 80, fontWeight:'bold'}}>All Visa Application</Text>  
        
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
   

      <View style={{width:'100%', padding:20, marginTop:0}}>
        <View style={{  width:'100%', minHeight:60, backgroundColor:'#D9E7EE', borderRadius:5,  justifyContent:'', flexDirection:'row', paddingHorizontal:20, alignItems:'center'}}>
          <View style={{justifyContent:'center', width:40, height:40, backgroundColor:"white", justifyContent:'center', alignItems:'center',  borderRadius:8}}>
            {/* <Ionicons name="ios-information-circle" size={24} color="white" /> */}
            <FontAwesome name="cc-visa" size={24} color="blue" />
          </View>
          <View style={{marginLeft:20, width:230, minHeight:60, alignItems:'center', paddingVertical:10}}>
          <Text style={{color:'#00000088',fontSize:14, fontWeight:500, }}>checkout history of all my visa applications</Text>
          </View>
         
        </View>
      </View> 

      <View style={{width:'100%', paddingHorizontal:20, backgroundColor:'#00000011', marginVertical:20}}>
        <View style={{  width:'100%', height:60,alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            {/* <Text style={{color:'#00000088', fontWeight:400, marginRight:10, fontSize:14, fontWeight:'bold'}}>S/N</Text> */}
            <Text style={{color:'#000000', fontWeight:400, fontSize:16, fontWeight:'bold'}}>Country</Text>
          
          </View>
          <Text style={{color:'#000000', fontWeight:400, fontSize:16, fontWeight:'bold'}}>Date</Text>
          <Text style={{color:'#000000', fontWeight:400, fontSize:16, fontWeight:'bold'}}>Status</Text>
          <Text style={{color:'#000000', fontWeight:400, fontSize:16, fontWeight:'bold'}}>View</Text>
       </View>
      </View>

      <View style={{width:'100%'}}>
      <View style={{  width:'100%', flexDirection:'column',  justifyContent:'space-between', flexWrap:'wrap', gap:10, paddingHorizontal:20}}>

        {
          applicationData.map(item=>(

            <View key={item.id} style={{width:'100%'}}>
            <View style={{  width:'100%', height:60,alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
              <View style={{flexDirection:'row', alignItems:'center', }}>
              
                <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>{item.country}</Text>
              
              </View>
              <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>{item.date}</Text>
              <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>{item.status}</Text>
              <Pressable onPress={() => navigation.navigate('ViewApplicationScreen', {visaId : item.id})} style={{flexDirection:'row', alignItems:'center', }}>
              <Text style={{color:'red', fontWeight:400, fontSize:14, fontWeight:'bold' }}>View</Text>
              </Pressable>
            </View>
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

