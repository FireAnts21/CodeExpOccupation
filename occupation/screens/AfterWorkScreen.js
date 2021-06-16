import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default function AfterWorkScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Now that you've come reached home, what would you like to do next?
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Feed fish");
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Feed the fish</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Feed dog");
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Feed the dog</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Watch show");
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Watch a show</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  text: {
    fontSize: 25,
    color: "#033500",
    textAlign: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 10,
    margin: 10,
    width: "40%",
    backgroundColor: "#008080",
    alignContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#93e9be",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
