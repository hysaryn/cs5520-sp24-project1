import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView, ScrollView, FlatList, Image,} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database, auth, storage } from "../firebase-files/firebaseSetup";
import { ref, uploadBytes } from "firebase/storage";
import {writeToDB, deleteFromDB} from "../firebase-files/firebaseHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ImageManager from "./ImageManager";

export default function Home({navigation}) {

  function sendPushNotif() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // in a real life scenario, the push token will be read from users collection in firestore
        to: "ExponentPushToken[youSMxKtL3iDPw0sSbAxmH]",
        title: "Push Notification",
        body: "This is a push notification",
      }),
    });
  }
  
  useEffect(() => {
    //set up a listener to get realtime data from firestore - only after the first render
    const q = query(collection(database, "goals"), where ("owner", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((doc) => {
        //store the data in a new array
        newArray.push({...doc.data(), id: doc.id});
      });
      setGoals(newArray);
    },
    (error) => {
      console.log(error);
    });
    return () => {
      unsubscribe();
    };
    })
      //set the data with the new array
    
  const appName = "My awesome app";
  // const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  async function getImageData(uri) {
    try {
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytes(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (error) {
      console.error(error);
    }
  }

  async function receiveInput(data, imageUri) {
    console.log("We are in home", imageUri);
    let uploadImageUri = "";

    try {
      if (imageUri) {
        console.log("image uri received", imageUri);
        uploadImageUri = await getImageData(imageUri);
      }
    } catch (error) {
      console.error(error);
    }

    let newGoal = {text: data};
    if (uploadImageUri) {
      newGoal = { ...newGoal, imageUri: uploadImageUri };
    }
    setIsModalVisible(false);
    writeToDB(newGoal, "goals");
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  function goalDeleteHandler(deletedId) {
    console.log("delete pressed", deletedId);
    deleteFromDB(deletedId);
  }

  const goalPressHandler = (goalItem) => {
    console.log(goalItem);
    navigation.navigate('Details', {data: goalItem})
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />

        <Header name={appName} version={2} />
        {/* <Button title="Add a goal" onPress={() => setIsModalVisible(true)} /> */}
        
        <PressableButton commonStyle={styles.addButton} onPressFunc={()=> setIsModalVisible(true)}>
          <Text style={{fontSize:20, color: 'purple'}}>Add a Goal</Text>
        </PressableButton>
        <Button title="test push notification" onPress={sendPushNotif} />
        <Input
          inputHandler={receiveInput}
          modalVisible={isModalVisible}
          dismissModal={dismissModal}
        />
      </View>
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContent}
          data={goals}
          renderItem={({ item }) => {
            return (
              <GoalItem 
              goalObj={item} 
              deleteFunction={goalDeleteHandler}
              detailFunction={goalPressHandler} />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        {/* {goals.map((goalObj) => {
            return (
              <View style={styles.textContainer} key={goalObj.id}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })} */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    justifyContent: "center",
  }, 
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  bottomView: { flex: 4, backgroundColor: "lightpink" },
  addButton:{
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 10,
  },
  }
);