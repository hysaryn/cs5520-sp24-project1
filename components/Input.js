import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function Input() {
  const [text, setText] = useState("");

  //callback function
  function changeTextHandler(changedText){
    console.log("user is typing", changedText);
    setText(changedText);
    }

  return (
    <TextInput 
    placeholder = "Type something"
    style = {styles.input} 
    value = {text} 
    onChangeText = {changeTextHandler}
    />
  )
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