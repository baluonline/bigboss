import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";

import Colors from "./Constants/Colors";
import { NavRoutes } from "./Constants/NavigationRoutes";
import { Dashboard } from "./screens/Dashboard";
import { AddNewKids } from "./screens/AddNewKids";
import KidDetails from "./screens/KidDetails";
import { FC, useEffect, useState } from "react";
import { store } from "./store/redux/store";
import { initKidsDb } from "./utils/database";

export type RootStackParamList = {
  Dashboard: undefined;
  AddNewKids: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function initiateTable() {
      const isTableCreated = await initKidsDb();
      console.log("isTableCreated" + isTableCreated);
      if (isTableCreated) {
        setDbInitialized(true);
      } else {
        setDbInitialized(false);
      }
    }
    initiateTable();
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            // headerStyle: { backgroundColor: Colors.pink50 },
            headerBackground: () => (
              <Image
                style={styles.container}
                source={{ uri: "./assets/smartkids_title.png" }}
              />
            ),
            headerTitleAlign: "center",
            headerTintColor: "#d20b0b",
            contentStyle: {
              backgroundColor: "#d20b0b",
              alignContent: "center",
              justifyContent: "center",
            },
          }}
        >
          <Stack.Screen
            name={NavRoutes.NAV_DASHBOARD}
            component={Dashboard}
            options={({ navigation }) => ({
              title: "Dashboard",
              headerRight: ({ tintColor }) => (
                <Button
                  onPress={() => navigation.navigate(NavRoutes.NAV_DASHBOARD)}
                  title="+"
                  color={tintColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name={NavRoutes.ADD_NEWKID}
            component={AddNewKids}
            options={({ navigation }) => ({
              title: "Add New Kid",
              headerRight: ({ tintColor }) => (
                <Button
                  onPress={() => navigation.navigate("Dashboard")}
                  title="+"
                  color={tintColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name={NavRoutes.KID_DETAILS}
            component={KidDetails}
            options={({ navigation }) => ({
              title: "Kid Details",
              headerRight: ({ tintColor }) => (
                <Button
                  onPress={() => navigation.navigate("Dashboard")}
                  title="+"
                  color={tintColor}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
