import { FC, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { TextInput, Card, Button } from "react-native-paper";

import Colors from "..//Constants/Colors";
import { addHabit } from "..//utils/database";
import { Habit } from "model/Habit";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    borderColor: Colors.red500,
    borderWidth: 2,
    backgroundColor: "white",
    padding: 4,
    alignContent: "center",
    flexGrow: 1,
  },
  inputFields: {
    flex: 1,
    margin: 10,
    width: 200,
  },
  cardActions: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  cardTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 700,
  },
});

export const AddNewHabit = (): JSX.Element => {
  const [habitName, setHabitName] = useState("");
  const [maxPoints, setMaxPoints] = useState("");

  const handleMaxPoints = (text: string) => {
    if (/^\d*$/.test(text)) {
      setMaxPoints(text);
    }
  };
  const AddNewHabit = () => {
    console.log(habitName);
    console.log(maxPoints);
    // Generate a random number and convert it to base 36 (alphanumeric)
    const randomNumber = Math.random().toString(36).substring(2);
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${randomNumber}`;

    const habit = new Habit(uniqueId, habitName, parseInt(maxPoints));
    console.log("habit " + JSON.stringify(habit));
    addHabit(habit)
      .then((res) => {
        console.log("add new habit ", res);
      })
      .catch((err) => {
        console.log("add habit ", err);
      });
  };
  const cancel = () => {
    setHabitName("");
    setMaxPoints("");
  };
  return (
    <View style={styles.container}>
      <Card style={styles.cardActions}>
        <ScrollView style={styles.scrollViewContainer}>
          <TextInput
            style={styles.inputFields}
            label="Habit name"
            value={habitName}
            onChangeText={(text) => setHabitName(text)}
          />
          <TextInput
            label="Habit Max points"
            value={maxPoints}
            onChangeText={handleMaxPoints}
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="Enter Max points"
            style={[styles.inputFields]}
          />

          <Card.Actions>
            <Button
              onPress={cancel}
              buttonColor={Colors.red500}
              textColor={Colors.primary50}
            >
              Cancel
            </Button>
            <Button onPress={AddNewHabit}>Submitt</Button>
          </Card.Actions>
        </ScrollView>
      </Card>
    </View>
  );
};
