import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, Button, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, collection, query, where, update  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";


export default function PurposeOfTravelScreen({ navigation }) {


  const {visaId} = useContext(VisaContext)

  console.log('visa iD',visaId)
   
   const [selectedItem, setSelectedItem] = useState(null);
   const [errorMessage, setErrorMessage] = useState('')
   const selectedData = [
    {value:'Tourism', title:'Tourism', image:require('../../../assets/images/tourist-female.png')},
    {value:'Study', title: 'Study', image:require('../../../assets/images/student.png')},
    {value:'Visit', title: 'Visit', image:require('../../../assets/images/visit.png')},
    {value:'Work', title: 'Work', image:require('../../../assets/images/work.png')},
   ]


      const { user } = useContext(AuthContext)

      console.log(user.uid)


      const purposeGoback = async() => {

        await updateDoc(doc(db, "travellers", user.uid), {
          
          purpose : false,
  
          timeStamp: serverTimestamp(),

        }).then(() => {

          navigation.goBack()

        })
        
      }
    
    
    const handlePurpose = async() => {

        if(selectedItem !==null){

        try {

            await updateDoc(doc(db, "visa", visaId), {

                travelPurpose : selectedItem,

                timeStamp: serverTimestamp(),

             }).then(async() => {

              await updateDoc(doc(db, "travellers", user.uid), {
          
                purpose : true,
        
                timeStamp: serverTimestamp(),
            
              })
    
           })

           
              
              navigation.navigate("VisaTypeScreen");
         
  
          
        } catch (error) {

          console.log('error:',error.message)

        }

       
      }else{

        return setErrorMessage('Please select your purpose of travel');
        
      }
        
  }
  return (
    
    <View style={styles.container}>
 
      <View style={{ paddingVertical: 20 }}>
        
        <View style = {{flexDirection : 'row', alignItems : 'center', alignItems: 'center', gap:30}}>
                <BackArrow onPress={purposeGoback}/>
                  <Text style = {{fontSize : 20, fontWeight:'bold', marginHorizontal : 5,}}>Purpose of Travel</Text>
        </View>

        <View style={{marginTop:30, justifyContent:'center', width:'100%',alignItems:'center'}}>
          <Text style={{fontSize:18, marginBottom:10, color:'black'}}>What is your purpose of travel?</Text>  
          {/* <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text> */}
        </View> 

        <View style={{width:'100%', alignItems:'center',  marginBottom:20}}>
            {
              errorMessage && <Text style={{color:'red', fontSize:14,}}>{errorMessage}</Text> 
            }
        </View>    
        

        <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle={{alignItems:'center', marginTop:10, gap:20, marginBottom:20, width:'100%', height:1000}}>
        
          {selectedData.map(item => {
            return (
              <Pressable key= {item.value} onPress={() => 
                item.value === 'Tourism' ?
                  setSelectedItem(item.value) : alert("Only Tourism Visa is available right now")
              }
                 style={{
                width:250,
                height:150,
                // alignItems:'center',
                // justifyContent:'center',
                gap:10,
                margin:10,
                paddingLeft:20,
                paddingTop:10,
                borderWidth:1,
                borderRadius:10,
                backgroundColor: item.value === 'Study' || item.value === 'Visit' || item.value === 'Work'  ? 'lightgray' : 'white',
                borderColor: selectedItem == item.value? COLORS.main : 'lightgray',
                position:'relative'
          
              }}>
                {selectedItem === item.value ? <View style={styles.check}>
                  <FontAwesome name="check-circle" size={20} color='darkblue'/>
                </View> : null}
                <Image source={item.image} alt="" style={styles.itemImage} resizeMode="contain"/>
                <Text style={{
                  fontSize:13,
                  color: selectedItem == item.value? COLORS.main :  item.value === 'Study' || item.value === 'Visit' || item.value === 'Work' ? '#00000044' : 'black',
                  position:'absolute',
                  top:15,
                  left:15

                }}>{item.title}</Text>
              </Pressable>
            )
          })}
          
      </ScrollView> 
      
      </View>
      <Pressable onPress = {handlePurpose}  style = {{ backgroundColor : 'brown', width : '100%', alignItems : 'center', justifyContent : 'center',paddingVertical : 20, marginHorizontal:20, flexDirection : 'row', position:'absolute', bottom:0}}>
          <Text style={{color : 'white', fontSize : 18, marginRight : 10}}>Next</Text>
          <View style = {{ alignItems : 'center', flexDirection : 'row', width : 17}}>
            <Ionicons name="chevron-forward" size={24} color="white" />
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          
      </Pressable>
    </View>
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
      position: 'relative',
      // flexDirection:'column',
      // justifyContent:'space-between',
      paddingHorizontal:20,
    },
    progressBar: {
      marginBottom: 16,
      paddingHorizontal: 0,
    },

    selected:{
      // width:250,
      // height:150,
      // alignItems:'center',
      // justifyContent:'center',
      // gap:10,
      // margin:10,
      // borderWidth:1,
      // borderRadius:10,
      // borderColor:'lightgray',
      // backgroundColor: selectedItem == item.value? COLORS.main : 'white'

    },

    itemImage:{
      width:250,
      height:130,

    },

   
    check: {
      position:'absolute',
      top:10,
      right:10,

    }


});
