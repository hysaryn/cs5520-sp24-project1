import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';

export default function App() {
  const appName = "my awesome app"; 
  const [text, setText] = useState("");

  //callback function
  function changeTextHandler(changedText){
    console.log("user is typing", changedText);
    setText(changedText);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName} version = {2}/>
      <TextInput 
      placeholder = "Type something"
      style = {styles.input} 
      value = {text} 
      onChangeText = {changeTextHandler}
      />
      <Text> {text} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input:{
    borderBottomWidth:2,
    borderBottomColor: "purple"
  }
});
