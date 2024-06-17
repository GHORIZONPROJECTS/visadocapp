import { View, Text, StyleSheet,TouchableOpacity, Platform } from 'react-native'
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import {COLORS, SIZES} from '../constants/theme'
// import { CartContext } from '../config/CartContext'
import ApplicationScreen from '../screens/applicationScreen'
import VisaScreen from '../screens/visaScreen'
import DocumentsScreen from '../screens/documentsScreen'
import ChatScreen from '../screens/chatScreen'
import HomeScreen from '../screens/homeScreen'
import NotificationScreen from '../screens/notificationScreen';



const UserTabs = createBottomTabNavigator()

const UserBottomTabNavigation = ({navigation}) => {

    // const { totalQty } = useContext(CartContext);
  
  return (
   <UserTabs.Navigator
        // initialRouteName={HomeScreen}
        defaultScreenOptions={HomeScreen}

        
         screenOptions={({route, navigation})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName
                if(route.name === 'Home'){
                    iconName = focused
                    ? 'ios-home' 
                    : 'ios-home-outline';
                   
                }  else if (route.name === 'VisaDoc') {
                    iconName = focused 
                    ? 'ios-airplane'
                    : 'ios-airplane-outline';
                }else if (route.name === 'Apply') {
                    iconName = focused 
                    ? 'ios-settings'
                    : 'ios-settings-outline';
                }
                
                else if (route.name === 'Documents') {
                    iconName = focused 
                    ? 'ios-documents' 
                    : 'ios-documents-outline';
                } else if (route.name === 'Chat') {
                    iconName = focused
                    ? 'ios-chatbubble-ellipses' 
                    : 'ios-chatbubble-ellipses-outline'; 
                   
                }
                return <Ionicons name={iconName} size={size} color={color} />
                
            },
            tabBarActiveTintColor: COLORS.main,
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel:true,
            animation : 'simple_push',
            headerShown: false,
            // tabBarStyle: {  backgroundColor:'#00000005' },
            

                  
 
        })} 
   >

        <UserTabs.Screen  
            name="Home" 
            component={HomeScreen}
            options={
                {
                    headerShown:false,
                    //  tabBarBadge: totalQty
                
                }
            }

           
        />

        <UserTabs.Screen  
            name="Apply" 
            component={ApplicationScreen}
            options={
                {
                     headerShown:false

                }
            }
            
          
        />
         
        <UserTabs.Screen  
            name="VisaDoc" 
            component={VisaScreen}
            options={
              
              {
                tabBarIcon: ({focused})=> {
                    return(
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: COLORS.main,
                                height: Platform.OS =="ios" ? 50 : 60,
                                width: Platform.OS == "ios" ? 50 : 60,
                                top: Platform.OS == "ios" ? -10 : -20,
                                borderRadius: Platform.OS == "ios" ? 25 : 30,
                                borderWidth: 2,
                                borderColor:  COLORS.white
                            }}
                        >
                            <Ionicons
                                name='ios-airplane'
                                size={24}
                                color={COLORS.white}
                            />
                        
                        </View>
                    )
                }
              }

           
            }
        />

                 
          <UserTabs.Screen  
            name="Documents" 
            component={DocumentsScreen}
            options={
                {
                    headerShown:false
                 
                }
            }
        />
        <UserTabs.Screen  
            name="Chat" 
            component={ChatScreen}
            options={
                {
                    headerShown:false,
                     tabBarBadge: 1
                
                }
            }
        />

    

       
   </UserTabs.Navigator>

   
   
  )
}

export default UserBottomTabNavigation