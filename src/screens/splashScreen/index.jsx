// import { Image, StatusBar, StyleSheet, Text, View, ImageBackground } from 'react-native';
// import React, { useState} from 'react';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { SIZES, COLORS } from '../../constants/theme';
// import { Ionicons } from '@expo/vector-icons'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SplashScreen = ({viewedOnboarding}) => {


//     const slides = [
//         {
//             id : '0',
//             title : 'Visa Processing',
//             description : 'We offer professional, quick and easy visa processing to clients ',
//             image : require('./assets/images/visa-registration.png')
//         },
//         {
//             id : '1',
//             title : ' View Processing ',
//             description : 'All registered client can review each stage of their visa process',
//             image : require('../../../assets/images/visa-form.png')
//         },
//         {
//             id : '2',
//             title : 'Guidance and approval',
//             description : 'We provide the neccessary visa guidance required for your visa approval',
//             image : require('../../../assets/images/visa-approved.png')
//         },
//         {
//             id : '3',
//             title : ' Continous Support',
//             description : 'After Visa approval, our clients can always get back to us for support',
//             image : require('../../../assets/images/visa-trip.png')
//         },
//     ]  

//     StatusBar.setBarStyle('light-content', true);

//     const [showHomePage, setShowHomePage] = useState(viewedOnboarding);

//     const buttonLabel = (label)=>{
//     return(
//       <View style={{padding:12}}>
//          <Text style={{color:COLORS.title, fontSize:SIZES.h4, fontWeight:'600'}}>{label}</Text>
//       </View>
//     )
    
//     }

//     const startLabel = ()=>{
//         return(
//         <View style={{width:50, height:50, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'center', borderRadius:25}}>
//                 <Ionicons name="ios-arrow-forward-sharp" size={30} color={COLORS.white} />
            
//         </View>
//         )
        
//     }

//     return (

//      <>  
//      <AppIntroSlider 
//         data={slides} 
//         renderItem={({item}) => {
//           return(
//            <View style={{flex:1, alignItems:"center", paddingTop:70}} key={item.id}>

//               <Image 
//                 source={item.image}
//                 style={{width:SIZES.width-10, height:400}}
//                 resizeMode="contain"
//               />
//               <View style={{marginTop:20, paddingHorizontal: 20}}>
//               <Text style={{fontSize:SIZES.h1, fontWeight:"bold", lineHeight: 30, color:"black", textAlign:'center', marginBottom : 10}}>{item.title}</Text>
//               <Text style={{fontSize:SIZES.h3, fontWeight:400, lineHeight: 30, color:"gray", textAlign:'center'}}>{item.description}</Text>
//              </View>
//             </View>
//           )
//         }}
//         showSkipButton
//         activeDotStyle={{backgroundColor:COLORS.main, width:30}}
//         renderNextButton={()=> buttonLabel("Next")}
//         renderSkipButton={()=> buttonLabel("Skip")}
//         renderDoneButton={()=> startLabel()}
//         onDone={()=>{
//           AsyncStorage.setItem('@viewedOnboading', 'true')
//           setShowHomePage(!showHomePage)
//         }}
//      />
//      </> 
//     );

//   }



// export default SplashScreen