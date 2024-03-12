import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-files/firebaseSetup";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.navigate("Login");
  };
  const signupHandler = async () => {
    if(!email || !password || !confirmPassword){
      Alert.alert("Error", "All fields are required");
      return;
    }
    if(password !== confirmPassword){
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
        const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
            );
            console.log(userCred);
    } catch (error) {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
            Alert.alert("Error", "Email already signed up");
        } else if (error.code == "auth/weak-password") {
            Alert.alert("Error", "Password is too weak");
        }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});