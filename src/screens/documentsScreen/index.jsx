import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { documentsCardData, visaApprovedData } from '../../data';
import { Divider } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import BackArrowComponent from '../../components/backArrow';
import Notification from '../../components/notification';

export default function DocumentScreen({navigation}) {

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
      const r = query(applicationRef, where("userId", "==", user.uid), where('status', 'in', ['DELIVERING', 'DELIVERED', 'APPROVED']));

      const querySnapshot = await getDocs(r);
        let list = []
        let status = []
        let docs = []
        let i = 0
        

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id,  timeStamp: doc.data().timeStamp.toDate().toDateString(), country : doc.data().country, visaDocument : doc.data().visaDocument.downloadURL, status: doc.data().status})
        
        status.push(doc.data().status)
        setapplicationData(list)
        setStatusData(status)
        
        if(doc.data().birthCertificate == "available"){

          docs.push({id:0, name: "Birth Certificate", link: doc.data().birthCertificateImage})
        
        }

      if(doc.data().internationalPassport === "available"){

        docs.push({id:1, name: "International Passport", link: doc.data().internationalPassportImage})

      }

      if(doc.data().companyIntroduction === "available"){

        docs.push({id:2, name: "Company Introduction", link: doc.data().companyIntroductionImage})

      }

      if(doc.data().employmentLetter === "available"){

        docs.push({id:3, name: "Employment Letter", link: doc.data().employmentLettertImage})

      }

      if(doc.data().leaveApprovalLetter === "available"){

        docs.push({id:4, name: "Leave Approval Letter", link: doc.data().leaveApprovalLetterImage})

      }

      if(doc.data().marriageCertificate === "available"){

        docs.push({id:5, name: "Marriage Certificate", link: doc.data().marriageCertificateImage})

      }

      if(doc.data().passportPhotograph === "available"){

        docs.push({id:6, name: "Passport Photograph", link: doc.data().passportPhotographImage})

      }

      if(doc.data().selfIntroduction === "available"){

        docs.push({id:7, name: "Self Introduction", link: doc.data().selfIntroductionImage})

      }

      if(doc.data().travelHistoryImage !== ""){

        docs.push({id:8, name: "Travel History", link: doc.data().travelHistoryImage})

      }

      if(doc.data().decisionLetterImage !== ""){

        docs.push({id:9, name: "Decision Letter", link: doc.data().decisionLetterImage})

      }


      setDocuments(docs)

      });

      console.log(applicationData)

     
      // setDocuments(docs)

    }

    
    
    applicationQuery()   
  },[])

  console.log("docums: ", documents)


 

  
  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />
{/* 
      <div className="image">
        {imageClicked && <img src={img5} alt="ground" />}
      </div> */}
    <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingTop:0}}> 
      <Pressable onPress={() =>navigation.navigate('ProfileScreen')}>
      <Ionicons name="ios-person-outline" size={32} color="white"  /> 
      </Pressable>  
     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width: 200}}>
        <Text style={{fontSize:16, color:COLORS.white}}> Documents</Text>
      </View>
      
    
      <Notification onPress={() => (navigation.navigate('NotificationScreen'))}/>
        
      
      </View>


      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
   

      <View style={{width:'100%', padding:20, marginTop:0}}>
        <View style={{  width:'100%', minHeight:60, backgroundColor:'#D9E7EE', borderRadius:5,  justifyContent:'', flexDirection:'row', paddingHorizontal:20, alignItems:'center'}}>
          <View style={{justifyContent:'center', width:40, height:40, backgroundColor:"white", justifyContent:'center', alignItems:'center',  borderRadius:8}}>
            <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="blue" />
          </View>
          <View style={{marginLeft:20, width:230, minHeight:60, alignItems:'center', paddingVertical:10}}>
          <Text style={{color:'#00000088',fontSize:14, fontWeight:500, }}>Documents used during visa application</Text>
          </View>
         
        </View>
      </View> 

      <View style={{width:'100%', paddingHorizontal:20, backgroundColor:'#00000011', marginVertical:20}}>
        <View style={{  width:'100%', height:60,alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            {/* <Text style={{color:'#00000088', fontWeight:400, marginRight:10, fontSize:14, fontWeight:'bold'}}>S/N</Text> */}
            <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>Documents</Text>
          
          </View>
          {/* <Text style={{color:COLORS.main, fontWeight:400, fontSize:14}}>Status</Text> */}
          <Pressable onPress={() => navigation.navigate('Documents')} style={{flexDirection:'row', alignItems:'center', }}>
          <Text style={{color:COLORS.main, fontWeight:400, fontSize:14, marginRight:3,}}>Views</Text>
          </Pressable>
        </View>
      </View>

      <View style={{width:'100%'}}>
      <View style={{  width:'100%', flexDirection:'column',  justifyContent:'space-between', flexWrap:'wrap', gap:20, paddingHorizontal:20}}>

        {
          documents.map((item)=>(

            <View key={item.id} style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
            
            <Text>{item.name}</Text>
            <Pressable onPress={() => navigation.navigate('ViewDocumentsScreen',{image : item.link, name : item.name})} style={{width:60, height:40, justifyContent:'center', backgroundColor:'#D9E7EE', alignItems:'center', borderRadius:10}}><Text>view</Text></Pressable>

            </View>

          //   <View key={item.id} style={{width:'100%', paddingHorizontal:20,}}>
          //   <View style={{  width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', marginBottom:10}}>
          //     <View style={{flexDirection:'row', alignItems:'center', }}>
          //       {/* <Text style={{color:'#00000088', fontWeight:400, marginRight:20, fontSize:14, fontWeight:'bold'}}>{item.number}</Text> */}
          //       <View style={{flexDirection:'column', gap:5}}>
          //           <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>{item[0]}</Text>
          //           {/* <Text style={{color:'#00000088', fontWeight:400, fontSize:12,}}>{item.date}</Text> */}
          //       </View>
                
              
          //     </View>
          //     <View>

          //       <Text style={{color:'#00000088', fontWeight:400, fontSize:14, fontWeight:'bold'}}>Ready</Text>
               
          //       {/* <Image
          //           source= {require('../../../assets/images/approvedvisa.png')}
          //           alt=''
          //           resizeMode='contain'
          //           style = {{ width : 60, height : 60, }}

          //       /> */}
          //     </View>
          //     <Pressable onPress={() => navigation.navigate('Documents')} style={{flexDirection:'row', alignItems:'center', marginRight:20}}>
          //     <MaterialCommunityIcons name="selection-search" size={24} color={COLORS.main}/>
          //     </Pressable>
          //   </View>
          //   <Divider/>
          // </View>

          ))
        }

       
        
         
        </View>
      </View>


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