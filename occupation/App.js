import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons';


const TopStack = createStackNavigator();

function TitleScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Occupation!</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("Awaken")}>
          <Text style={styles.startBtnTxt}>
            Let's go! 
            <FontAwesome name="play-circle" size={24} color="black" />
          </Text>          
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function WakeUpScreen({navigation}) {
  const [snoozeCount, setSnoozeCount] = useState();
  
  return (
    <View style={styles.awakenView}>
      <Image style={styles.image} source={require('./assets/images/bed.png')}/>
      <TouchableOpacity style={styles.awakenOptionButton} onPress={() => navigation.navigate("Intro")}>
          <Text style={styles.awakenOptionsTxt}>
            Wake Up!
          </Text>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.awakenOptionButton} onPress={() => navigation.navigate("Intro")}>
          <Text style={styles.awakenOptionsTxt}>
            Hit snooze button
          </Text>          
        </TouchableOpacity>
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <TopStack.Navigator mode="modal" headerMode="none">
        <TopStack.Screen
          name="Intro"
          component={TitleScreen}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="Awaken"
          component={WakeUpScreen}
          options={{ headerShown: false }}
        />
      </TopStack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'lightblue',
  },
  startBtnTxt: {
    fontSize: 24,
  },
  startButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 50,
  },
  awakenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  awakenOptionButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  awakenOptionsTxt:{
    fontSize: 20,
    color: 'white'
  },

});
