import { View, Text } from "react-native";
import React from "react";
import { auth } from "../firebase-files/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

export default function Profile({route}) {
  return (
    <View>
      <Text>{auth.currentUser.uid}</Text>
      <Text>{auth.currentUser.email}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
}