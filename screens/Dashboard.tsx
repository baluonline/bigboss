import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { NavRoutes } from "../Constants/NavigationRoutes";
import Colors from "..//Constants/Colors";
import { Habit } from "..//model/Habit";
import CustomButton from "../UI/Button";
import {
  AddHabit,
  fetchHabit,
  fetchKidList,
  initHabitDb,
} from "..//utils/database";
import KidsListComponent from "./KidsList";
import { addNewKid, deleteKid, loadKidssList } from "../store/redux/kids";

interface IProps {
  imageUrl?: string;
}

export const Dashboard = (): JSX.Element => {
  const [showKidsList, setShowKidsList] = useState(false);
  const dispatch = useDispatch();

  /*   const handleHabit = async () => {
    const habit = new Habit("1", "baa", 1);
    await initHabitDb();
    await AddHabit(habit);
    await fetchHabit();
    
  };

  useEffect(() => {
    handleHabit();
  }, []); */

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const kidsList: any = await fetchKidList();
        console.log("kids fetch kids ", JSON.stringify(kidsList));
        dispatch(loadKidssList({ kidsList }));
        if (kidsList.length > 0) {
          setShowKidsList(true);
        } else {
          setShowKidsList(false);
          throw new Error("No kids");
        }
      } catch (error) {
        console.log("failed to fetch kids " + error);
      }
    };
    fetchData();
    console.log("show kids " + showKidsList);
  }, []);

  const kids = useSelector((state) => state.kidsStore.kids) || [];
  console.log("kids " + JSON.stringify(kids));
  const { navigate } = useNavigation();

  const addNewKid = useCallback(
    () => navigate(NavRoutes.ADD_NEWKID),
    [navigate]
  );

  return (
    <View style={styles.dashboard}>
      {kids.length < 1 ? (
        <Text style={styles.fallBackText}>
          No kids have added, Please add your kids
        </Text>
      ) : (
        <View>
          <Text>Kids List </Text>
          <KidsListComponent kidsList={kids} />
        </View>
      )}
      <View style={styles.btnContainer}>
        <View style={styles.addBtn}>
          <CustomButton onPress={addNewKid} style={styles.addBtn}>
            <Text style={styles.btnText}>Add Your Kid</Text>
          </CustomButton>
        </View>
        <View style={styles.addBtn}>
          <CustomButton onPress={addNewKid} style={styles.addBtn}>
            <Text style={styles.btnText}>Add New Habit</Text>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  fallBackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    fontSize: 30,
  },
  addBtn: {
    // color: "#ca1212",
    flex: 1,
    borderRadius: 10,
    height: "25%",
    // padding: 10,
    margin: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconStyle: {
    color: "#ca1212",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    display: "flex",
    padding: 5,
    margin: 5,
  },
});
