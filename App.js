import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "my awesome app"; 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName} version = {2}/>
      <Input />
    </View>
  );
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
