import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";

export default function GoalItem({ goalObj, deleteFunction, detailFunction }) {
  function deleteHandler() {
    deleteFunction(goalObj.id);
  }
  function goalPressHandler() {
    detailFunction(goalObj);
  }
  return (
    <Pressable 
      style={({pressed})=> [styles.textContainer,pressed && styles.pressed]}
      onPress={goalPressHandler} andriod_ripple={{color:'#e9e'}}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <PressableButton onPressFunc={deleteHandler}>
        <Text style={{fontSize:15}}>X</Text>
      </PressableButton>
      {/* <Button color="black" title="X" onPress={deleteHandler} /> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },

  text: {
    textAlign: "center",
    fontSize: 30,
    color: "#929",
    padding: 5,
    borderRadius: 10,
  },
  textContainer: {
    borderRadius: 10,
    backgroundColor: "#aaa",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});