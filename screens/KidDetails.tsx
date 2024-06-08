import React, {
  JSXElementConstructor,
  ReactElement,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { fetchKidDetails, fetchHabits } from "./../utils/database";
import { Kid } from "..//model/Kid";
import Colors from "../Constants/Colors";
import { loadHabitsList } from "../store/redux/kids";
import { Button } from "react-native-paper";
import { Habit } from "model/Habit";
import _ from "lodash";

interface ItemProps {
  Habit: Habit;
  backgroundColor: string;
  textColor: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 32,
    color: Colors.red500,
    margin: 5,
    padding: 10,
  },
  habitsListContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 10,
    margin: 5,
  },
  habitItem: {
    flex: 1,
    flexDirection: "row",
  },
  habitTitle: {
    marginTop: -1,
  },
  habitIncrement: {
    marginTop: -1,
    marginHorizontal: 5,
  },
});

const KidDetails: React.FC = () => {
  const route = useRoute();
  const [kidDetails, setKidDetails] = useState<Kid | null>(null);
  const [localHabits, setLocalHabits] = useState<Habit[]>([]);
  const [habitsToDisplay, setHabitsToDisplay] = useState<Habit[]>([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const habits: any = useSelector((state: any) => {
    return state.kidsStore.habits || [];
  });
  const Item: React.FC<ItemProps> = ({ Habit, backgroundColor, textColor }) => (
    <TouchableOpacity style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{Habit.name}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    if (isFocused && route.params) {
      console.log("kid id: " + route.params?.id);
      const id = route.params?.id;
      const fetchKid = async (id: number) => {
        const selectedKidDetail: any = await fetchKidDetails(id);
        // console.log("kid Deatils " + JSON.stringify(selectedKidDetail));
        setKidDetails(selectedKidDetail[0]);
      };
      const fetchHabitsList = async () => {
        const habits: any = await fetchHabits();
        dispatch(loadHabitsList(habits));
        setLocalHabits(habits);
      };
      fetchKid(id);
      fetchHabitsList();
    }
  }, [isFocused, route]);

  useEffect(() => {
    const kidHabits = kidDetails?.habits || [];
    const _localHabits = localHabits;
    const consolidatedHabits = _.unionBy([...kidHabits, ..._localHabits], "id");
    setHabitsToDisplay(consolidatedHabits);
    console.log("consolidatedHabits", JSON.stringify(consolidatedHabits));
  }, [kidDetails, localHabits]);

  const _onPress = (item: Habit, operation: string) => {
    setLocalHabits((prevHabits: Habit[]) => {
      let updatedHabits: any = [];
      console.log("prev habits ", prevHabits, "length ", prevHabits.length);
      if (prevHabits.length < 2) {
        prevHabits[0].points =
          operation === "plus"
            ? prevHabits[0].points + 1
            : prevHabits[0].points - 1;
        return prevHabits;
      } else {
        updatedHabits = prevHabits.map((habit: Habit) =>
          habit.name === item.name
            ? {
                ...habit,
                points:
                  operation === "plus" ? habit.points + 1 : habit.points - 1,
              }
            : habit
        );
        console.log("Updated habits: ", updatedHabits);
      }
      return updatedHabits;
    });
    console.log("Current KidDetails: ", JSON.stringify(kidDetails));
    // Update kidDetails
    setKidDetails((prevKidDetails: Kid) => {
      if (!prevKidDetails) return prevKidDetails;

      const updatedHabits = (prevKidDetails.habits || []).map((habit: Habit) =>
        habit.name === item.name
          ? {
              ...habit,
              points:
                operation === "plus" ? habit.points + 1 : habit.points - 1,
            }
          : habit
      );

      const updatedKidDetails = {
        ...prevKidDetails,
        habits: updatedHabits.length > 0 ? updatedHabits : localHabits,
      };

      console.log("Updated kidDetails: ", updatedKidDetails);
      return updatedKidDetails;
    });
  };
  const _renderItem = ({ item }: ListRenderItemInfo<Habit>) => (
    <TouchableOpacity>
      <View style={styles.habitItem}>
        <Button
          style={styles.habitIncrement}
          textColor="white"
          buttonColor={Colors.red500}
          onPress={() => _onPress(item, "minus")}
        >
          -
        </Button>
        <Text style={styles.habitTitle}>{item.name}</Text>
        <Button
          style={styles.habitIncrement}
          buttonColor={Colors.primary700}
          onPress={() => _onPress(item, "plus")}
          textColor="white"
        >
          +
        </Button>
        <Text>{item.points}</Text>
      </View>
    </TouchableOpacity>
  );
  const habitId = (habit: Habit) => habit.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{kidDetails?.fullName} 's Habits</Text>
      <View style={styles.habitsListContainer}>
        <FlatList
          data={habitsToDisplay}
          renderItem={_renderItem}
          keyExtractor={(item: any) => {
            return item.id.toString();
          }}
          extraData={habitId}
        />
      </View>
    </View>
  );
};

export default KidDetails;
