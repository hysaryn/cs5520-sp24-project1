import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Location from 'expo-location';

const locateUserHandler = async () => {
    try {
        const location = await Location.getCurrentPositionAsync();
    } catch (err) {   
        console.error(err);
    }
}

export default function LocationManager() {
  return (
    <View>
      <Text>LocationManager</Text>
    </View>
  )
}

const styles = StyleSheet.create({})