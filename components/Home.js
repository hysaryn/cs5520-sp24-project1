import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView, ScrollView, FlatList,} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../firebase-files/firebaseSetup";

export default function Home({navigation}) {
  const appName = "My awesome app";
  // const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(database);
  function receiveInput(data) {
    const newGoal = { text: data, id: Math.random() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setIsModalVisible(false);
  }
  function dismissModal() {
    setIsModalVisible(false);
  }
  function goalDeleteHandler(deletedId) {
    console.log("delete pressed", deletedId);
    //we need to know which item was clicked? they have unique id
    //use the id to filter the array
    setGoals((currentGoals) => {return currentGoals.filter((goal) => {
      return goal.id !== deletedId;
    });
    });
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