import { View, Text } from "react-native"
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function Toast({show}){

    const [showAnimation, setShowAnimation] = useState(show)

    const closeToast = () => {
        setShowAnimation(!showAnimation)
    }

    return(
       showAnimation && <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
            style={{
                top:70,
                backgroundColor:'#20639B',
                width: "90%",
                borderRadius: 5,
                position:'absolute',
                padding:20,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems : 'center',
                shadowColor: '#003049',
                shadowOpacity:0.4,
                shadowRadius : 2,
                shadowOffset : {width: 0, height:1},
                elevation:2,
            }}
        >
            <Ionicons name="information-circle-sharp" size={30} color="#f6f4f4" />
            <View>
                <Text style={{
                    color:"f6f4f",
                }}>Info</Text>
                <Text>Signed In successfully</Text>
            </View>
            <Pressable onPress={closeToast}>
                <Ionicons name="close" size={30} color="black" />
            </Pressable>
        </Animated.View>

        
    )
}
