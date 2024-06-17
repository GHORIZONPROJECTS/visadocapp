import { Alert, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState,  useContext, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {storage, db} from '../../firebase'
import * as FileSystem from 'expo-file-system'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable,  deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, deleteField   } from "firebase/firestore";
import { COLORS } from '../../constants/theme'
import { FontAwesome, Ionicons, Feather} from '@expo/vector-icons'
import { VisaContext } from "../../config/VisaContext";
import { AuthContext } from '../../config/AuthContext'
import BackArrow from '../../components/backArrow'

const SchoolCredentialsImageScreen = ({navigation}) => {

  const [userData, setUserData] = useState({})
  const [image, setImage] = useState(null)  
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState("")

  const { user } = useContext(AuthContext)

  const {visaId} = useContext(VisaContext)

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


  //Pick an image from gallery

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //Save image to firebase storage 


  const uploadMedia = async() => {

    setUploading(true);

    try {

        const {uri} = await FileSystem.getInfoAsync(image)
        const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
              resolve(xhr.response);
        };

        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const name = new Date().getTime() + image.substring(image.lastIndexOf('/') + 1);
      
        const storageRef = ref(storage, name);

        const uploadTask = await uploadBytesResumable(storageRef, blob);

        setUrl(await getDownloadURL(storageRef));

        setUploading(false)

        Alert.alert("Passport Photograph has been uploaded successfully!!!")

        setImage(null)

        blob.close();
        
      
        
    } catch (error) {

        console.log(error)
        setUploading(false)
        
    }

  }

  useEffect(() => {
    updateDoc(doc(db, "visa", visaId), {
      schoolCredentialsImage : url,
      timeStamp: serverTimestamp(),

    });
  },[url])

  

  const deleteImage = () => {

    const deleteRef = ref(storage, url);

        // Delete the file
    deleteObject(deleteRef).then(async() => {


        const visaRef = doc(db, 'visa', visaId);

        // Remove the 'capital' field from the document
        await updateDoc(visaRef, {
          schoolCredentialsImage: deleteField()
        });

        
        Alert.alert("Photo deleted successfully")

        setUrl(null)
        // navigation.navigate("SchoolCredentialsImageScreen")

    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
    });

  }

  // useEffect(()=>{
  //   deleteImage()
  // }, [url])

console.log('url:',url)
console.log('image:', image)

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', flexDirection:'column', padding:20}}>

        <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <BackArrow onPress={() => navigation.goBack()}/>
            <Text style={{fontSize:18, fontWeight:'bold', color:COLORS.main, marginRight:10}}>School Credentials </Text>
        </View>

            <View style={{width:300, height:400, alignItems:'center', position:'relative'}}>
            
            {url

            ? 
            
                <>
                    <Image

                        source={{uri: url}}
                        style={{width:300, height:400}}
                        resizeMode='cover'
                    />
                </>

            :

                <>
                    <Text>No Image</Text>
                </>

            }

            {url &&
            
            <Pressable onPress={deleteImage} style={{top:-15, right:-5, position:'absolute', width:50, height:50, borderWidth:2, backgroundColor:'#00000033', alignItems:'center', justifyContent:'center', borderColor:'red'}}><Text style={{fontSize:24, fontWeight:'bold', color:'red'}}>X</Text></Pressable>
            
            }
       
        </View>
       
        <View style={{width:'100%', alignItems:'center', justifyContent:'center', paddingBottom:100}}>

            {(!url && !image) && 

                <Pressable
                onPress={pickImage}
                style={{ 
                    alignItems:'center', 
                    flexDirection:'row', 
                    padding:10, 
                    backgroundColor:COLORS.primary, 
                    borderRadius:5, 
                    
                }}>
                    {/* <Feather name="upload" size={20} color="white" /> */}
                    <Text style={{marginLeft:5, color:'white'}}>Pick Image</Text>
                </Pressable>

            }
            
            {image && 
            
                <Pressable 
                onPress={uploadMedia}
                style={{ 
                    alignItems:'center', 
                    flexDirection:'row', 
                    padding:10, 
                    backgroundColor:COLORS.main, 
                    borderRadius:5, 
                }}>
                    <Feather name="upload" size={20} color="white" />
                    <Text style={{marginLeft:5, color:'white'}}>Save Image</Text>
                </Pressable>
            
            }


          {url && 
            
            <Pressable 
            onPress={() => navigation.navigate("DocumentsAvailableScreen")}
            style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:10, 
                backgroundColor:COLORS.main, 
                borderRadius:5, 
                width:'100%',
                paddingVertical:20,
                justifyContent:'center'
            }}>
                
                <Text style={{marginLeft:5, color:'white', fontSize:18}}>Next</Text>
            </Pressable>
        
        }

            
        </View>
       
        
    </View>
  )
}

export default SchoolCredentialsImageScreen

const styles = StyleSheet.create({})

