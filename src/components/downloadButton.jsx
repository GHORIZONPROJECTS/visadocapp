import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export default function DownloadButton({title, onPress}) {

  
    async function downloadDoc(url) {
    
          var filename = url.substring(url.lastIndexOf('/')+1, url.length);
          const result = await FileSystem.downloadAsync(
          url, FileSystem.documentDirectory + filename
    
        );
      
        // Log the download result
        console.log(result);
      
        // Save the downloaded file
        saveFile(result.uri, filename, result.headers["Content-Type"]);
      }
    
  
    
    async function saveFile(uri, filename, mimetype) {
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, "application/pdf")
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch(e => console.log(e));
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    }
    
    
  return (
    <View style={styles.container}>
        <Button title={title} onPress = {onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({})