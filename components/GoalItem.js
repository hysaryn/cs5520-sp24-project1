import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteFunction }) {
  function deleteHandler() {
    deleteFunction();
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button color="gray" title="X" onPress={deleteHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    padding: 5,
    borderRadius: 10,
  },
  textContainer: {
    borderRadius: 10,
    backgroundColor: "purple",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});