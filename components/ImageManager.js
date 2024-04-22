import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({receiveImageUri}) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
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
                Alert.alert('Permission required', 'You need to grant camera permission to use this feature');
                return;
            }
            const results = await ImagePicker.launchCameraAsync();
            
            receiveImageUri(results.assets[0].uri);
            setImageUri(results.assets[0].uri);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style ={styles.container}>
            <Button
                title="Upload Image" 
                onPress={takeImageHandler} />
            {imageUri && (
                <Image 
                    style={styles.image}
                    source={{uri: imageUri}} />
            )}
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },

    image: {
        width: 100,
        height: 100,
    },
})