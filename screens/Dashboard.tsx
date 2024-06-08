import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomNavigation, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { NavRoutes } from "../Constants/NavigationRoutes";
import {
  addHabit,
  fetchHabit,
  fetchKidList,
  initHabitDb,
  initKidsDb,
  isTableExists,
} from "../utils/database";
import { loadKidsList } from "../store/redux/kids";
import { Habit } from "model/Habit";
import KidsListComponent from "./KidsList";
import Colors from "Constants/Colors";
import { BottomTabs } from "../UI/BottomTabs";
import * as _ from "lodash";

export const Dashboard = (): JSX.Element => {
  const [showKidsList, setShowKidsList] = useState(true);
  const dispatch = useDispatch();
  const kids = useSelector((state: any) => {
    console.log("kids store " + JSON.stringify(state));
    return state.kidsStore.kids || [];
  });
  const navigation = useNavigation(); // Use useNavigation directly
  const fetchData = () => {
    try {
      var kidsList;
      fetchKidList()
        .then((result) => {
          // console.log("kidsList " + JSON.stringify(result));
          dispatch(loadKidsList(result));
          kidsList = { ...result };
          setShowKidsList(result.length > 0);
        })
        .catch((err) => {
          console.log("kids list  fetching" + err);
        });
    } catch (error) {
      console.log("fetch kids try catch block " + error);
    }
  };

  useEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        initKidsDb();
        fetchData();
      });
      return () => unsubscribe();
    }, [navigation])
  );

  useEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        let habitsTableExisted = false;
        isTableExists("Habits")
          .then(() => {
            console.log("Habit table is already existed");
            return;
          })
          .catch((err) => {
            habitsTableExisted = true;
          });

        initHabitDb()
          .then((result) => {
            console.log("initiated Habits db");
          })
          .catch((err) => {
            console.log("Habit DB is not created", err);
          });
      });
      return () => unsubscribe();
    }, [navigation])
  );

  const onPressAddNewKid = useCallback(
    () => navigation.navigate(NavRoutes.ADD_NEWKID), // Use navigation.navigate
    [navigation]
  );

  const onClickAddNewHabit = useCallback(
    () => navigation.navigate(NavRoutes.ADD_NEW_HABIT), // Use navigation.navigate
    [navigation]
  );

  return (
    <View style={styles.dashboard}>
      {showKidsList ? (
        <View>
          {/* <Text style={{ alignItems: "center" }}>Babu</Text> */}
          <KidsListComponent />
        </View>
      ) : (
        <Text style={styles.fallBackText}>
          No kids have been added. Please add your kids.
        </Text>
      )}

      <View style={styles.btnContainer}>
        <Button
          style={styles.addBtn}
          mode="contained-tonal"
          onPress={onPressAddNewKid}
          buttonColor={Colors.red500}
          textColor={Colors.tertiary}
        >
          Add Your Kid
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "none",
  },
  fallBackText: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  addBtn: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    padding: 5,
    margin: 5,
  },
});
