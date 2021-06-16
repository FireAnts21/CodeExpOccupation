import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EndScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.completionText}>Day Completed YAY!</Text>
      <MaterialIcons name="celebration" size={60} color="#ffc66b" />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Intro");
        }}
        style={styles.restartButton}
      >
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b9b2dc",
  },
  completionText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  restartButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fee3b8",
    alignItems: "center",
    borderRadius: 10,
  },
  restartButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C376B",
  },
});
