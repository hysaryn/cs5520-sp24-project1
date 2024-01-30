import { StyleSheet, Text, TextInput, View, Button, Modal, Image } from 'react-native'
import React, { useState } from 'react'

export default function Input({inputHandler, modalVisible, dismissModal}) {
  const [text, setText] = useState("");

  function confirmHandler(){
    inputHandler(text);
    setText("");
  }

  return (
    <Modal visible = {modalVisible}>
      <View style = {styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
          }}
          style={styles.image}/>
        <Image 
          source = {require("../assets/goal.png")}
          style={styles.image} />
        <TextInput 
          placeholder = "Type something"
          style = {styles.input} 
          value = {text} 
          onChangeText = {(text) => setText(text)}
        />
        <View style = {styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <Button title="Cancel" onPress={dismissModal} />
            </View>
          <View style={styles.buttonView}>
            <Button title="Confirm" onPress={confirmHandler} />
          </View>
        </View>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
    buttonView:{
      width: "30%",
      margin:5,
    },

    buttonsContainer:{
      flexDirection: "row"
    },

    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input:{
      borderBottomWidth:2,
      borderBottomColor: "purple",
      width: "50%",
    },

    image: {
      width: 100,
      height: 100
    },

  });