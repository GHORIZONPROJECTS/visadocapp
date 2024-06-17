
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput } from "react-native";
// import Constants from "expo-constants";
// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useForm, Controller } from "react-hook-form";
// import { InspectionStore, WizardStore } from "../../store";
import { MD3Colors, ProgressBar, Divider, RadioButton, Button} from "react-native-paper";
// import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { Paystack }  from 'react-native-paystack-webview';
// import { RootSiblingParent } from "react-native-root-siblings";
// import Toast from "react-native-root-toast";
import React, { useState, useEffect, useContext } from "react";
import BackArrow from '../../components/backArrow'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import { auth, db } from '../../firebase';
import { AuthContext } from '../../config/AuthContext'
import Loader from '../../components/loader'
import { doc, getDoc, setDoc, serverTimestamp, updateDoc  } from "firebase/firestore";
import { VisaContext } from "../../config/VisaContext";


export default function CardPaymentScreen({ navigation }) {

  
  const [userData, setUserData] = useState({})
  const [image, setImage] = useState(null)  
  const [uploading, setUploading] = useState(false)
  const [visaData, setVisaData] = useState({})
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  // const [amount, setAmount] = useState("")


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

    console.log(visaData)

    const handleOnchange = (text) => {
      
    }

//   const information = WizardStore.useState();

//   console.log(information)

  const [pay, setPay] = useState(false);
//   const [billingDetail, setBillingDetail] = useState({
//     billingName: information.firstname+' '+information.lastname,
//     billingEmail: information.email,
//     billingMobile: information.phoneNumber,
//     amount: "1500",
//   });

//   const handleOnchange = (text, input) => {
//     setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
//   };

  const handleSubmitPay = () => {
//     if (
//       billingDetail.billingName &&
//       billingDetail.billingEmail &&
//       billingDetail.billingMobile &&
//       billingDetail.amount
//     ) {
      setPay(true);
//     } else {
//       Toast.show("Fill in all fields", {
//         duration: Toast.durations.LONG,
//       });
//     }
  };


  const [value, setValue] = React.useState('card');

//   const isFocused = useIsFocused();

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({ defaultValues: InspectionStore.useState((s) => s) });

  // useEffect(() => {
  //   isFocused &&
  //     InspectionStore.update((s) => {
  //       s.progress = 66;
  //     });

  //   console.log("updated state...", InspectionStore.getRawState().progress);
  // }, [isFocused]);

  const onSubmit = (data) => {
    
  //   InspectionStore.update((s) => {
  //     s.progress = 66;
  //     s.firstname = data.firstname
  //     s.lastname = data.lastname
  //     s.state = data.state
  //     s.license = data.license
  //     s.expiration = data.expiration
  //     s.dob = data.dob
      
      // s.birthPlace = data.birthPlace;
      // s.maidenName = data.maidenName;
      // console.log("updated state...", InspectionStore.getRawState().firstname);
  //   });

    
    navigation.navigate("PaymentSuccessfulScreen");
  };

  

  return (
    <ScrollView style={styles.container}>
      {/* <ProgressBar
        style={styles.progressBar}
        progress={InspectionStore.useState().progress / 100}
        color={MD3Colors.primary60}
      /> */}

         
      <View style={{ paddingHorizontal: 16, marginVertical:20}}>
      <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <BackArrow onPress={() => navigation.goBack()}/>
            <Text style={{fontSize:18, fontWeight:'bold', color:COLORS.main, marginRight:10}}>Payment</Text>
        </View>
      {/* <Text
        style={{fontSize:18, marginVertical:20, fontWeight:500}}
      >Payment</Text> */}
      <Divider/>

        <Text style={{marginVertical:20, fontWeight:500}}>Pay with</Text>

        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="card" />
            <Text style={{marginRight:20}}>Card</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="transfer" />
            <Text>Transfer</Text>
        </View>
        </View>
        
        </RadioButton.Group>


      {value === 'card' &&
        (
          // <RootSiblingParent>
          <View style={styles.body}>
          <TextInput
            style={styles.input}
            placeholder="Billing Name"
            value={`${visaData.firstname}  ${visaData.surname} `}
            onChangeText={text => setFullname(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Billing Email"
            value={user.email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Billing Mobile"
            onChangeText={(text) => setPhoneNumber(text)}
            value={visaData.phoneNumber}
          />

          <View style={{width:'100%', height:50, backgroundColor: '#00000011', marginVertical:20, padding:10, borderRadius:2}}>
              <Text style={{color:'#00000088', fontSize:16}}>${visaData.total}.00</Text>
          </View>
          {/* <TextInput
            style={[styles.input, {marginBottom:30, fontWeight:'bold'}]}
            placeholder="Amount"
            // onChangeText={(text) => handleOnchange(text, "amount")}
            value={visaData.total}
            // editable = {false}
          /> */}

          <TouchableOpacity
            onPress={handleSubmitPay}
            style={{padding:20, alignItems:'center', backgroundColor:COLORS.main}}
          >
            <Text style={{color:'white', fontWeight:500}}>Pay Now</Text>
           </TouchableOpacity> 

          {pay && (
            <View style={{ flex: 1 }}>
              <Paystack
                paystackKey="pk_live_161c76d517eb1046087a90644b3254a012864f6a"
                // paystackKey="pk_test_d666de567abe8f9f66fa22c96715dd9e6759a777"
                amount={visaData.total}
                billingEmail={user.email}
                billingMobile={visaData.phoneNumber}
                activityIndicatorColor="blue"
                onCancel={(e) => {
                  // handle response here
                  Toast.show("Transaction Cancelled!!", {
                    duration: Toast.durations.LONG,
                  });
                }}
                onSuccess={(response) => {
                  // handle response here

                  const responseObject = response["transactionRef"]["message"];
                  if (responseObject === "Approved") {
                    // Toast.show("Transaction Approved!!", {
                    //   duration: Toast.durations.LONG,
                    // });
                    navigation.navigate("PaymentSuccessfulScreen")
                  }

                }}
                autoStart={pay}
              />
            </View>
          )}
          </View>
          // </RootSiblingParent>
        )
       
      }

      {value === 'transfer' &&
              (
                <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', marginVertical:50}}>
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray'}}>Transfer N1,500,000 to:</Text> 
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'black'}}>
                    Visadoc Travel Agency
                  </Text> 
                  <Text style={{fontSize:14, fontWeight:500, marginBottom:10, color:'black'}}>GTB</Text> 
                  <Text style={{fontSize:18, fontWeight:500, marginBottom:10, color:'black'}}>00000000000</Text> 
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray'}}>Expires in 10:00 minutes</Text> 
                <Button
                onPress={() => navigation.navigate('PaymentSuccessfulScreen')}
                mode="outlined"
                style={[styles.button, { marginTop: 40, paddingVertical:5, width:'80%' }]}
              >
                Confirm Payment
              </Button>

              </View>
              )
            
      }
    
  </View> 

    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  body: {
    padding: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
  },
});

