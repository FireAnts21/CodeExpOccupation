import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { color } from "react-native-reanimated";

export default function FeedFishScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bloop! Bloop!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Do something else!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("End");
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Go to sleep</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1520A6",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#b0deff",
    paddingBottom: 10,
  },
  buttonContainer: {
    padding: 10,
    margin: 10,
    width: "45%",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#9bc4e2",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00004d",
  },
});
