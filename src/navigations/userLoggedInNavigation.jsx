import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserBottomTabNavigation from './userBottomTabNavigation';
import NotificationScreen from '../screens/notificationScreen';
import ProfileScreen from '../screens/profileScreen';
import PersonalInformationScreen from '../screens/personalInformationScreen';
import EducationInformationScreen from '../screens/EducationInformationScreen';
import EmploymentDetailsScreen from '../screens/EmploymentDetailsScreen';
import ContactSupportScreen from '../screens/contactSupportScreen';
import ViewApplicationScreen from '../screens/viewApplicationScreen';
import VisaStatusScreen from '../screens/visaStatusScreen';
import ReviewsScreen from '../screens/reviewsScreen';

import NewVisaTypeScreen from "../screens/newVisaTypeScreen";

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


import ServiceChargeScreen from "../screens/serviceChargeScreen/index.jsx";
import ConsentLetterImageScreen from "../screens/consentLetterImageScreen/index.jsx";
import ReviewVisaRequestScreen from "../screens/ReviewVisaRequestScreen/index.jsx";
import PaymentScreen from '../screens/paymentScreen/index.jsx';
import FAQScreen from '../screens/FAQScreen/index.jsx';
import EmailScreen from '../screens/emailScreen/index.jsx';
import NewPurposeOfTravelScreen from '../screens/newPurposeOfTravelScreen';
import NewUserInformationScreen from '../screens/newUserInformationScreen';
import NewMaritalAndEmploymentScreen from '../screens/newMaritalAndEmploymentScreen';
import NewParentScreen from '../screens/newParentScreen';
import NewEducationScreen from '../screens/NewEducationScreen';
import NewEmploymentScreen from '../screens/newEmploymentScreen';
import NewTravelHistoryScreen from '../screens/newTravelHistoryScreen';
import NewDocumentsAvailableScreen from '../screens/newDocumentsAvailableScreen';
import NewTravelHistoryImageScreen from '../screens/newTravelHistoryImageScreen/index.jsx';
import NewDecisionLetterImageScreen from '../screens/newDecisionLetterImageScreen/index.jsx';
import NewBirthCertificateImageScreen from '../screens/newBirthCertificateImageScreen/index.jsx';
import NewLeaveApprovalLetterImageScreen from '../screens/newLeaveApprovalLetterImageScreen/index.jsx';
import NewMarriageCertificateImageScreen from '../screens/newMarriageCertificateImageScreen/index.jsx';
import NewPassportPhotographImageScreen from '../screens/newPassportPhotographImageScreen/index.jsx';
import NewSchoolCredentialsImageScreen from '../screens/newSchoolCredentialsImageScreen/index.jsx';
import NewSelfIntroductionImageScreen from '../screens/newSelfIntroductionImageScreen/index.jsx';
import NewStatementOfAccountImageScreen from '../screens/newStatementOfAccountImageScreen/index.jsx';
import NewCompanyIntroductionImageScreen from '../screens/newCompanyIntroductionImageScreen/index.jsx';
import NewEmploymentLetterImageScreen from '../screens/newEmploymentLetterImageScreen/index.jsx';
import NewInternationalPassportImageScreen from '../screens/newInternationalPassportImageScreen/index.jsx';
import AvailableDocumentScreen from '../screens/availableDocumentScreen/index.jsx';
import NewAvailableDocumentScreen from '../screens/NewAvailableDocumentScreen/index.jsx';
import NewReviewVisaRequestScreen from '../screens/newReviewVisaRequestScreen/index.jsx';
import NewServiceChargeScreen from '../screens/newServiceChargeScreen/index.jsx';
import NewCardPaymentScreen from '../screens/newCardPaymentScreen/index.jsx';
import NewPaymentSuccessfulScreen from '../screens/newPaymentSuccessfullScreen/index.jsx';
import AllApplicationScreen from '../screens/allApplicationScreen/index.jsx';
import ViewDocumentsScreen from '../screens/viewDocumentsScreen/index.jsx';
import ViewNotificationScreen from '../screens/viewNotificationScreen/index.jsx';


const userloggedInStack = createNativeStackNavigator()

const UserLoggedInNavigation = () => {

    return(

        <userloggedInStack.Navigator>
                 <userloggedInStack.Screen 
                    name='bottomTab' 
                    component={UserBottomTabNavigation}
                    options={
                        {
                            headerShown:false
                        }
                    } 
                />
                <userloggedInStack.Screen 
                    name="NotificationScreen" 
                    component={NotificationScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                />
                <userloggedInStack.Screen 
                    name="ProfileScreen" 
                    component={ProfileScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                />
                  <userloggedInStack.Screen 
                    name="PersonalInformationScreen" 
                    component={PersonalInformationScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                  <userloggedInStack.Screen 
                    name="EducationInformationScreen" 
                    component={EducationInformationScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                  <userloggedInStack.Screen 
                    name="EmploymentDetailsScreen" 
                    component={EmploymentDetailsScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                  
                  <userloggedInStack.Screen 
                    name="PaymentScreen" 
                    component={PaymentScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                  <userloggedInStack.Screen 
                    name="ContactSupportScreen" 
                    component={ContactSupportScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                  <userloggedInStack.Screen 
                    name="ViewApplicationScreen" 
                    component={ViewApplicationScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                 <userloggedInStack.Screen 
                    name="VisaStatusScreen" 
                    component={VisaStatusScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

                 <userloggedInStack.Screen 
                    name="ReviewsScreen" 
                    component={ReviewsScreen}
                    options={
                        {
                            headerShown:false
                        }
                    }    
                  />

               

                <userloggedInStack.Screen 
                    name="FAQScreen" 
                    component={FAQScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  /> 

                <userloggedInStack.Screen 
                    name="EmailScreen" 
                    component={EmailScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  /> 

                <userloggedInStack.Screen
                    name='AllApplicationScreen'
                    component={AllApplicationScreen}
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />
               
                <userloggedInStack.Screen
                    name='ViewDocumentsScreen'
                    component={ViewDocumentsScreen}
                    options={
                        {
                            headerShown : false
                        }
                    }
                /> 

                <userloggedInStack.Screen
                    name='ViewNotificationScreen'
                    component={ViewNotificationScreen}
                    options={
                        {
                            headerShown : false
                        }
                    }
                />

                
                
                  <userloggedInStack.Screen 
                    name="NewPurposeOfTravelNewScreen" 
                    component={NewPurposeOfTravelScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  /> 



                  <userloggedInStack.Screen 
                    name="NewVisaTypeScreen" 
                    component={NewVisaTypeScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                />
                
                <userloggedInStack.Screen 
                    name="NewAvailableDocumentScreen" 
                    component={NewAvailableDocumentScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                />

                  <userloggedInStack.Screen 
                    name="NewUserInformationScreen" 
                    component={NewUserInformationScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                    />
                  <userloggedInStack.Screen 
                    name="NewMaritalAndEmploymentScreen" 
                    component={NewMaritalAndEmploymentScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                 />
  
                  <userloggedInStack.Screen 
                    name="ConsentLetterImageScreen" 
                    component={ConsentLetterImageScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                />
  
                  <userloggedInStack.Screen 
                    name="NewParentScreen" 
                    component={NewParentScreen} 
                    options={
                        {
                            headerShown : false
                        }
                        }
                  />
              
                  <userloggedInStack.Screen 
                    name="NewEducationScreen" 
                    component={NewEducationScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />
                  <userloggedInStack.Screen 
                    name="NewEmploymentScreen" 
                    component={NewEmploymentScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  /> 
                  <userloggedInStack.Screen 
                    name="NewTravelHistoryScreen" 
                    component={NewTravelHistoryScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                 />
                  <userloggedInStack.Screen 
                    name="NewTravelHistoryImageScreen" 
                    component={NewTravelHistoryImageScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />
  
                  <userloggedInStack.Screen 
                    name="NewDecisionLetterImageScreen" 
                    component={NewDecisionLetterImageScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />
                  <userloggedInStack.Screen 
                    name="NewDocumentsAvailableScreen" 
                    component={NewDocumentsAvailableScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />
                  <userloggedInStack.Screen 
                    name="NewInternationalPassportImageScreen" 
                    component={NewInternationalPassportImageScreen} 
                    options={
                        {
                            headerShown : false
                        }
                    }
                  />

                  <userloggedInStack.Screen 
                  name="NewBirthCertificateImageScreen" 
                  component={NewBirthCertificateImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewLeaveApprovalLetterImageScreen" 
                  component={NewLeaveApprovalLetterImageScreen}
                   options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewMarriageCertificateImageScreen" 
                  component={NewMarriageCertificateImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewPassportPhotographImageScreen" 
                  component={NewPassportPhotographImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewSchoolCredentialsImageScreen" 
                  component={NewSchoolCredentialsImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewSelfIntroductionImageScreen" 
                  component={NewSelfIntroductionImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewStatementOfAccountImageScreen" 
                  component={NewStatementOfAccountImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewCompanyIntroductionImageScreen" 
                  component={NewCompanyIntroductionImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewEmploymentLetterImageScreen" 
                  component={NewEmploymentLetterImageScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewReviewVisaRequestScreen" 
                  component={NewReviewVisaRequestScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewServiceChargeScreen" 
                  component={NewServiceChargeScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewCardPaymentScreen" 
                  component={NewCardPaymentScreen} 
                  options={{headerShown : false}}/>

                  <userloggedInStack.Screen 
                  name="NewPaymentSuccessfulScreen" 
                  component={NewPaymentSuccessfulScreen} 
                  options={{headerShown : false}}/>
                

                                   
        </userloggedInStack.Navigator>

    )
}

export default UserLoggedInNavigation

