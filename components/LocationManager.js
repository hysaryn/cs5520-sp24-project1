import { Alert, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { mapsApiKey } from "@env";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  async function verifyPermission() {
      if (status.granted) {
          return true;
      }
      if (status !== 'granted') {
          try {
              const permissionResponse = await requestPermission();
              return permissionResponse.granted;
          } catch (err) {
              console.error(err);
          }
      }
  }

  async function locateUserHandler(){
      try {
          const hasPermission = await verifyPermission();
          if (!hasPermission) {
              Alert.alert("You need to give permission to access location.")
              return;
          }
          const receivedLocation = await Location.getCurrentPositionAsync();
          setLocation({
              latitude: receivedLocation.coords.latitude,
              longitude: receivedLocation.coords.longitude,
          })
      } catch (err) {   
          console.error(err);
      }
  }

  chooseLocationHandler = () => {
    if (location) {
      navigation.navigate('Map', { location: location});
    } else {
      navigation.navigate('Map');
    }
  }

  return (
    <View>
      <Button title="Locate me" onPress={locateUserHandler} />
      {location && (
        <Image 
        style={styles.image}
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
        }}/>
          
      )}
      <Button title="Go to Map" onPress={chooseLocationHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width: Dimensions.get('window').width,
    height: 200,
  }
})