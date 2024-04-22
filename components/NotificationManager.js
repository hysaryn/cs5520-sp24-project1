import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'

export async function verifyPermission() {
    try {
      const status = await Notifications.getPermissionsAsync();
      if (status.granted) {
        return true;
      }
  
      const permissionResponse = await Notifications.requestPermissionsAsync();
      return permissionResponse.granted;
    } catch (err) {
      console.log(err);
    }
  }

export default function NotificationManager() {
    // const [status, requestPermission] = Notifications.usePermissions();

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