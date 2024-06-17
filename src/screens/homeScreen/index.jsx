import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
// import { documentsCardData } from '../../data';
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc , getDocs, where, collection, query, onSnapshot,   orderBy, limit } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import Loader from "../../components/loader";
import Notification from '../../components/notification';



export default function HomeScreen({navigation}) {


  const [userData, setUserData] = useState([])  
  
  const [loading, setLoading] = useState(false)

  const [statusInfo, setStatusInfo] = useState("")

  const [applicationData, setapplicationData] =useState([])

  const [statusData, setStatusData] =useState([])

  const [ applicationInfo, setApplicationInfo ] = useState("")

  const [visaInfo, setVisaInfo] = useState("")

  const [userVisa, setUserVisa] = useState([])

  const [interview, setInterview] = useState("")

  const { user} = useContext(AuthContext)

  const {visaId} = useContext(VisaContext)

  const [approvedData, setApprovedData] = useState("")

  const [pendingData, setPendingData] = useState("")

  const [rejectedData, setRejectedData] = useState("")

  const [messageCount, setMessageCount] = useState(null)

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


  useEffect(() => {
    
    //LISTEN REAL TIME

    const interviewDateQuery = () => {

      const i = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(1));
      onSnapshot(i, (querySnapshot) => {
      const interviewDate = [];
      const status = [];
        querySnapshot.forEach((doc) => {
            interviewDate.push(doc.data().interviewDate.toDate().toDateString());
            status.push(doc.data().status)
            setInterview(interviewDate)
            setStatusInfo(status)
        });
       
      });

      console.log('interview date: ', interview)

      console.log('status info: ', statusInfo)


      const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(1));
      onSnapshot(q, (querySnapshot) => {
        const value = [];
        querySnapshot.forEach((doc) => {
            // value.push({status:doc.data().status, id:doc.id});
             value.push({id:doc.id, status:doc.data().status});
            // setVisaInfo(value)
        });
        setVisaInfo(value)
      });


    }
    
    interviewDateQuery()   

  },[])



  useEffect(() => {

    applicationQuery = () => {

       const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(2));
        onSnapshot(q, (querySnapshot) => {
        let list = []
        let status = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id,  date: doc.data().timeStamp.toDate().toDateString(), country : doc.data().country, visaDocument : doc.data().visaDocument, status: doc.data().status})
          status.push(doc.data().status)
          setapplicationData(list)
          setStatusData(status)
        });
    });


    }

    applicationQuery()

  },[])

  // APPROVED DATA

  useEffect(() => {

    approvedQuery = () => {

       const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(1));
        onSnapshot(q, (querySnapshot) => {
        let approved = []
        querySnapshot.forEach((doc) => {

          if( doc.data().availableInternationalPassport === "approved"){
  
            approved.push(doc.data().availableInternationalPassport)
  
          }

          if( doc.data().availablePassportPhotograph === "approved"){
  
            approved.push(doc.data().availablePassportPhotograph)
  
          }

          if( doc.data().availableBirthCertificate === "approved"){
  
            approved.push(doc.data().availableBirthCertificate)
  
          }

          if( doc.data().availableMarriageCertificate === "approved"){
  
            approved.push(doc.data().availableMarriageCertificate)
  
          }

          if( doc.data().availableStatementOfAccount === "approved"){
  
            approved.push(doc.data().availableStatementOfAccount)
  
          }

          if( doc.data().availableCompanyIntroduction === "approved"){
  
            approved.push(doc.data().availableCompanyIntroduction)
  
          }

          if( doc.data().availableSelfIntroduction === "approved"){
  
            approved.push(doc.data().availableSelfIntroduction)
  
          }

          if( doc.data().availableLeaveApprovalLetter === "approved"){
  
            approved.push(doc.data().availableLeaveApprovalLetter)
  
          }

          if( doc.data().availableEmploymentLetter === "approved"){
  
            approved.push(doc.data().availableEmploymentLetter)
  
          }

          
          if( doc.data().unavailableInternationalPassport === "approved"){
  
            approved.push(doc.data().unavailableInternationalPassport)
  
          }

          if( doc.data().unavailablePassportPhotograph === "approved"){
  
            approved.push(doc.data().unavailablePassportPhotograph)
  
          }

          if( doc.data().unavailableBirthCertificate === "approved"){
  
            approved.push(doc.data().unavailableBirthCertificate)
  
          }

          if( doc.data().unavailableMarriageCertificate === "approved"){
  
            approved.push(doc.data().unavailableMarriageCertificate)
  
          }

          if( doc.data().unavailableStatementOfAccount === "approved"){
  
            approved.push(doc.data().unavailableStatementOfAccount)
  
          }

          if( doc.data().unavailableCompanyIntroduction === "approved"){
  
            approved.push(doc.data().unavailableCompanyIntroduction)
  
          }

          if( doc.data().unavailableSelfIntroduction === "approved"){
  
            approved.push(doc.data().unavailableSelfIntroduction)
  
          }

          if( doc.data().unavailableLeaveApprovalLetter === "approved"){
  
            approved.push(doc.data().unavailableLeaveApprovalLetter)
  
          }

          if( doc.data().unavailableEmploymentLetter === "approved"){
  
            approved.push(doc.data().unavailableEmploymentLetter)
  
          }

      
          setApprovedData(approved.length)

        });
    });


    }

    approvedQuery()

  },[approvedData])

  // PENDING DATA

  useEffect(() => {

    pendingQuery = () => {

       const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(1));
        onSnapshot(q, (querySnapshot) => {
        let pending = []
        querySnapshot.forEach((doc) => {

          if( doc.data().availableInternationalPassport === "pending"){
  
            pending.push(doc.data().availableInternationalPassport)
  
          }

          if( doc.data().availablePassportPhotograph === "pending"){
  
            pending.push(doc.data().availablePassportPhotograph)
  
          }

          if( doc.data().availableBirthCertificate === "pending"){
  
            pending.push(doc.data().availableBirthCertificate)
  
          }

          if( doc.data().availableMarriageCertificate === "pending"){
  
            pending.push(doc.data().availableMarriageCertificate)
  
          }

          if( doc.data().availableStatementOfAccount === "pending"){
  
            pending.push(doc.data().availableStatementOfAccount)
  
          }

          if( doc.data().availableCompanyIntroduction === "pending"){
  
            pending.push(doc.data().availableCompanyIntroduction)
  
          }

          if( doc.data().availableSelfIntroduction === "pending"){
  
            pending.push(doc.data().availableSelfIntroduction)
  
          }

          if( doc.data().availableLeaveApprovalLetter === "pending"){
  
            pending.push(doc.data().availableLeaveApprovalLetter)
  
          }

          if( doc.data().availableEmploymentLetter === "pending"){
  
            pending.push(doc.data().availableEmploymentLetter)
  
          }

          
          if( doc.data().unavailableInternationalPassport === "pending"){
  
            pending.push(doc.data().unavailableInternationalPassport)
  
          }

          if( doc.data().unavailablePassportPhotograph === "pending"){
  
            pending.push(doc.data().unavailablePassportPhotograph)
  
          }

          if( doc.data().unavailableBirthCertificate === "pending"){
  
            pending.push(doc.data().unavailableBirthCertificate)
  
          }

          if( doc.data().unavailableMarriageCertificate === "pending"){
  
            pending.push(doc.data().unavailableMarriageCertificate)
  
          }

          if( doc.data().unavailableStatementOfAccount === "pending"){
  
            pending.push(doc.data().unavailableStatementOfAccount)
  
          }

          if( doc.data().unavailableCompanyIntroduction === "pending"){
  
            pending.push(doc.data().unavailableCompanyIntroduction)
  
          }

          if( doc.data().unavailableSelfIntroduction === "pending"){
  
            pending.push(doc.data().unavailableSelfIntroduction)
  
          }

          if( doc.data().unavailableLeaveApprovalLetter === "pending"){
  
            pending.push(doc.data().unavailableLeaveApprovalLetter)
  
          }

          if( doc.data().unavailableEmploymentLetter === "pending"){
  
            pending.push(doc.data().unavailableEmploymentLetter)
  
          }

      
          setPendingData(pending.length)

        });
    });


    }

    pendingQuery()

  },[pendingData])

  //REJECTED DATA

  useEffect(() => {

    rejectedQuery = () => {

       const q = query(collection(db, "visa"), where("userId", "==", user.uid), where("constant", "==", "active"), limit(1));
        onSnapshot(q, (querySnapshot) => {
        let rejected = []
        querySnapshot.forEach((doc) => {

          if( doc.data().availableInternationalPassport === "rejected"){
  
            rejected.push(doc.data().availableInternationalPassport)
  
          }

          if( doc.data().availablePassportPhotograph === "rejected"){
  
            rejected.push(doc.data().availablePassportPhotograph)
  
          }

          if( doc.data().availableBirthCertificate === "rejected"){
  
            rejected.push(doc.data().availableBirthCertificate)
  
          }

          if( doc.data().availableMarriageCertificate === "rejected"){
  
            rejected.push(doc.data().availableMarriageCertificate)
  
          }

          if( doc.data().availableStatementOfAccount === "rejected"){
  
            rejected.push(doc.data().availableStatementOfAccount)
  
          }

          if( doc.data().availableCompanyIntroduction === "rejected"){
  
            rejected.push(doc.data().availableCompanyIntroduction)
  
          }

          if( doc.data().availableSelfIntroduction === "rejected"){
  
            rejected.push(doc.data().availableSelfIntroduction)
  
          }

          if( doc.data().availableLeaveApprovalLetter === "rejected"){
  
            rejected.push(doc.data().availableLeaveApprovalLetter)
  
          }

          if( doc.data().availableEmploymentLetter === "rejected"){
  
            rejected.push(doc.data().availableEmploymentLetter)
  
          }

          
          if( doc.data().unavailableInternationalPassport === "rejected"){
  
            rejected.push(doc.data().unavailableInternationalPassport)
  
          }

          if( doc.data().unavailablePassportPhotograph === "rejected"){
  
            rejected.push(doc.data().unavailablePassportPhotograph)
  
          }

          if( doc.data().unavailableBirthCertificate === "rejected"){
  
            rejected.push(doc.data().unavailableBirthCertificate)
  
          }

          if( doc.data().unavailableMarriageCertificate === "rejected"){
  
            rejected.push(doc.data().unavailableMarriageCertificate)
  
          }

          if( doc.data().unavailableStatementOfAccount === "rejected"){
  
            rejected.push(doc.data().unavailableStatementOfAccount)
  
          }

          if( doc.data().unavailableCompanyIntroduction === "rejected"){
  
            rejected.push(doc.data().unavailableCompanyIntroduction)
  
          }

          if( doc.data().unavailableSelfIntroduction === "rejected"){
  
            rejected.push(doc.data().unavailableSelfIntroduction)
  
          }

          if( doc.data().unavailableLeaveApprovalLetter === "rejected"){
  
            rejected.push(doc.data().unavailableLeaveApprovalLetter)
  
          }

          if( doc.data().unavailableEmploymentLetter === "rejected"){
  
            rejected.push(doc.data().unavailableEmploymentLetter)
  
          }

      
          setRejectedData(rejected.length)

        });
    });


    }

    rejectedQuery()

  },[])


  const visaQuery = () => {

  const q = query(collection(db, "visa"), where("userId", "==", user.uid), where('constant', "==", "active"), limit(1));
  onSnapshot(q, (querySnapshot) => {
    const value = [];
    querySnapshot.forEach((doc) => {
         value.push({id:doc.id, status:doc.data().status});
    });

    setVisaInfo(value)
    
  });

}

  useEffect(()=>{
   visaQuery()
  }, [])


      
const alertsAndNotifications = async() => {

  const q = query(collection(db, "messages"), where("userId", "==", user.uid), where("status", "==", "unread"));
  // const querySnapshot = await getDocs(q);
  // setMessageCount(querySnapshot.docs.length)

  onSnapshot(q, (querySnapshot) => {
   
    setMessageCount(querySnapshot.docs.length)
    
  });


}

useEffect(() => {
  alertsAndNotifications()
}, [])



  // console.log('visa info:', visaInfo)

  // console.log('INTERVIEW:', interview)

  // console.log('status info: ', statusInfo)

  // console.log('message: ', messageCount)

  console.log('approved:', approvedData)

  console.log('pending: ', pendingData)

  console.log('rejected: ', rejectedData)


 
  return (
    <SafeAreaView style={{flex:1, alignItems:'center'}}>

      <StatusBar translucent={true} backgroundColor={COLORS.main}  barStyle="light-content" />

      <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingTop:0}}> 
      <Pressable onPress={() =>navigation.navigate('ProfileScreen')}>
      <Ionicons name="ios-person-outline" size={24} color="white"  /> 
      </Pressable> 
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width: 200}}>
        <Text style={{fontSize:16, color:COLORS.white}}>Welcome</Text><Text style={{color:'white', fontSize:16, marginLeft:5}}> {userData.firstname}</Text> 
      </View>
      <Notification onPress={() => (navigation.navigate('NotificationScreen'))}/>
{/*       
      <Pressable onPress={() => (navigation.navigate('NotificationScreen'))}>
          <View>
            <Ionicons name="ios-notifications-outline" size={24} color="white" />
            {messageCount

            ?
            
            <View style={{position:'absolute', right:-5, top:-5, width:16, height:16, borderRadius:8, backgroundColor:'red', alignItems:'center', justifyContent:'center' }}><Text style={{color:'white', fontSize:10, fontWeight:'bold'}}>{messageCount}</Text></View>

            : 

            ""

          }
            
          </View>
      </Pressable> */}
        
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:SIZES.width,}}>
        <View style={{flex:1, paddingHorizontal:15, paddingVertical:5}}>

        {(statusInfo == "RECIEVED" || statusInfo == "PROCESSING" || statusInfo == "DELIVERING")

          ? <Text>Check Visa Status</Text>

          : ""
        }
        </View>


    {visaInfo.length !== 0 &&
     
     <View style={{flex:1, marginTop:10,  marginHorizontal:20, gap:10, flexDirection:'row'}}>
     
  
       
   {
   visaInfo.map(item => {
         return (
           <View key = {item.id} style={{ alignItems:'start',}}>
           {(item.status === "PROCESSING" || item.status === "DELIVERING" || item.status === "RECEIVED" )
         
           ?
           <View style={[item.status === "RECEIVED" && styles.receivedOrder, item.status === "PROCESSING" && styles.processingOrder, item.status === "DELIVERING" && styles.deliveringOrder]}>
             <Pressable key = {item.id}  onPress={() => navigation.navigate('VisaStatusScreen', {visaId : item.id})}>
                     { item.status === "RECEIVED" && <Text style={{color:'white', fontSize:13, fontWeight:'bold', border:1, padding:3}}>RECEIVED </Text>}
                     { item.status === "PROCESSING" &&  <Text style={{color:'white', fontSize:13, fontWeight:'bold'}}>PROCESSING</Text>}
                     { item.status === "DELIVERING" && <Text style={{color:'white', fontSize:13, fontWeight:'bold'}}>DELIVERING</Text>}
             </Pressable>
           </View>
           
           :
           <View></View>
         }
         </View>
         )
       })
   }

   
     </View> 
  
   }

      <View style={{width:'100%', padding:20}}>
        <View style={{  width:'100%', minHeight:60, backgroundColor:'#D9E7EE', borderRadius:5,  justifyContent:'', flexDirection:'row', paddingHorizontal:20, alignItems:'center'}}>
          <View style={{justifyContent:'center', width:40, height:40, backgroundColor:COLORS.main, justifyContent:'center', alignItems:'center',  borderRadius:8}}>
            <Entypo name="sound" size={24} color="white" />
          </View>
          <View style={{marginLeft:20, width:230, minHeight:60, alignItems:'center', paddingVertical:10}}>
          <Text style={{color:'#00000088',fontSize:14, fontWeight:500, }}>We are giving 50% discount to the first 10 applicants for referal for their visa documentation on our platform</Text>
          </View>
         
          
        </View>
      </View>

      <View style={{width:'100%', paddingHorizontal:20}}>
        <View style={{  width:'100%', height:60, backgroundColor:COLORS.primary, borderRadius:5, alignItems:'center', justifyContent:'space-between', flexDirection:'row', paddingHorizontal:20}}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            <Text style={{color:'white', fontWeight:400, marginRight:10, fontSize:14}}>Interview Date</Text>
          <FontAwesome5 name="plane-departure" size={18} color="white" />
          </View>

          {

              (statusInfo === "DELIVERING" || statusInfo === "DELIVERED" || statusInfo === "APPROVED")
              
              ?

              <Text style={{color:'white', fontWeight:400, fontSize:14}}>Pending</Text>

              :
              <Text style={{color:'white', fontWeight:400, fontSize:14}}>{interview}</Text>

          }
        
          
        </View>
      </View>

      <View style={{width:'100%', paddingHorizontal:20, }}>
        <View style={{  width:'100%', height:60,alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            <Text style={{color:'#00000088', fontWeight:400, marginRight:10, fontSize:14, fontWeight:'bold'}}>Documents overview</Text>
          
          </View>
          <Pressable onPress={() => navigation.navigate('Documents')} style={{flexDirection:'row', alignItems:'center', }}>
          <Text style={{color:COLORS.main, fontWeight:400, fontSize:14, marginRight:3,}}>View All</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.main} />
          </Pressable>
        </View>
      </View>

      <View style={{width:'100%', paddingHorizontal:20}}>
      <View style={{  width:'100%', height:145, flexDirection:'row',  justifyContent:'space-between', flexWrap:'wrap', gap:20}}>


        <Pressable style={{flexDirection:'row', alignItems:'center', width:'46%', backgroundColor:'#D9E7DD', height:60, borderRadius:10}}>
            <View style={{width:'30%', height:60, padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'green', letterSpacing:1}}>{approvedData}</Text>
            </View>
            <View style={{width:'70%', height:60, padding:5, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:12, lineHeight:15, color:'#00000088'}}>Total Approved Documents</Text>
            </View>
            </Pressable>

        
          <Pressable style={{flexDirection:'row', alignItems:'center', width:'46%', backgroundColor:'#D9E7EE', height:60, borderRadius:10}}>
            <View style={{width:'30%', height:60, padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:COLORS.main, letterSpacing:1}}>{pendingData}</Text>
            </View>
            <View style={{width:'70%', height:60, padding:5, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:12, lineHeight:15, color:'#00000088'}}>Total Pending Documents</Text>
            </View>
            </Pressable>

            <Pressable  style={{flexDirection:'row', alignItems:'center', width:'46%', backgroundColor:'#FBEBC1', height:60, borderRadius:10}}>
            <View style={{width:'30%', height:60, padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#D75C04', letterSpacing:1}}>0</Text>
            </View>
            <View style={{width:'70%', height:60, padding:5, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:12, lineHeight:15, color:'#00000088'}}>Total Aprroval Pending Documents</Text>
            </View>
            </Pressable>

              <Pressable style={{flexDirection:'row', alignItems:'center', width:'46%', backgroundColor:'#FCBCBC', height:60, borderRadius:10}}>
            <View style={{width:'30%', height:60, padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#FF0D0D', letterSpacing:1}}>{rejectedData}</Text>
            </View>
            <View style={{width:'70%', height:60, padding:5, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:12, lineHeight:15, color:'#00000088'}}>Total Rejected Documents</Text>
            </View>
            </Pressable>

        {/* {
          documentsCardData.map((item)=>(

            <Pressable key={item.id} style={{flexDirection:'row', alignItems:'center', width:'46%', backgroundColor:item.baackgroundColor, height:60, borderRadius:10}}>
            <View style={{width:'30%', height:60, padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:item.numberColor, letterSpacing:1}}>{item.number}</Text>
            </View>
            <View style={{width:'70%', height:60, padding:5, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:12, lineHeight:15, color:'#00000088'}}>{item.title}</Text>
            </View>
            </Pressable>

          ))
        } */}

       
        </View>
      </View>

      <View style={{width:'100%', paddingHorizontal:20,}}>
        <View style={{  width:'100%', height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
          <View style={{flexDirection:'row', alignItems:'center', }}>
            <Text style={{color:'#00000088', fontWeight:400, marginRight:10, fontSize:14, fontWeight:'bold'}}>Recent Application</Text>
          
          </View>
          <Pressable onPress={() => navigation.navigate('AllApplicationScreen')} style={{flexDirection:'row', alignItems:'center', }}>
          <Text style={{color:COLORS.main, fontWeight:400, fontSize:14, marginRight:3,}}>See All</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.main} />
          </Pressable>
        </View>
      </View>

      {/* { 

          recentData.status === "PROCESSING" && */}

        <View style={{width:'100%',  marginBottom:50 }}>
          {applicationData.map(info => (
  
            <View key={info.id} style={{width:'100%', paddingHorizontal:20, marginBottom:20 }}>
            <View style={{  width:'100%', height:60, borderWidth:1, borderRadius:5, alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderColor:'#00000022', }}>
              <View style={{flexDirection:'column', marginLeft:10, }}>

              <Text style={{color:'#000000', fontWeight:300, marginRight:10, fontSize:12,}}>{info.country}</Text>
              <Text style={{color:'#00000088', fontWeight:'bold', marginRight:10, fontSize:14, fontWeight:'bold'}}>{info.date}</Text>
               
              </View>
              <Pressable onPress={() => navigation.navigate('ViewApplicationScreen', {visaId : info.id})} style={{flexDirection:'row', alignItems:'center', width:120, height:50, backgroundColor:COLORS.main,borderRadius:5, justifyContent:'center', marginRight:5 }}>
              <Text style={{color:'white', fontWeight:400, fontSize:12,}}>View Application</Text>
              
              </Pressable>
            </View>
            </View>
  
          ))}
  
       
  
        </View>

      {/* } */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  receivedOrder : {
    paddingVertical:10, 
    paddingHorizontal:10,
    borderRadius:5, 
    // border:1, 
    borderColor:'green',
    backgroundColor:COLORS.primary
  },

  processingOrder : {
    paddingVertical:10, 
    paddingHorizontal:10,
    borderRadius:5, 
    borderColor:'green',
    backgroundColor:COLORS.blue
  },

  deliveringOrder : {
    paddingVertical:10, 
    paddingHorizontal:10,
    borderRadius:5, 
    borderColor:'green',
    backgroundColor:COLORS.orange
  }


})
