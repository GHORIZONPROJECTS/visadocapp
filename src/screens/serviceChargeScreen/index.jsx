import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, Keyboard} from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import BackArrow from '../../components/backArrow'
import { COLORS } from '../../constants/theme'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import { Divider } from 'react-native-paper';

const ServiceChargeScreen = ({navigation}) => {

    const [userData, setUserData] = useState({})
    const [image, setImage] = useState(null)  
    const [uploading, setUploading] = useState(false)
    const [visaData, setVisaData] = useState({})
    const [loading, setLoading] = useState(false)
    const [charges, setCharges] = useState([])
    const [total, setTotal] = useState()
  
    const { user } = useContext(AuthContext)
  
    const {visaId} = useContext(VisaContext)

    // USER DATA
  
    const getUserData = async() => {
      const docRef = doc(db, "travellers", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          setUserData(docSnap.data())

          // setTotal(docSnap.data())
          
          
        } else {
  
          console.log("No such document!");
        }
    }
  
    useEffect(()=>{
      getUserData()
    }, [])


    // VISA DATA


    const getVisaData = async() => {
        const docRef = doc(db, "visa", visaId);
          const docSnap = await getDoc(docRef);

          
          if (docSnap.exists()) {
    
            setVisaData(docSnap.data())

           
          } else {
    
            console.log("No such document!");
          }
      }
    
      useEffect(()=>{
        getVisaData()
      }, [])

      // console.log(visaData)



      // useEffect(() => {
    
      //   //LISTEN REAL TIME
    
      //   const applicationQuery = async() => {
    
      //     const applicationRef = (collection(db, "visa"));
      //     // const q = query(applicationRef, where("userId", "==", user.uid));
      //     const r = query(applicationRef, where("userId", "==", user.uid), where("status", "==", "APPROVED"));
    
      //     const querySnapshot = await getDocs(r);
      //       let list = []
      //       let status = []
      //       let docs = []
      //       let i = 0
            
    
      //     querySnapshot.forEach((doc) => {
         
            
      //       if(doc.data().birthCertificate == "available"){
    
      //         docs.push({id:0, "name": "Birth Certificate", link: doc.data().birthCertificateImage})
            
      //       }
    
       
    
      //     setDocuments(docs)
    
      //     });
    
      //     console.log(applicationData)
    
         
      //     // setDocuments(docs)
    
      //   }
    
        
        
      //   applicationQuery()   
      // },[])


      // useEffect(() => {

      //   const chargeQuery = async() => {
    

      //   const q = query(collection(db, "charges"), where("charges", "==", "visaCharges"));

      //   const querySnapshot = await getDocs(q);

      //   let chargeItem = []


      //   querySnapshot.forEach((doc) => {

      //     setCharges(doc.data())

      //   });
      // }
      //   chargeQuery();

      // },[])


      const getChargesData = async() => {
        const docRef = doc(db, "charges", "Y6zxVW47cw59QlzkURJR");
          const docSnap = await getDoc(docRef);

          
          if (docSnap.exists()) {
    
            setCharges(docSnap.data())

           
          } else {
    
            console.log("No such document!");
          }
      }
    
      useEffect(()=>{
        getChargesData()
      }, [])

      console.log(visaData)



      // GET UNAVAILABLES


       useEffect(() => {

        const unavailableQuery = async() => {
    

        const q = query(collection(db, "visa"), where("visaId", "==", visaId));

        const querySnapshot = await getDocs(q);

        let chargeItem = []


        querySnapshot.forEach((doc) => {


          if( doc.data().leaveApprovalLetter === "unavailable"){
  
            chargeItem.push(charges.leaveApproval)

          }

  
          if( doc.data().companyIntroduction === "unavailable"){
  
            chargeItem.push(charges.companyIntroduction)
  
          }
  
          if( doc.data().employmentLetter === "unavailable"){
  
            chargeItem.push(charges.employmentLetter)
  
          }
  
          if( doc.data().selfIntroduction === "unavailable"){
  
            chargeItem.push(charges.selfIntroduction)
  
          }
  
          chargeItem.push(charges.visaProcessingFee)
  
          const sum = chargeItem.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
           setTotal(sum)
           
  
     
      

        });

        console.log('charge item: ',chargeItem)

        console.log('employment Letter: ',charges.employmentLetter)

        

      }
        unavailableQuery();

      },[charges])

    
console.log('total: ',total)


  // SUBMIT CHARGES    

  const handleServiceCharge = async() => {

    setUploading(true)

    await updateDoc(doc(db, "visa", visaId), {

        total : total,
        timeStamp: serverTimestamp(),

      });

     
     setUploading(false)

    navigation.navigate("CardPaymentScreen")

  }  


  // const [grandTotal, setGrandTotal] = useState(0)


  // const feeTotal = () =>{
    
  // }


  return (
    <View style={{marginHorizontal:20}}>
        <Loader visible ={loading}/>
       <View style={{ marginVertical:10, flexDirection:'row', alignItems:'center', }}>
        <BackArrow onPress={() => navigation.goBack()}/>
        <Text style={{fontSize:18, color:'black', marginLeft: 40, fontWeight:'bold'}}>Payment Information</Text>  

        </View>
        <Text style={{fontSize:18, fontWeight:'bold', color:'green', marginVertical:20}}>{`Congratulations!! ${userData.firstname}`}</Text>

        <Text style={{fontSize:14, lineHeight:20, fontWeight:500, color:COLORS.main}}>Below fee breakdown includes payment for documents provided by VisaDoc Services for you and Charges for Visa processing.</Text>

        <View style={{marginTop:40}}>

        <View style={{marginBottom:20}}>
          
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:20, fontWeight:"bold", color:'#00000099'}}>Documents</Text>
                    <Text style={{fontSize:20, fontWeight:"bold", color:'#00000099'}}>Fee</Text>
                
                </View>

          
        </View>    

        <View style={visaData.leaveApprovalLetter === "unavailable" ? styles.unavailable : styles.available}>
            {
                visaData.leaveApprovalLetter === "unavailable"

                ?

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>Leave Approval Letter</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>${charges.leaveApproval}</Text>
                
                </View>

                :

                ""
            }
          
        </View>
 

        <View style={visaData.selfIntroduction === "unavailable" ? styles.unavailable : styles.available}>
            {
                visaData.selfIntroduction === "unavailable"

                ?

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>Self Introduction Letter</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>${charges.selfIntroduction}</Text>
                
                </View>

                :

                ""
            }
          
        </View>

        <View style={visaData.companyIntroduction === "unavailable" ? styles.unavailable : styles.available}>
            {
                visaData.companyIntroduction === "unavailable"

                ?

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>Company Introduction Letter</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>${charges.companyIntroduction}</Text>
                
                </View>

                :

                ""
            }
          
        </View>

        <View style={visaData.employmentLetter === "unavailable" ? styles.unavailable : styles.available}>
            {
                visaData.employmentLetter === "unavailable"

                ?

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>Employment Letter</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>${charges.employmentLetter}</Text>
                
                </View>

                :

                ""
            }
          
        </View>

        <View style={{marginVertical:20}}>
         
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>Visa Processing Fee</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:'#00000099'}}>${charges.visaProcessingFee}</Text>
                
                </View>

        </View>

        <View style={{marginVertical:20}}>
            <Divider/>
        </View>

        

        <View style={{marginBottom:20}}>
          
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:'#00000099'}}>Total</Text>
              <Text style={{fontSize:20, fontWeight:"bold", color:'#00000099'}}>${total}</Text>
          
          </View>

          <Pressable onPress = {handleServiceCharge}  style = {{ backgroundColor : 'brown', width : '100%', marginVertical : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
        <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
        <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
          <Ionicons name="chevron-forward" size={24} color="white" />
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
      </Pressable>

    
  </View> 

        

        </View>
    </View>
  )
}

export default ServiceChargeScreen

const styles = StyleSheet.create({

    available: {

        marginBottom : 0

    },

    unavailable: {

        marginBottom : 20 

    },

})