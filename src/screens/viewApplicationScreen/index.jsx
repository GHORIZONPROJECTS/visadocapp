import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
import Loader from '../../components/loader'
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, AntDesign} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function ViewApplicationScreen({navigation, route}) {

  const {visaId} = route.params

  const {user} = useContext(AuthContext)
  
  const [loading, setLoading] = useState(true)

  const [visaData, setVisaData] = useState([])

  const [children, setChildren] = useState([])

  const [userData, setUserData] = useState([])

  console.log(visaId)

    //user information

    const getUserData = async() => {
      const docRef = doc(db, "travellers", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          setUserData(docSnap.data())
          
        } else {
  
          console.log("No such document!");
        }
    }
  
    useEffect(()=>{
      getUserData()
    }, [])
  
  
  // visa application
  
    const getVisa = async() => {
  
      const docRef = doc(db, "visa", visaId);
  
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
  
          setVisaData(docSnap.data())
          setChildren( docSnap.data().children)
          setLoading(false)
          
        } else {
  
          console.log("No such document!");
        }
    }
  
    useEffect(()=>{
  
      getVisa()
  
    }, [])
    
  return (
    <View style={{flex:1, paddingLeft:20, paddingBottom:100}}>
      <Loader visible ={loading}/>
    <SafeAreaView style={{ backgroundColor: COLORS.main,}}/>
    <View style={styles.container}>
    
   
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
    <BackArrow onPress={() => navigation.goBack()}/>
    <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Visa Application</Text>  
    
    </View>
    
    <ScrollView style={{paddingVertical: 10, paddingRight:10, marginBottom:50}} showsVerticalScrollIndicator={false}>

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", marginVertical:20, marginRight:20}}>
        {/* <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View> */}
        <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}> STATUS</Text>
        <Text style={{fontSize:18, fontWeight:'bold', color:'green'}}>{visaData.status}</Text>
      </View>

      <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Personal Details</Text>
              </View>
              <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Firstname :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.firstname}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Surname :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.surname}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Othername :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.othername}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Gender :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.gender}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Date of Birth :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dob}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Socials :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.socials}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Telephone :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.phoneNumber}</Text>
              </View>

              </View>

              <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Destination</Text>
              </View>
              <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Country :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.country}</Text>
              </View>
              
              </View>



              <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Purpose of Travel</Text>
              </View>
              <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Trip Purpose :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.travelPurpose}</Text>
              </View>
              
              </View>


              <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>My Visa Type</Text>
              </View>
              <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Visa Type :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.visaType}</Text>
              </View>
              
              </View>






              <View style={{flexDirection:'row', gap:10, marginBottom:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Marital Info</Text>
              </View>

              {
                visaData.isMarried === 'married' ? 
                <View style={{flexDirection:'column',padding:10}}>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Spouse Name :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.spouseName}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Spouse DOB :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.spouseDob}</Text>
                      </View>
                </View>
                :

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Spouse Name :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Not Married</Text>
                </View>

              }

              <View style={{flexDirection:'row', gap:10, marginBottom:10, alignItems:'center'}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Children Info</Text>
              </View>

              {
                children !== "" ?
                
                children.map((child, index) => (
                  
                     <View key={index} style={{flexDirection:'column',padding:10}}>
            
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Child name :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{child.firstname}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Date of Birth :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{child.birthDay}</Text>
                        </View>
                        {/* <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:18, fontWeight:'400', color:'#000000', marginBottom:10}}>Consent Letter :</Text>
                          <Text style={{fontSize:18, fontWeight:'bold', color:'#000000'}}>visaData.children.consent</Text>
                        </View> */}
                      </View>
                  
                ))

                :
                    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                      <Text style={{fontSize:18, fontWeight:'400', color:'#000000', marginBottom:10}}>Children :</Text>
                      <Text style={{fontSize:18, fontWeight:'bold', color:'#000000'}}>None</Text>
                    </View>

              } 


              <View style={{flexDirection:'row', gap:10, marginBottom:20}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Parent Details</Text>
              </View>

              
              <View style={{flexDirection:'column',paddingHorizontal:10}}>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>My Father is :</Text>
              
                {

                visaData.fatherAlive === "fatherAlive" ?
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Alive</Text>
                  :
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Late</Text>
                }
              </View>
              </View>



              {

                  visaData.fatherAlive === "fatherAlive" || visaData.fatherAlive === "fatherLate"?

                  <View style={{flexDirection:'column',paddingHorizontal:10}}>

                   
            
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Firstname :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.fatherFirstname}</Text>
                         
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Lastname :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.fatherLastname}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Othername :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.fatherOthername}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Address :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.fatherAddress}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Dob :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfBirthFather}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                          <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Father Status :</Text>
                          <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.fatherMaritalStatus}</Text>
                        </View>
                  </View>

                  :

                  ""
                  

              }

              <View style={{flexDirection:'column',paddingHorizontal:10}}>

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>My Mother is :</Text>
                  {

                  visaData.motherAlive === "motherAlive" ?
                    <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Alive</Text>
                    :
                    <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Late</Text>
                  }
                </View>
              </View>

              {

                visaData.motherAlive === "motherAlive" || visaData.motherAlive === "motherLate"?

                <View style={{flexDirection:'column',paddingHorizontal:10}}>

                

                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Firstname :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.motherFirstname}</Text>
                      
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Lastname :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.motherLastname}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Othername :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.motherOthername}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Address :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.motherAddress}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Dob :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfBirthMother}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Mother Status :</Text>
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.motherMaritalStatus}</Text>
                      </View>
                </View>

                :
                ""

                }

              <View style={{flexDirection:'row', gap:10, marginVertical:20}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Educational Details</Text>
              </View>
              <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Qualification :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.education}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>School Attended :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.schoolAttended}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Admission Date :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfAdmission}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Graduation Date :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfGraduation}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Discipline :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.course}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>School Address :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.schoolAddress}</Text>
              </View>

              </View>

              <View style={{flexDirection:'row', gap:10, marginBottom:10}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Employment Details</Text>
              </View>

              {
                visaData.isEmployed === "employed"
                ?

                <View style={{flexDirection:'column',padding:10}}>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Current Company :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.currentCompany}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Company Address :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.companyAddress}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Nature of Job :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.natureOfJob}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Employment Date :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfEmployment}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Position at work :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.workPosition}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Job Duties :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.jobDuties}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Previous Company :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.previousCompany}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Previous Company Address :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.previousComapanyAddress}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}> Previous Employment Date :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.dateOfPreviousEmployment}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Position at Previous work :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.previousJobPosition}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Previous Job Duties :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.previousJobDuties}</Text>
                </View>
  
                </View>

                :
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Employment status :</Text>
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.isEmployed}</Text>
              </View>
              }

              <View style={{flexDirection:'row', gap:10, marginBottom:10}}>
                <View style={{width:5, height:20, backgroundColor:COLORS.main}}></View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#00000088'}}>Travel History</Text>
              </View>

              <View style={{flexDirection:'column',padding:10}}>

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>

                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}> Have you travelled before? :</Text>

                  {

                    visaData.travelledBefore === "travelled"  
                  
                  ?
                    <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Yes</Text>
                
                  :
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>No</Text>

                }
                </View>

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>

                {

                  visaData.travelledBefore === "travelled"  

                  ?
                  <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}> Data Page :</Text>
                
                  :
                  
                  ""
                }
                 

                  {

                    visaData.travelledBefore === "travelled"  
                  
                  ?
                    <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>uploaded</Text>
                
                  :
                  
                  ""

                  }

                </View>

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>

                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}> have you any relatives at destination? :</Text>
                {

                  visaData.haveRelative === "haveRelative"  

                  ?
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Yes</Text>

                  :
                  <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>No</Text>

                  }
                </View>

                {

                  visaData.haveRelative === "haveRelative"  

                ?
                <>
                  <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                      <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Relative Name :</Text>
                      <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.relativeName}</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Relative Address :</Text>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>{visaData.relativeAddress}</Text>
                  </View>
                </>

                :

                ""

                }

                <View style={{flexDirection:'row', justifyContent:"space-between"}}>

                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}>Have you been denied visa before? :</Text>
                

                {

                visaData.refused === "refused"  

                ?
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>Yes</Text>

                :
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>No</Text>

                }
                </View>

                {

                  visaData.refused === "refused"  

                  ?
                  
                  
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>

                <Text style={{fontSize:14, fontWeight:'400', color:'#000000', marginBottom:10}}> Decision Letter :</Text>
                <Text style={{fontSize:14, fontWeight:'bold', color:'#000000'}}>uploaded</Text>
                </View>

                  :
                  
                  ""

                  }
                
                </View>
           

            
     
    </ScrollView>

    
    </View>
    </View> 
  )
}

const styles = StyleSheet.create({})