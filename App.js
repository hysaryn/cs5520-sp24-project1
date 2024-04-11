import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-files/firebaseSetup";
import PressableButton from "./components/PressableButton";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Profile from "./components/Profile";
import Map from "./components/Map";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,  
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notificationResponse) => {
        let data = notificationResponse.notification.request.content.data.url;
        if (data) {
          Linking.openURL(data);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);
  const AuthStack = (
    <>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen
        options={({ navigation }) => {
          return {
            headerTitle: "All My Goals",
            headerRight: () => {
              return (
                <PressableButton
                  onPressFunc={() => {
                    navigation.navigate("Profile");
                  }}
                >
                  <Ionicons name="person" size={24} color="white" />
                </PressableButton>
              );
            },
          };
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <PressableButton
                onPressFunc={() => {
                  try {
                    signOut(auth);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                <AntDesign name="logout" size={24} color="white" />
              </PressableButton>
            );
          },
        }}
      />
      <Stack.Screen
        options={({ route }) => {
          return {
            headerTitle: route.params ? route.params.data.text : "Details",
          };
        }}
        name="Details"
        component={GoalDetails}
      />
      <Stack.Screen name="Map" component={Map} />
    </>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerStyle: { backgroundColor: "#929" },
          headerTintColor: "white",
        }}
      >
        {userLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});