import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({receiveImageUri}) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState(null);
    async function verifyPermission () { 
        if (status !== 'granted') {
            try {
                const permissionResponse = requestPermission();
            } catch (err) {
                console.error(err);
            }
            return status.granted;
        }
        return true;
    }
    const takeImageHandler = async () => {
        try {
            const hasPermission = await verifyPermission();
            console.log(hasPermission);
            if (!hasPermission) {
                Alert.alert('Permission required', 'You need to grant camera permission to use this feature', [{text: 'Okay'}]);
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
              });
            
            setImageUri(result.assets[0].uri);
            receiveImageUri(imageUri);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View>
        <Button
            title="Upload Image" 
            onPress={takeImageHandler} />
        </View>
  )
}

const styles = StyleSheet.create({
})