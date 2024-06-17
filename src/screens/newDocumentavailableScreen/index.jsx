import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView } from "react-native";
import { Button, Divider, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
// import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome, Ionicons, Feather} from '@expo/vector-icons'
import BackArrow from '../../components/backArrow'
import { storage, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable,  deleteObject} from "firebase/storage";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, onSnapshot, deleteField   } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { VisaContext } from "../../config/VisaContext";

export default function NewDocumentsAvailableScreen({ navigation }) {
  
  const [visaData, setVisaData] = useState("")

  const [errorInternationalPassport, setErrorInternationalPassport] = useState("")
  const [errorBirthCertificate, setErrorBirthCertificate] = useState("")
  const [errorLeaveApprovalLetter, setErrorLeaveApprovalLetter] = useState("")
  const [errorMarriageCertificate, setErrorMarriageCertificate] = useState("")
  const [errorPassportPhotograph, setErrorPassportPhotograph] = useState("")
  const [errorSchoolCredentials, setErrorSchoolCredentials] = useState("")
  const [errorSelfIntroduction, setErrorSelfIntroduction] = useState("")
  const [errorStatementOfAccount, setErrorStatementOfAccount] = useState("")
  const [errorCompanyIntroduction, setErrorCompanyIntroduction] = useState("")
  const [errorEmploymentLetter, setErrorEmploymentLetter] = useState("")

      const { user } = useContext(AuthContext)

      const {visaId} = useContext(VisaContext)

      console.log(user.uid)

      const getVisa = () => {

        onSnapshot(doc(db, "visa", visaId), (doc) => {
      
         console.log("Current data: ", doc.data());
      
         setVisaData(doc.data())
      
       });
      
      
      }
      
      useEffect(()=>{
      
        getVisa()
      
      }, [])

  

    const handleDocumentsUpload = async() => {

      if(  visaData.internationalPassportImage === "" ) return setErrorInternationalPassport('Field is required');
        
      

      if( visaData.birthCertificate === 'available' && visaData.birthCertificateImage === "" ){

        return setErrorBirthCertificate('Field is required');
        
      }

      if( visaData.leaveApprovalLetter === 'available' && visaData.leaveApprovalLetterImage === "" ){

        return setErrorLeaveApprovalLetter('Field is required');
        
      }

      if( visaData.marriageCertificate === 'available' && visaData.marriageCertificateImage === "" ){

        return setErrorMarriageCertificate('Field is required');
        
      }

      if( visaData.passportPhotograph === 'available' && visaData.passportPhotographImage === "" ){

        return setErrorPassportPhotograph('Field is required');
        
      }

      if( visaData.selfIntroduction === 'available' && visaData.selfIntroductionImage === "" ){

        return setErrorSelfIntroduction('Field is required');
        
      }

      if( visaData.schoolCredentials === 'available' && visaData.schoolCredentialsImage === "" ){

        return setErrorSchoolCredentials('Field is required');
        
      }

      if( visaData.statementOfAccount === 'available' && visaData.statementOfAccountImage === "" ){

        return setErrorStatementOfAccount('Field is required');
        
      }

      if( visaData.companyIntroduction === 'available' && visaData.companyIntroductionImage === "" ){

        return setErrorCompanyIntroduction('Field is required');
        
      }

      if( visaData.employmentLetter === 'available' && visaData.employmentLetterImage === "" ){

        return setErrorEmploymentLetter('Field is required');
        
      }

    


    


    navigation.navigate("ReviewVisaRequestScreen");

   
        
  }


       const deleteInternationalPassportImage = () => {

        const deleteRef = ref(storage, visaData.internationalPassportImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          internationalPassportImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });



      }



      
      const deleteBirthCertificateImage = () => {

          
        const deleteRef = ref(storage, visaData.birthCertificateImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          birthCertificateImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

        
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        

      }

    

      
      const deleteMarriageCertificateImage = () => {

           
        const deleteRef = ref(storage, visaData.marriageCertificateImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          marriageCertificateImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }
      const deleteLeaveApprovalImage = () => {

             
        const deleteRef = ref(storage, visaData.leaveApprovalLetterImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          leaveApprovalLetterImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }

      
      const deletePassportPhotographImage = () => {

             
        const deleteRef = ref(storage, visaData.passportPhotographImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          passportPhotographImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

        
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }
      const deleteSchoolCredentialsImage = () => {

             
        const deleteRef = ref(storage, visaData.schoolCredentialsImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          schoolCredentialsImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

        
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }

      
      const deleteSelfIntroductionImage = () => {

             
        const deleteRef = ref(storage, visaData.selfIntroductionImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          selfIntroductionImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }
      const deleteCompanyIntroductionImage = () => {

             
        const deleteRef = ref(storage, visaData.companyIntroductionImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          companyIntroductionImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }

      
      const deleteStatementOfAccountImage = () => {

             
        const deleteRef = ref(storage, visaData.statementOfAccountImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          statementOfAccountImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

        
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }

      const deleteEmploymentLetterImage = () => {

           
        const deleteRef = ref(storage, visaData.employmentLetterImage);

        // Delete the file
        deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
         employmentLetterImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

       
        // navigation.navigate("StatementOfAccountImageScreen")

      }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
      });
        


      }


 


  return (
    <View style={styles.container}>
    
    <View style={{ marginTop:10, flexDirection:'row', alignItems:'center', }}>
      <BackArrow onPress={() => navigation.goBack()}/>
      <Text style={{fontSize:18, color:'black', marginLeft: 30, fontWeight:'bold'}}>Upload Documents</Text>  

    </View>
    
    <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      
     <View style={{marginBottom:50}}>

      <View style={{marginBottom:20}}>

                <Text style={{fontSize:16, marginBottom:20}}>Please Upload all your available documents</Text>

                {/* INTERNATIONAL PASSPORT */}
                
                <View style={{flexDirection:'row'}}>

                  {
                      visaData.internationalPassport === 'available' 
                      
                      ?

                      <View style={styles.formEntryImage}>
                      <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    
                      {
                        visaData.internationalPassportImage ? 
                        <View style={{flexDirection:'row'}}>

                          <FontAwesome name="check-circle" size={20} color='green'/>
                          <Text style={{marginLeft:5, color:'black'}}>saved International passport</Text>

                        </View>
                      
                        :
                        <Text style={{marginHorizontal:5, fontSize:11}}>International Passport </Text>
                      }
                      
                      </View>
                      
                      {visaData.internationalPassportImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteInternationalPassportImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewInternationalPassportImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }
                      
                      </View>

                      :

                      ""
                  }

                </View> 

                {
                      errorInternationalPassport  &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorInternationalPassport}</Text>
                    
                    
                } 

                {/* BIRTH CERTIFICATE */}
                
                <View style={{flexDirection:'row'}}>

            {
                visaData.birthCertificate === 'available' 
                
                ?

                <View style={styles.formEntryImage}>
                <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                {/* <FontAwesome name="check-circle" size={20} color={visaData.birthCertificate ? 'green' : 'gray'}/> */}
                {
                  visaData.birthCertificateImage ? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved birth certificate</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Birth Certificate</Text>
                }
           
                </View>
                
            
                {visaData.birthCertificateImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteBirthCertificateImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewBirthCertificateImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }
        
                </View>

                :

                ""
            }

                </View> 

                {
                      errorBirthCertificate &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorBirthCertificate}</Text>
                    
                    
                } 



                {/* LEAVE APPROVE LETTER */}

                <View style={{flexDirection:'row', }}>

              {
                  visaData.leaveApprovalLetter === 'available' 
                  
                  ?

                  <View style={styles.formEntryImage}>
                  <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                  {/* <FontAwesome name="check-circle" size={20} color={visaData.leaveApprovalLetter ? 'green' : 'gray'}/> */}
                  {
                  visaData.leaveApprovalLetterImage? 

                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved Leave Approval letter</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Leave approval Letter </Text>
                }
                  {/* {visaData.birthCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                  </View>
                  
                  
                  {visaData.leaveApprovalLetterImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteLeaveApprovalImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewLeaveApprovalLetterImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                  </View>

                  :

                  ""
              }

                </View> 
                {
                      errorLeaveApprovalLetter  &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> 

                       {errorLeaveApprovalLetter}</Text>
                    
                    
                } 


                {/* MARRIAGE CERTIFICATE */}

                <View style={{flexDirection:'row'}}>

                  {
                      visaData.marriageCertificate === 'available' 
                      
                      ?

                      <View style={styles.formEntryImage}>
                      <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                      {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                      {
                        visaData.marriageCertificateImage? 
                        <View style={{flexDirection:'row'}}>

                          <FontAwesome name="check-circle" size={20} color='green'/>
                          <Text style={{marginLeft:5, color:'black'}}>saved marriage certificate</Text>

                        </View>
                      
                        :

                        <Text style={{marginHorizontal:5, fontSize:11}}>Marriage Certificate </Text>

                      }
                     
                      </View>
                      
                      
                      {visaData.marriageCertificateImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteMarriageCertificateImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewMarriageCertificateImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                      </View>

                      :

                      ""
                  }



                </View> 
                {
                      errorMarriageCertificate &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorMarriageCertificate}</Text>
                    
                    
                } 
                
                
                
                {/* PASSPORT PHOTOGRAPH*/}

                <View style={{flexDirection:'row',}}>

                  {
                      visaData.passportPhotograph === 'available' 
                      
                      ?

                      <View style={styles.formEntryImage}>
                      <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                      {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                      {
                        visaData.passportPhotographImage ? 
                        <View style={{flexDirection:'row'}}>

                          <FontAwesome name="check-circle" size={20} color='green'/>
                          <Text style={{marginLeft:5, color:'black'}}>saved passport photograph</Text>

                        </View>
                      
                        :
                        <Text style={{marginHorizontal:5, fontSize:11}}> Passport Photograph </Text>
                      }
                      {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                      </View>
                      
                     
                      {visaData.passportPhotographImage
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deletePassportPhotographImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewPassportPhotographImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                      </View>

                      :

                      ""
                  }

                  
                </View> 

                {
                
                    errorPassportPhotograph &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorPassportPhotograph}</Text>
                    
                    
                } 



                {/* SCHOOL CREDENTIALS */}


                <View style={{flexDirection:'row',}}>

                {
                    visaData.schoolCredentials === 'available' 
                    
                    ?

                    <View style={styles.formEntryImage}>
                    <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                    {
                  visaData.schoolCredentialsImage !== ""? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved school credentials</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>School Credentials </Text>
                }
                    {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                    </View>
                    
                   
                    {visaData.schoolCredentialsImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteSchoolCredentialsImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewSchoolCredentialsImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                    </View>

                    :

                    ""
                }


                </View> 

                {
                       errorSchoolCredentials &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSchoolCredentials}</Text>
                    
                    
                } 




                {/* SELF INTRODUCTION */}

                <View style={{flexDirection:'row',}}>

                {
                    visaData.selfIntroduction === 'available' 
                    
                    ?

                    <View style={styles.formEntryImage}>
                    <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                    {
                  visaData.selfIntroductionImage? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved selfintroduction letter</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Self Introduction</Text>
                }
                    {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                    </View>
                    
                    
                    {visaData.selfIntroductionImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteSelfIntroductionImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewSelfIntroductionImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                    </View>

                    :

                    ""
                }


                </View> 

                {
                       errorSelfIntroduction &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorSelfIntroduction}</Text>
                    
                    
                } 



                {/* STATEMENT OF ACCOUNT */}

                <View style={{flexDirection:'row',}}>

                {
                    visaData.statementOfAccount === 'available' 
                    
                    ?

                    <View style={styles.formEntryImage}>
                    <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                    {
                  visaData.statementOfAccountImage ? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved statement of account</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Statement of Account </Text>
                }
                    {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                    </View>
                    
                 
                    {visaData.statementOfAccountImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteStatementOfAccountImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("NewStatementOfAccountImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                    </View>

                    :

                    ""
                }


                </View> 

                {
                       errorStatementOfAccount &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorStatementOfAccount}</Text>
                    
                    
                } 



                {/* COMPANY INTRODUCTION */}

                <View style={{flexDirection:'row',}}>

                {
                    visaData.companyIntroduction === 'available' 
                    
                    ?

                    <View style={styles.formEntryImage}>
                    <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                    {
                  visaData.companyIntroductionImage ? 
                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>saved company introduction letter</Text>

                  </View>
                 
                  :
                  <Text style={{marginHorizontal:5, fontSize:11}}>Company Introduction</Text>
                }
                    {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                    </View>
                    
                   
                    {visaData.companyIntroductionImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteCompanyIntroductionImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("CompanyIntroductionImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                    </View>

                    :

                    ""
                }


                </View> 

                 {
                       errorCompanyIntroduction &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorCompanyIntroduction}</Text>
                    
                    
                   } 


                {/* EMPLOYMENT LETTER */}

                <View style={{flexDirection:'row'}}>

                {
                    visaData.employmentLetter === 'available' 
                    
                    ?

                    <View style={styles.formEntryImage}>
                    <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                    {/* <FontAwesome name="check-circle" size={20} color={visaData.marriageCertificate ? 'green' : 'gray'}/> */}
                    {
                      visaData.employmentLetterImage ? 

                      <View style={{flexDirection:'row'}}>

                        <FontAwesome name="check-circle" size={20} color='green'/>
                        <Text style={{marginLeft:5, color:'black'}}>saved employment letter</Text>

                      </View>
                    
                      :
                      <Text style={{marginHorizontal:5, fontSize:11}}>Employment Letter</Text>
                    }
                    {/* {visaData.marriageCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                    </View>
                    
                   
                    {visaData.employmentLetterImage 
                      
                      ? 
                      
                      <TouchableOpacity 
                          onPress={deleteEmploymentLetterImage}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:"pink", 
                              borderRadius:5, }}>
                          <Ionicons name="close-sharp" size={20} color="black" />
                          </TouchableOpacity>
  
                          :
  
                          <TouchableOpacity 
                          onPress={() => navigation.navigate("EmploymentLetterImageScreen")}
                          style={{ 
                              alignItems:'center', 
                              flexDirection:'row', 
                              paddingVertical:5,
                              paddingHorizontal:10, 
                              backgroundColor:COLORS.main, 
                              borderRadius:5, }}>
                          <Feather name="upload" size={20} color="white" />
                          <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
                          </TouchableOpacity>
                    
                      }

                    </View>

                    :

                    ""
                }


                </View> 
                {
                       errorEmploymentLetter &&

                       <Text style={{color:'red', fontSize:10, marginVertical:5}}> {errorEmploymentLetter}</Text>
                    
                    
                } 

                


      </View> 

      <View style={{marginBottom:20}}>

      <Text style={{fontSize:16, marginBottom:20, fontWeight:'bold'}}>Visadoc will Provide the following unavailable Documents</Text>

      <View style={{flexDirection:'row'}}>

        {
            visaData.internationalPassport === 'unavailable' 
            
            ?
            
            <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>International Passport</Text>

            :

            ""
        }

          

      </View> 

      <View style={{flexDirection:'row'}}>

      {
      visaData.birthCertificate === 'unavailable' 

      ?

      <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Birth Certicate</Text>

      :

      ""
      }



      </View> 

      <View style={{flexDirection:'row', }}>

      {
        visaData.leaveApprovalLetter === 'unavailable' 
        
        ?

        <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5 }}>Leave Approval Letter</Text>

        :

        ""
      }



      </View> 

      <View style={{flexDirection:'row',}}>

        {
            visaData.marriageCertificate === 'unavailable' 
            
            ?

            <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Marriage Certficate</Text>

            :

            ""
        }



      </View> 

      <View style={{flexDirection:'row',}}>

        {
            visaData.passportPhotograph === 'unavailable' 
            
            ?

            <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Passport Photograph</Text>

            :

            ""
        }

        
      </View> 


      <View style={{flexDirection:'row',}}>

      {
          visaData.schoolCredentials === 'unavailable' 
          
          ?

          <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>School Credentials</Text>

          :

          ""
      }


      </View> 

      <View style={{flexDirection:'row',}}>

      {
          visaData.selfIntroduction === 'unavailable' 
          
          ?

          <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Self Introduction</Text>

          :

          ""
      }


      </View> 

      <View style={{flexDirection:'row',}}>

      {
          visaData.statementOfAccount === 'unavailable' 
          
          ?

          <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Statement of Account</Text>

          :

          ""
      }


      </View> 

      <View style={{flexDirection:'row',}}>

      {
          visaData.companyIntroduction === 'unavailable' 
          
          ?

          <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Company Introduction</Text>

          :

          ""
      }


      </View> 

      <View style={{flexDirection:'row',}}>

      {
          visaData.employmentLetter === 'unavailable' 
          
          ?

          <Text style={{marginHorizontal:5, fontSize:14, marginHorizontal:5}}>Employment Letter</Text>

          :

          ""
      }


      </View> 




     

      </View> 

     </View> 

     

    </ScrollView>
      <Pressable onPress = {handleDocumentsUpload}  style = {{ backgroundColor : 'brown', width : '100%', marginBottom : 20, alignItems : 'center', justifyContent : 'center',paddingVertical : 20, flexDirection : 'row',}}>
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
      // margin: 8,
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
      // margin: ,
    },
    container: {
      flex: 1,
      flexDirection:'column',
      justifyContent:'space-between',
      paddingHorizontal:20
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
      top:2,
      right:2,

    },
    
    formEntryImage:{
      flex:1,
      margin:8,
      marginTop:12,
      width:'95%',
      height:50,
      borderWidth:1,
      borderRadius:5,
      borderColor:'gray',
      padding:5,
      // backgroundColor:'blue',
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',
      paddingHorizontal:10
    }


});


