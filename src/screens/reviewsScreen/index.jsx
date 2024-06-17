import { Image, Text, View, TextInput, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
// import ReviewsHeaderComponent from '../../components/reviewsComponent/reviewsHeaderComponent'
import { COLORS, SIZES } from '../../constants/theme'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase'
import { doc, addDoc, serverTimestamp, getDoc, collection} from 'firebase/firestore'
// import { Button } from '../../components/authComponent';


const ReviewsScreen = ({navigation, route}) => {

    const visaId = route.params
        console.log(visaId)


     const [rating, setRating] = useState('')
    //  const [tapReviewSelected, setTapReviewSelected] = useState({values :[], backgroundColor:'white'}) 
     const [message, setMessage] = useState("")
     const [ shopping, setShopping ] = useState([])
     const [ visaData, setVisaData ] = useState([])

    //  const addSuggest = () => {
    //     setTapReviewSelected([...tapReviewSelected, value])
    //  }
    //  console.log(tapReviewSelected)

     
  const getVisa = async() => {

    const docRef = doc(db, "visa", visaId);

    const docSnap = await getDoc(docRef);


        
    if (docSnap.exists()) {

      setVisaData(docSnap.data() )

    } else {
      
      console.log("No such document!");
    }



}

// console.log(shoppingArray)


useEffect(()=>{

  getVisa()

}, [])


const submitReview = async() => {
     await addDoc(collection(db, "reviews"), {
            
        firstname: visaData.firstname,
        surname: visaData.surname,
        telephone: visaData.phoneNumber,
        timeStamp: serverTimestamp(),
        status : visaData.status,
        visaId: visaId,
        rating: rating, 
        message: message
    
      }
  ).then(() =>{
    navigation.navigate('Home')
  });
 }





  return (
    <View>
      <View style={{marginTop:50, alignItems:'center', justifyContent:'space-around'}}>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Write a Review</Text>
      </View>

            <View style={{width:SIZES.width*0.9, marginTop: 20,height: 130, borderRadius:20,backgroundColor:'#dad8d8', alignItems:'center', flexDirection:'row', alignSelf:'center', justifyContent:'center'}}>
                <View style={{width:100, height:130}}>
                    <Image
                        source={require('../../../assets/images/passport.png')}
                        resizeMode="contain"
                        style={{width:100, height:120}}
                    />
                </View>
                {/* <View style={{marginLeft:10, paddingTop:10, paddingBottom: 10, width:200}}> */}
                {/* {shopping.map(row => (
                <View key={row.id} >
                  <Text style={{fontSize:12, fontWeight:'600', marginBottom:5}}>{row.title}, N{row.TotalItemPrice}.00</Text>
               </View>
                 ))} */}

                  {/* <Text style={{fontSize:12, fontWeight:'600', marginBottom:5}}>Transportation, N500.00</Text> */}
                    {/* <Text style={{fontSize:16, fontWeight:'600', marginBottom:5}}>Ofada Rice and Plantain </Text>
                    <Text>+bottle water</Text> */}

                {/* </View> */}
               
            </View>
                <View style={{marginTop:20, alignItems:'center'}}>
                    <Text style={{fontWeight:'400'}}>Rate us : How was Our visa approval process?</Text>
                    <View style={{width:SIZES.width*0.9, height:60, backgroundColor:'#dad8d8', marginTop:20, justifyContent:'center'}}>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                    {rating >= 1 ? (
                    <AntDesign name="star" size={24} color="orange"  onPress={()=>setRating(1)}/> 
                    ) : ( 
                    <AntDesign name="staro" size={24}  color="black"   onPress={()=>setRating(1)}/> 
                    )} 
                    {rating >= 2 ? (
                    <AntDesign name="star" size={24}  color="orange"    onPress={()=>setRating(2)}/> 
                    ) : ( 
                    <AntDesign name="staro" size={24}  color="black"    onPress={()=>setRating(2)}/> 
                    )}
                    {rating >= 3 ? (
                    <AntDesign name="star" size={24}  color="orange"    onPress={()=>setRating(3)} /> 
                    ) : ( 
                    <AntDesign name="staro" size={24}  color="black"   onPress={()=>setRating(3)}/> 
                    )}
                    {rating >= 4 ? (
                    <AntDesign name="star" size={24}  color="orange"   onPress={()=>setRating(4)}/> 
                    ):(<AntDesign name="staro" size={24}  color="black"    onPress={()=>setRating(4)}/> 
                    )}
                    {rating >= 5 ? (
                    <AntDesign name="star" size={24}  color="orange"   onPress={()=>setRating(5)}/> 
                    ) : ( 
                    <AntDesign name="staro" size={24}  color="black"   onPress={()=>setRating(5)}/> 
                    )} 
                 </View>

                    </View>
                </View>
  
                <View style={{marginHorizontal:20, marginTop:40}}>
                <TextInput
                       style={{padding:10, marginTop:0, borderRadius:20, borderWidth:1, borderStyle:'dashed'}}
                       placeholder="write a review on our service"
                       numberOfLines={3}
                       textAlignVertical="top"
                       value={message}
                       onChangeText={(message) => setMessage(message)}
                       

                     
                />
                 </View>
                 <View style={{marginHorizontal:20, marginTop:50, alignItems:'center'}}>
                  <Pressable
                          onPress={submitReview}
                          // backgroundColor={COLORS.primary}
                          titleSize={16}
                          style={{
                          marginBottom: 24, width:SIZES.width*0.8, height:60, backgroundColor:"#74AD7A", borderRadius:10, alignItems:'center', justifyContent:'center'
                          }}
                    
                    ><Text style={{color:"white", fontSize:16}}>Submit</Text>
                    </Pressable>
                </View>
                
    </View>
  )
}

export default ReviewsScreen
