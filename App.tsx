import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { store } from "./store/redux/store";
import Colors from "./Constants/Colors";
import { NavRoutes } from "./Constants/NavigationRoutes";
import { BottomTabs } from "./UI/BottomTabs";
import KidDetails from "./screens/KidDetails";
import { Dashboard } from "screens/Dashboard";
import { AddNewHabit } from "screens/AddNewHabit";

export type RootStackParamList = {
  Dashboard: undefined;
  AddNewKids: undefined;
  KidDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Colors,
  },
};
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store} children={undefined}>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={NavRoutes.KID_DETAILS}
              component={KidDetails}
              options={({ navigation }) => ({
                title: "Kid Details",
              })}
            />
            <Stack.Screen
              name={NavRoutes.ADD_NEW_HABIT}
              component={AddNewHabit}
              options={({ navigation }) => ({
                title: "Add New Habit",
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate(NavRoutes.KID_DETAILS)}
                    title="Add New Habit"
                    color={Colors.red500}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red500,
  },
  headerImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
  contentStyle: {
    backgroundColor: Colors.red500,
    justifyContent: "center",
    alignItems: "center",
  },
});
