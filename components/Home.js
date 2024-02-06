import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView, ScrollView, FlatList,} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home({navigation}) {
  const appName = "My awesome app";
  // const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  function receiveInput(data) {
    // console.log("recieve input ", data);
    // setText(data);
    // 1. define a new object {text:.., id:..} and store data in object's text
    // 2. use Math.random() to set the object's id
    const newGoal = { text: data, id: Math.random() };
    // const newArray = [...goals, newGoal];
    // setGoals (newArray)
    // use updater function whenever we are updating state variables based on the current value
    setGoals((currentGoals) => [...currentGoals, newGoal]);

    // 3. how do I add this object to goals array?
    setIsModalVisible(false);
    // use this to update the text showing in the
    // Text component
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

  const goalPressHandler = () => {
    navigation.navigate('GoalDetails')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />

        <Header name={appName} version={2} />
        <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
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
});