import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView} from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import React, { useState } from 'react';

export default function App() {
  const appName = "my awesome app";
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  function receiveInput(data){
    console.log("receive input", data);
    setText(data);
    setIsModalVisible(false);
  }
  function dismissModal(){
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name = {appName} version = {2}/>
        <Button title="Add a goal" onPress={() => setIsModalVisible(true)}/>
        <Input 
          inputHandler={receiveInput} 
          modalVisible={isModalVisible} 
          dismissModal={dismissModal}/>
      </View>
      <View style={styles.bottomView}>
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: 'center',
    justifyContent: 'center',
  },

  topView:{
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  bottomView:{
    flex:4,
    backgroundColor: "lightpink",
    alignItems:"center",
  },

  text:{
    textAlign: "center",
  },
});
