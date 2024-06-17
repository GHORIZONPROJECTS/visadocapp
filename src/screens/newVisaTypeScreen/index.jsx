import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, Button, ScrollView, StatusBar, SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";


export default function NewVisaTypeScreen({ navigation }) {

  const {visaId} = useContext(VisaContext)

   const [selectedItem, setSelectedItem] = useState(null);
   const [errorMessage, setErrorMessage] = useState('')
   const [userData, setUserData] = useState("")


   const selectedData = [
    {value:'Single', title:'Single', image:require('../../../assets/images/single.png')},
    {value:'Family', title: 'Family', image:require('../../../assets/images/family.png')},
   ]

    

      const { user } = useContext(AuthContext)


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

      console.log(user.uid)
    
    
    const handlePurpose = async() => {

        if(selectedItem !==null){

        try {

           await updateDoc(doc(db, "visa", visaId), {
        
            visaType : selectedItem,

            timeStamp: serverTimestamp(),
        

    })
    .then(() => {
    
      navigation.navigate("NewAvailableDocumentScreen");
        
    })
  
          
        } catch (error) {

          console.log('error:',error.message)

        }

       
      }else{

        return setErrorMessage('Please select your visa Type');
        
      }
        
  }
  return (
    
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle={}/> */}
   
    <View style={{ paddingVertical: 50 }}>
      <View style = {{flexDirection : 'row', alignItems : 'center', alignItems: 'center', gap:30}}>
          <BackArrow onPress={() => navigation.goBack()}/>
          <Text style = {{fontSize : 20, fontWeight:'bold', marginHorizontal : 5,}}>Visa Type</Text>
      </View>
      <View style={{marginTop:30,marginBottom:10, justifyContent:'center', width:'100%',alignItems:'center'}}>
        <Text style={{fontSize:18, marginBottom:10, color:'black'}}>Please Choose a Visa Type.</Text>  
      </View> 

      <View>
            {
              errorMessage && <View style={{width:'100%', alignItems:'center',  marginBottom:20}}><Text style={{color:'red', fontSize:14,}}>{errorMessage}</Text> 
              </View> 
            }
        </View> 

      <ScrollView  showsVerticalScrollIndicator = {false} contentContainerStyle={{alignItems:'center', marginTop:10, gap:20, width:'100%', height:800}}>
       
        {selectedData.map(item => {
          return (
            <View key= {item.value}>
            <Pressable onPress={() => setSelectedItem(item.value)} style={{
              width:250,
              height:150,
              paddingLeft:20,
              paddingTop:10,
              borderWidth:1,
              borderRadius:10,
              backgroundColor:'white',
              borderColor: selectedItem == item.value? COLORS.main : 'lightgray',
              position:'relative'
        
            }}>
              {selectedItem === item.value ? <View style={styles.check}>
                <FontAwesome name="check-circle" size={20} color='darkblue'/>
              </View> : null}
              <Image source={item.image} alt="" style={styles.itemImage} resizeMode="contain"/>
              <Text style={{
                fontSize:13,
                color: selectedItem == item.value? COLORS.main : 'black',
                position:'absolute',
                top:15,
                left:15

              }}>{item.title}</Text>
            </Pressable>
            <View>
              {
                selectedItem === 'Single' && item.value === "Single" 
                ?
                <View style={{marginVertical:1}}>
                  <Text style={{fontWeight:'bold'}}>Required Documents</Text>
                  <Text style={{color:'gray'}}>Data Page International Passport</Text>
                  <Text style={{color:'gray'}}>Colored Passport Photograph</Text>
                  <Text style={{color:'gray'}}>Statement of Account/Payslip</Text>
                  {/* <Text style={{color:'gray'}}>School Credentials</Text> */}
                </View>
                :
                ""
              }
            </View>
            <View>
              {
                selectedItem === 'Family' && item.value === "Family" 
                ?
                <View style={{transition: 'height 300ms ease-in',
                  }}>
                  <Text style={{fontWeight:'bold'}}>Required Documents</Text>
                  <Text style={{color:'gray'}}>Data Page International Passport</Text>
                  <Text style={{color:'gray'}}>Marriage Certificate</Text>
                  <Text style={{color:'gray'}}>Colored Passport Photograph</Text>
                  <Text style={{color:'gray'}}>Statement of Account/Payslip</Text>
                  <Text style={{color:'gray'}}>Birth Certificate/Children/Affidavits</Text>
                </View>
                :
                ""
              }
            </View>
            </View>
          )
        })}
        
     </ScrollView> 
     
      </View>
      <Pressable onPress = {handlePurpose}  style = {{ backgroundColor : 'brown', width : '100%', marginHorizontal : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row', position:'absolute', bottom:0}}>
        <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
        <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
          <Ionicons name="chevron-forward" size={24} color="white" />
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
      </Pressable>
    </SafeAreaView>
  );
      
        
  
}

const styles = StyleSheet.create({


    button: {
      padding : 10,
      alignItems: 'center',
      justifyContent :'center',
      margin: 8,
      width:190,
      backgroundColor:COLORS.main,
      width : 250,
      borderRadius : 5
      

    },
    buttonText : {
      fontSize: 18,
      fontWeight : 'bold',
      color : 'white'
    },
    formEntry: {
      margin: 8,
    },
    container: {
      flex: 1,
      flexDirection:'column',
      position: 'relative',
      paddingHorizontal:20,
    },
    progressBar: {
      marginBottom: 16,
      paddingHorizontal: 0,
    },

    selected:{
   
    },

    itemImage:{
      width:200,
      height:130,

    },

   
    check: {
      position:'absolute',
      top:10,
      right:10,

    }


});

