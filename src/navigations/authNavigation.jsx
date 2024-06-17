import LoginScreen from "../screens/loginScreen";
// import RegisterScreen from "../screens/registerScreen";
import ForgotPasswordScreen from "../screens/forgotPasswordScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcomeScreen";
import OnboardingScreen from "../screens/onboardingScreen";
import Signup from "../screens/signup";

// const AuthStack = createStackNavigator();

const AuthStack = createNativeStackNavigator()

const AuthNavigation = () => {

    return (
        // <NavigationContainer>
            <AuthStack.Navigator screenOptions = {{animation : 'simple_push'}}>
                <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{headerShown : false}} />
                <AuthStack.Screen name="Signup" component={Signup} options={{headerShown : false}}/>
                <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown : false}}/>
                {/* <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown : false}}/> */}
                <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown : false}}/>
                <AuthStack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{headerShown : false}}/>
            </AuthStack.Navigator>
        // </NavigationContainer>
       
    )
}

export default AuthNavigation