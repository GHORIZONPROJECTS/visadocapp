import { View, Text } from 'react-native'
import React from 'react'

const index = () => {

    const getVisaConsentLetter = () => {

        onSnapshot(doc(db, "visa", visaId), (doc) => {
      
        //  console.log("Current data: ", doc.data().decisionLetterImage);
      
         setConsentLetter(doc.data().consentLetterImage)
      
       });
      
      }
    
  return (
    <View>
      
      <View style={styles.formEntryImage}>
                <View style={{ flexDirection:'row', alignItems:'space-between'}}>
                {/* <FontAwesome name="check-circle" size={20} color={visaData.birthCertificate ? 'green' : 'gray'}/> */}
                {
                  consentLetter === "" ? 

                  <View style={{flexDirection:'row'}}>

                    <FontAwesome name="check-circle" size={20} color='green'/>
                    <Text style={{marginLeft:5, color:'black'}}>Uploaded</Text>

                  </View>
                 
                  :

                  <Text style={{marginHorizontal:5, fontSize:11}}>Consent Letter </Text>
                }
               
                {/* {visaData.birthCertificate && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>} */}
                </View>

                {
                  consentLetter === "" ?

                  <TouchableOpacity 
                  onPress={() => navigation.navigate("deleteConsentLetterImage", )}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:5,
                      paddingHorizontal:30, 
                      backgroundColor:"red", 
                      borderRadius:5, }}>
                  <Ionicons name="close-sharp" size={20} color="black" />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity 
                  onPress={() => navigation.navigate("ConsentLetterImageScreen", )}
                  style={{ 
                      alignItems:'center', 
                      flexDirection:'row', 
                      paddingVertical:10,
                      paddingHorizontal:30, 
                      backgroundColor:COLORS.main, 
                      borderRadius:5, }}>
                  <Feather name="upload" size={16} color="white" />
                  </TouchableOpacity>


                }
                
             
        
                </View>



    </View>
  )
}

export default index