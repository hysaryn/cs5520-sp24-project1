import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'

export default function NotificationManager() {
    // const [status, requestPermission] = Notifications.usePermissions();

    async function verifyPermission() {
        let permission = await Notifications.getPermissionsAsync();
        if (permission.status !== 'granted') {
            permission = await Notifications.requestPermissionsAsync();
        }
        return permission.granted;

        // if (status.granted) {
        //     return true;
        // }
        // if (status !== 'granted') {
        //     try {
        //         const permissionResponse = await requestPermission();
        //         return permissionResponse.granted;
        //     } catch (err) {
        //         console.error(err);
        //     }
        // }
    }

    async function localNotification(){
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("You need to give permission to send notification.")
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Add a goal",
                    body: "Don't forget to add a goal for today!",
                    data: {url:"https://google.com"}
                },
                trigger: {
                    seconds: 1,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
        <Button 
            title="Remind me to add a goal"
            onPress={localNotification} />
        </View>
  )
}

const styles = StyleSheet.create({})