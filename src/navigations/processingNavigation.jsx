import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InformationScreen from "../screens/informationScreen";
import SafetyAndSecurityScreen from "../screens/safetyAndSecurityScreen";
import DestinationCountryScreen from "../screens/destinationCountryScreen";
import VisaTypeScreen from "../screens/visaTypeScreen";
import PurposeOfTravelScreen from "../screens/purposeOfTravelScreen";
import AvailableDocumentScreen from "../screens/availableDocumentScreen";
import UserInformationScreen from "../screens/userInformationScreen";
import MaritalAndEmploymentScreen from "../screens/maritalAndEmploymentScreen";
import ParentScreen from "../screens/parentScreen";
import EducationScreen from "../screens/educationScreen";
import EmploymentScreen from "../screens/employmentScreen";
import TraveHistoryScreen from "../screens/TravelHistory";
import DocumentsAvailableScreen from "../screens/documentsAvailableScreen";
import CardPaymentScreen from "../screens/cardPaymentScreen";
import PaymentSuccessfulScreen from "../screens/paymentSuccessfulScreen";
import InternationalPassportImageScreen from "../screens/internationalPassportImage";
import BirthCertificateImageScreen from "../screens/birthCertificateImageScreen";
import LeaveApprovalLetterImageScreen from "../screens/leaveApprovalLetterImageScreen";
import MarriageCertificateImageScreen from "../screens/marriageCertificateImageScreen";
import PassportPhotographImageScreen from "../screens/passportPhotographImageScreen";
import SchoolCredentialsImageScreen from "../screens/schoolCredentialsImageScreen";
import SelfIntroductionImageScreen from "../screens/selfIntroductionImageScreen";
import StatementOfAccountImageScreen from "../screens/statementOfAccountImageScreen";
import EmploymentLetterImageScreen from "../screens/employmentLetterImageScreen";
import CompanyIntroductionImageScreen from "../screens/companyIntroductionImageScreen";

import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../config/AuthContext';
import { VisaContext } from "../config/VisaContext.js";
import {auth, db} from '../firebase.js';
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import Loading from "../components/loading/index.jsx";
import ServiceChargeScreen from "../screens/serviceChargeScreen/index.jsx";
import FathersDeathCertificateImageScreen from "../screens/FathersDeathCertificateImageScreen";
import MothersDeathCertificateImageScreen from "../screens/MothersDeathCertificateImageScreen";
import TravelHistoryImageScreen from "../screens/travelHistoryImageScreen/index.jsx";
import DecisionLetterImageScreen from "../screens/decisionLetterImageScreen/index.jsx";
import ConsentLetterImageScreen from "../screens/consentLetterImageScreen/index.jsx";
import ReviewVisaRequestScreen from "../screens/ReviewVisaRequestScreen/index.jsx";
// import MyProfileScreen from "../screens/myProfileScreen";

// const ProcessingStack = createStackNavigator();


const ProcessingStack = createNativeStackNavigator()

const ProcessingNavigation = () => {

    const { user, info, setInfo } = useContext(AuthContext)

    const [userData, setUserData] = useState({})


    const [ visaInfo, setVisaInfo ] = useState("")

    const { visaId } = useContext(VisaContext)


    const [isLoading, setIsLoading] = useState(true);

    
  
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
  


    // const getVisaData = async() => {

    //   const docRef = doc(db, "visa", visaId);

    //     const docSnap = await getDoc(docRef);
        
    //     if (docSnap.exists()) {
  
    //       setVisaInfo(docSnap.data())

    //       // setTotal(docSnap.data())
          
          
    //     } else {
  
    //       console.log("No such document!");
    //     }
    // }
  
    // useEffect(()=>{

    //   getVisaData()

    // }, [])


      // const getUserVisaInfo = async() => {
      //   const docRef = doc(db, "visa", user.id);
      //     const docSnap = await getDoc(docRef);
          
      //     if (docSnap.exists()) {
    
      //       setUserVisaData(docSnap.data())
            
      //     } else {
    
      //       console.log("No such document!");
      //     }
      // }

      //  useEffect(()=>{
      //   getUserVisaInfo()
      // }, [])
    
     
    
      // console.log('socials:',userVisaData.socials)
      // console.log('visaInfo:',userVisaData)
      // console.log('visaId:', visaId)

    return (
            <ProcessingStack.Navigator screenOptions = {{animation : 'simple_push'}}>
              {/* {!userData.info && */}
                <ProcessingStack.Screen name="InformationScreen" component={InformationScreen}  options={{headerShown : false}} />
              {/* }   */}
              {/* {!userData.safety && */}
                <ProcessingStack.Screen name="SafetyAndSecurityScreen" component={SafetyAndSecurityScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.destination && */}
                <ProcessingStack.Screen name="DestinationCountryScreen" component={DestinationCountryScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.purpose && */}
                <ProcessingStack.Screen name="PurposeOfTravelScreen" component={PurposeOfTravelScreen} options={{headerShown : false}}/> 
              {/* } */}
              {/* {!userData.type && */}
                <ProcessingStack.Screen name="VisaTypeScreen" component={VisaTypeScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.available && */}
                <ProcessingStack.Screen name="AvailableDocumentScreen" component={AvailableDocumentScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.userInfo && */}
                <ProcessingStack.Screen name="UserInformationScreen" component={UserInformationScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.marital && */}
                <ProcessingStack.Screen name="MaritalAndEmploymentScreen" component={MaritalAndEmploymentScreen} options={{headerShown : false}}/>
              {/* } */}
                <ProcessingStack.Screen name="ConsentLetterImageScreen" component={ConsentLetterImageScreen} options={{headerShown : false}}/>

              {/* {!userData.parent && */}
                <ProcessingStack.Screen name="ParentScreen" component={ParentScreen} options={{headerShown : false}}/>
              {/* }   */}
                {/* <ProcessingStack.Screen name="FathersDeathCertificateImageScreen" component={FathersDeathCertificateImageScreen} options={{headerShown : false}}/>
                
                <ProcessingStack.Screen name="MothersDeathCertificateImageScreen" component={MothersDeathCertificateImageScreen} options={{headerShown : false}}/> */}
              {/* {!userData.education &&   */}
                <ProcessingStack.Screen name="EducationScreen" component={EducationScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.employment && */}
                <ProcessingStack.Screen name="EmploymentScreen" component={EmploymentScreen} options={{headerShown : false}}/>
              {/* } */}
              {/* {!userData.history &&    */}
                <ProcessingStack.Screen name="TravelHistoryScreen" component={TraveHistoryScreen} options={{headerShown : false}}/>
              {/* } */}
                <ProcessingStack.Screen name="TravelHistoryImageScreen" component={TravelHistoryImageScreen} options={{headerShown : false}}/>

                <ProcessingStack.Screen name="DecisionLetterImageScreen" component={DecisionLetterImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="DocumentsAvailableScreen" component={DocumentsAvailableScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="InternationalPassportImageScreen" component={InternationalPassportImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="BirthCertificateImageScreen" component={BirthCertificateImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="LeaveApprovalLetterImageScreen" component={LeaveApprovalLetterImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="MarriageCertificateImageScreen" component={MarriageCertificateImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="PassportPhotographImageScreen" component={PassportPhotographImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="SchoolCredentialsImageScreen" component={SchoolCredentialsImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="SelfIntroductionImageScreen" component={SelfIntroductionImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="StatementOfAccountImageScreen" component={StatementOfAccountImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="CompanyIntroductionImageScreen" component={CompanyIntroductionImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="EmploymentLetterImageScreen" component={EmploymentLetterImageScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="ReviewVisaRequestScreen" component={ReviewVisaRequestScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="ServiceChargeScreen" component={ServiceChargeScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="CardPaymentScreen" component={CardPaymentScreen} options={{headerShown : false}}/>
                <ProcessingStack.Screen name="PaymentSuccessfulScreen" component={PaymentSuccessfulScreen} options={{headerShown : false}}/>
                
            </ProcessingStack.Navigator>
       
    )
}

export default ProcessingNavigation