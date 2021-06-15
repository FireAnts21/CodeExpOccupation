import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons';

// variable for the whole main stack
const TopStack = createStackNavigator();

// Title screen
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

function setSnoozeMessge (snoozeCount) {
  switch(snoozeCount) {
    case 0:
      return "Just 5 more minutes. Right?";
    case 1:
      return "Ok 10 minutes now";
    case 2:
      return "This is getting ridiculous";
    case 3:
      return "Hey! Time to wake up!";
    case 4:
      return "You're going to be late!";
    case 5:
      return "GET UP!";
    default:
      return "YOU CAN'T SLEEP FOREVER!!!";
  }
}

// screen with the bed and wake up options
function WakeUpScreen({route, navigation}) {
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [isSnoozeVisible, setIsSnoozeVisible] = useState(true);

  function snoozeButtonAlert() {
    Alert.alert(
      "Alarm snoozed",
      setSnoozeMessge(snoozeCount),
      [
        { text: "OK", onPress: () => {
          console.log("OK Pressed");
          setSnoozeCount(snoozeCount + 1);
          if (snoozeCount > 5) {
            setIsSnoozeVisible(false);
          }
        }}
      ]
    );
  }

  function renderTimePastAlarm() {
    if (snoozeCount != 0) {
      return (snoozeCount * 5).toString() + " minutes"
    }
  }

  return (
    <View style={styles.awakenView}>
      <Image style={styles.image} source={require('./assets/images/bed.png')}/>
      <Text>{ renderTimePastAlarm() }</Text>
      <TouchableOpacity style={styles.awakenOptionButton} onPress={() => navigation.navigate("Morning")}>
          <Text style={styles.awakenOptionsTxt}>
            Wake Up!
          </Text>          
        </TouchableOpacity>
        {isSnoozeVisible?
        <TouchableOpacity style={styles.awakenOptionButton} onPress={() => snoozeButtonAlert() }>
          <Text style={styles.awakenOptionsTxt}>
            Hit snooze button
          </Text>          
        </TouchableOpacity>
        :null}
        
    </View>
  );
}

// screen with list of options after the user wakes up
function MorningScreen({navigation}) {
  return (
    <View style={styles.morningView}>
      <Text style={styles.morningQnTxt}>You just woke up. Now what?</Text>
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => navigation.navigate("Intro")}>
        <Text style={styles.morningOptionsTxt}>
          Brush Teeth
        </Text>          
      </TouchableOpacity>
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => navigation.navigate("Intro")}>
        <Text style={styles.morningOptionsTxt}>
          Eat
        </Text>          
      </TouchableOpacity>
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => navigation.navigate("Intro")}>
        <Text style={styles.morningOptionsTxt}>
          Toilet
        </Text>          
      </TouchableOpacity>
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => navigation.navigate("Intro")}>
        <Text style={styles.morningOptionsTxt}>
          Dress up
        </Text>          
      </TouchableOpacity>
            
    </View>
  );
}

// function containing the whole stack
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
        <TopStack.Screen
          name="Morning"
          component={MorningScreen}
          options={{ headerShown: false }}
        />
      </TopStack.Navigator>
    </NavigationContainer>
  );

}

// style sheet
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

  morningQnTxt: {
    fontSize: 20,
    color: 'black'
  },
  morningView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fac457',
  },
  morningOptionButton: {
    backgroundColor: '#fa8e33',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  morningOptionsTxt:{
    fontSize: 20,
    color: '#f4e2e2'
  },

});
