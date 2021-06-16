import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default function FeedDogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Woof! Woof!</Text>
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
    backgroundColor: "#fed8b1",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#622a0f",
  },
  buttonContainer: {
    padding: 10,
    margin: 10,
    width: "45%",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#b37a4c",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffdebd",
  },
});
