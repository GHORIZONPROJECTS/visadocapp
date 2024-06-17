import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGE_SENDER_ID, APP_ID, MEASUREMENT_ID} from "@env"


export const firebaseApp = initializeApp({

  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID

});

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});


// const app = initializeApp(firebaseApp);

export const authPass = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);