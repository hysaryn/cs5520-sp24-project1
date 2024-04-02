import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GoalUsers from "./GoalUsers";
import { storage } from "../firebase-files/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWatning] = useState(false);
  const [imageURL, setImageURL] = useState("");
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

  useEffect(() => {
    async function getImageURL() {
      if (route.params.data){
        const imageUri = route.params.data.imageUri;
        const imageRef = ref(storage, imageUri);
        const imageDownloadURL = await getDownloadURL(imageRef);
        setImageURL(imageDownloadURL);
      }
    }
    getImageURL();
  },[]);

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
      {imageURL && (
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
        />
      )}
      {warning && <Text style={{ color: "red" }}>WARNING</Text>}
      <Button
        title="extra details"
        onPress={() => navigation.push("Details", { data: route.params.data })}
      />
      <GoalUsers id={route.params.data.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },  
});