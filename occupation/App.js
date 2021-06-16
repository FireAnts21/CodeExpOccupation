import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons';
import { BrushTeethScreen, ToiletScreen, DressUpScreen, EatBreakfastScreen } from './screens/MorningScreens';

// variable for the whole main stack
const TopStack = createStackNavigator();

// add variables from morning routine affecting other aspects

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
  const [isReadyForWork, setReadyForWork] = useState(false);
  const [isLeaveVisible, setLeaveVisible] = useState(false);

  const [isBrushTeethVisible, setBrushTeethVisible] = useState(true);
  const [isEatVisible, setEatVisible] = useState(true);
  const [isToiletVisible, setToiletVisible] = useState(true);
  const [isDressUpVisible, setDressUpVisible] = useState(true);

  useEffect(() => {
    // Update the document title using the browser API
    checkReadyForWork();
    checkCanLeaveHouse();
  });

  function checkReadyForWork() {
    if (!isBrushTeethVisible 
      || !isToiletVisible
      || !isEatVisible
      || !isDressUpVisible) {
        setLeaveVisible(true);
      }
  }

  function checkCanLeaveHouse() {
    if (!isBrushTeethVisible 
      && !isToiletVisible
      && !isEatVisible
      && !isDressUpVisible) {
        setReadyForWork(true);
      }
  }

  return (
    <View style={styles.morningView}>
      <Text style={styles.morningQnTxt}>{isReadyForWork? "All set for work" : "You just woke up. Now what?"}</Text>
      {isBrushTeethVisible?
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => {
        setBrushTeethVisible(false);
        navigation.navigate("ToothBrush");
        }}>
        <Text style={styles.morningOptionsTxt}>
          Brush Teeth
        </Text>          
      </TouchableOpacity>
      :null}
      {isEatVisible?
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => {
        setEatVisible(false);
        navigation.navigate("Breakfast");
        }}>
        <Text style={styles.morningOptionsTxt}>
          Eat
        </Text>          
      </TouchableOpacity>
      :null}
      {isToiletVisible?
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => {
        setToiletVisible(false);
        navigation.navigate("Toilet");
        }}>
        <Text style={styles.morningOptionsTxt}>
          Toilet
        </Text>          
      </TouchableOpacity>
      :null}
      {isDressUpVisible?
      <TouchableOpacity style={styles.morningOptionButton} onPress={() => {
        setDressUpVisible(false);
        navigation.navigate("DressUp");
        }}>
        <Text style={styles.morningOptionsTxt}>
          Dress up
        </Text>          
      </TouchableOpacity>
      :null}

      {isLeaveVisible?
      <TouchableOpacity style={styles.leaveHouseBtn} onPress={() => {
        navigation.navigate("LeaveHome");
        }}>
        <Text style={styles.morningOptionsTxt}>
          Leave house
        </Text>          
      </TouchableOpacity>
      :null}
            
    </View>
  );
}

function LeaveHouseScreen({ navigation }) {
  return (
  <View style={styles.leaveHomeView}>
    <Text style={styles.leaveHomeTxt}>You left the house</Text>
    <Image style={styles.frontDoorImage} source={require('./assets/images/frontDoor.png')}/>
    <TouchableOpacity style={styles.leaveHomeButton} onPress={() => navigation.navigate('Travelling')}>
      <Text style={styles.leaveHomeOptionsTxt}>
        Travel to work
      </Text>          
    </TouchableOpacity>
  </View>
  );
}


function TravelDetailsScreen({ navigation, route }) {
  const { travelImageLink, Description } = route.params;

  return (
    <View style={styles.travelDetailsView}>
      <Text style={styles.travelDetailTxt1}>Mode of transport chosen:</Text>
      <Text style={styles.travelDetailDescriptionTxt}>{Description}</Text>
      <Image style={styles.travelDetailImage} source={{ uri: travelImageLink}} />
      <TouchableOpacity style={styles.toOfficeBtn} onPress={() => navigation.navigate('OfficeDesk')}>
        <Text style={styles.toOfficeTxt}>
          Continue into Office
        </Text>          
      </TouchableOpacity>
    </View>
  );
}

function TravelSelectionScene({ navigation }) {

  const TravelOptions = [
    {
      OptionText: 'Walk',
      travelImageLink:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2s46gtrFDR29T9afG2imcLE2wel7jtK8UVg&usqp=CAU',
      Description: "You even stop to smell the roses",
      id: 1,
    },
    {
      OptionText: 'Run',
      travelImageLink:'https://www.stockvault.net/data/2018/07/17/253138/preview16.jpg',
      Description: "Even travelling to work is a workout for you",
      id: 2,
    },
    {
      OptionText: 'Cycle',
      travelImageLink:'https://mopirg.org/sites/pirg/files/46368744211_57f61cd627_o.jpg',
      Description: "You choose the environmental option",
      id: 3,
    },
    {
      OptionText: 'Skate',
      travelImageLink:'https://live.staticflickr.com/3120/5715025524_777dec59ca_b.jpg',
      Description: "She was a s8r boi she said see you l8r boi",
      id: 4,
    },
    {
      OptionText: 'Train',
      travelImageLink:'https://upload.wikimedia.org/wikipedia/commons/9/97/MRT_in_Singapore.jpg',
      Description: "Please mind the gap",
      id: 5,
    },
    {
      OptionText: 'Bus',
      travelImageLink:'https://static.straitstimes.com.sg/s3fs-public/articles/2019/02/13/wc-bus-1302.jpg',
      Description: "Hopefully you've got a seat for the ride",
      id: 6,
    },
    {
      OptionText: 'Car',
      travelImageLink:'https://live.staticflickr.com/3201/2454925189_c1af72cc94_c.jpg',
      Description: "Cause exercise and the environment is overrate anyway. Right?",
      id: 7,
    },
    {
      OptionText: 'Chauffeur',
      travelImageLink:'https://live.staticflickr.com/54/124346198_aa0a2afaf6.jpg',
      Description: "Way to flex on everyone :P",
      id: 8,
    },
  ]

  // note the parameter has to be called item lol
  function renderItem({ item }) {
    return (
      <View style={styles.travelItem}>
      <TouchableOpacity style={styles.travelButton} onPress={() => navigation.navigate('TravelDetails', {...item })}>
        <Text style={styles.travelOptionText}>
          {item .OptionText}
        </Text>          
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.travelOptionsView}>
      <Text style={styles.travelQn}>How do you plan to travel to work?</Text>
      <FlatList
        style={{ width: "100%" }}
        data={TravelOptions}
        renderItem={renderItem}
      />
    </View>
  )
}

function OfficeTasksScreen({ navigation, route }) {
  const { travelImageLink, Description } = route.params;

  return (
    <View style={styles.officeDetailsView}>
      <Text style={styles.officeDetailTxt1}>Office activity choosen:</Text>
      <Text style={styles.officeDetailDescriptionTxt}>{Description}</Text>
      <Image style={styles.officeDetailImage} source={{ uri: travelImageLink}} />
      <TouchableOpacity style={styles.toDeskBtn} onPress={() => navigation.navigate('OfficeDesk')}>
        <Text style={styles.toDeskTxt}>
          Back to desk
        </Text>          
      </TouchableOpacity>
    </View>
  );
}

function OfficeDeskScreen({ navigation }) {

  const [tasksDone, setTasksDone] = useState(0);

  const TravelOptions = [
    {
      OptionText: 'Check Emails',
      travelImageLink:'',
      Description: "Your email is full of spam as usual. You delete all.",
      id: 1,
    },
    {
      OptionText: 'Coffee Break',
      travelImageLink:'',
      Description: "Time for more coffee!",
      id: 2,
    },
    {
      OptionText: 'Snack',
      travelImageLink:'',
      Description: "These chips aren't going to eat themselves anyways.",
      id: 3,
    },
    {
      OptionText: 'Chat with coworker',
      travelImageLink:'',
      Description: "That dog is cute but we've already seen a thousand pictures of it.",
      id: 4,
    },
    {
      OptionText: 'Meeting',
      travelImageLink:'',
      Description: "This could honestly have been an email.",
      id: 5,
    },
    {
      OptionText: 'Napping',
      travelImageLink:'',
      Description: "Just a little shut eye won't hurt right?",
      id: 6,
    },
    {
      OptionText: 'Phone Game',
      travelImageLink:'',
      Description: "Work was too boring anyways",
      id: 7,
    },
    {
      OptionText: 'Toilet',
      travelImageLink:'',
      Description: "Boss gets a dollar, we get a dime, that's why we poop on company time XD",
      id: 8,
    },
  ]

  // note the parameter has to be called item lol
  function renderItem({ item }) {
    return (
      <View style={styles.officeItem}>
      <TouchableOpacity style={styles.officeButton} onPress={() => {
        navigation.navigate('OfficeTasks', {...item });
        setTasksDone(tasksDone + 1);
        }}>
        <Text style={styles.officeOptionText}>
          {item .OptionText}
        </Text>          
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.officeOptionsView}>
      <Text style={styles.officeQn}>What to do at work?</Text>
      <FlatList
        style={{ width: "100%" }}
        data={TravelOptions}
        renderItem={renderItem}
      />
    </View>
  )
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
        <TopStack.Screen
          name="ToothBrush"
          component={BrushTeethScreen}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="Breakfast"
          component={EatBreakfastScreen}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="Toilet"
          component={ToiletScreen}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="DressUp"
          component={DressUpScreen}
          options={{ headerShown: false }}
        />
        
        <TopStack.Screen
          name="LeaveHome"
          component={LeaveHouseScreen}
          options={{ headerShown: false }}
        />

        <TopStack.Screen
          name="Travelling"
          component={TravelSelectionScene}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="TravelDetails"
          component={TravelDetailsScreen}
          options={{ headerShown: false }}
        />

        <TopStack.Screen
          name="OfficeDesk"
          component={OfficeDeskScreen}
          options={{ headerShown: false }}
        />
        <TopStack.Screen
          name="OfficeTasks"
          component={OfficeTasksScreen}
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

  leaveHouseBtn:{
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },


  leaveHomeTxt: {
    fontSize: 40,
    color: '#3c1361'
  },
  leaveHomeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#Af77d5',
  },
  leaveHomeButton: {
    backgroundColor: '#52307c',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  leaveHomeOptionsTxt:{
    fontSize: 20,
    color: '#bca0dc'
  },
  frontDoorImage: {
    width: 200,
    height: 200,
    margin: 10,
  },

  travelItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelOptionsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efc3e6',
  },
  travelQn: {
    fontSize: 20,
    color: 'black'
  },
  travelListItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#efc3e6",
    paddingLeft: 20,
  },
  travelButton: {
    backgroundColor: '#9C89B8',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  travelOptionText: {
    fontSize: 20,
    color: 'white'
    
  },

  travelDetailsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  travelDetailTxt1:{
    fontSize: 15,
  },
  travelDetailDescriptionTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F0E6EF',
    textAlign: 'center',
    backgroundColor: '#9C89B8',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
  travelDetailImage:{
    width: 200,
    height: 200,
    margin: 10,
  },
  toOfficeBtn: {
    backgroundColor: '#f0a6ca',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  toOfficeTxt:{
    fontSize: 20,
    color: 'white'
  },


  ///

  officeItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  officeOptionsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E9DC',
  },
  officeQn: {
    fontSize: 20,
    color: 'black'
  },
  officeListItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3E9DC",
    paddingLeft: 20,
  },
  officeButton: {
    backgroundColor: '#895737',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  officeOptionText: {
    fontSize: 20,
    color: 'white'
    
  },

  officeDetailsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E9DC',
  },
  officeDetailTxt1:{
    fontSize: 15,
  },
  officeDetailDescriptionTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F0E6EF',
    textAlign: 'center',
    backgroundColor: '#C08552',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
  officeDetailImage:{
    width: 200,
    height: 200,
    margin: 10,
  },
  toDeskBtn: {
    backgroundColor: '#895737',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  toDeskTxt:{
    fontSize: 20,
    color: 'white'
  },

});

