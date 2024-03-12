import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWatning] = useState(false);
  function warningHandler() {
    console.log("warning");
    setWatning(true);
  }
  // functions inside useEffect are called after the rendering
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Warning" color="gray" onPress={warningHandler} />;
      },
    });
  }, []);

  return (
    <View>
      {route.params ? (
        <Text>
          You are viewing details of {route.params.data.text} with id{" "}
          {route.params.data.id}
        </Text>
      ) : (
        <Text> "Extra details"</Text>
      )}
      {warning && <Text style={{ color: "red" }}>WARNING</Text>}
      <Button
        title="extra details"
        onPress={() => navigation.push("Details")}
      />
      <GoalUsers id={route.params.data.id} />
    </View>
  );
}

const styles = StyleSheet.create({});