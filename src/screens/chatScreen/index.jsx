import React, { useCallback, useState, useLayoutEffect, useContext } from 'react';
// import { Avatar } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { StyleSheet, Text, View, StatusBar, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES, COLORS } from '../../constants/theme'
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import {AuthContext} from '../../config/AuthContext'
import Notification from '../../components/notification';

const ChatScreen = ({ navigation }) => {

    const {user} = useContext(AuthContext)

    const userId = user.uid

    const [messages, setMessages] = useState([]);

    const signOutNow = () => {
        signOut(auth).then(() => {
            navigation.replace('Login');
        }).catch((error) => {
        });
    }

    useLayoutEffect(() => {

        const colletionRef = collection(db, 'chats');
        const q = query(colletionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => unsubscribe();

    }, []);

    const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user} = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });

    }, []);

    return (
        <View style={{width:'100%', height:'100%', backgroundColor:'white'}}>

        <View style={{width:SIZES.width, height:60, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'space-around', flexDirection:'row', marginTop:30}}> 
        <Pressable onPress={() =>navigation.navigate('ProfileScreen')}>
        <Ionicons name="ios-person-outline" size={24} color="white"  /> 
        </Pressable>  
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width: 200}}>
            <Text style={{fontSize:16, color:COLORS.white}}>Chat with Support</Text>
        </View>
      
    
      <Notification onPress={() => (navigation.navigate('NotificationScreen'))}/>
        
      
      </View>   

        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
        <View style={{width:'100%', height:30}}></View>

        </View>
       
        
    );
}

export default ChatScreen;