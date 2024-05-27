import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavRoutes } from "../Constants/NavigationRoutes";
import Colors from "../Constants/Colors";
import { Dashboard } from "../screens/Dashboard";
import { AddNewKids } from "../screens/AddNewKids";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import KidDetails from "screens/KidDetails";
import { AddNewHabit } from "screens/AddNewHabit";

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

export const BottomTabs = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={NavRoutes.NAV_DASHBOARD}
      // screenOptions={{ headerShown: false }}
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name={NavRoutes.NAV_DASHBOARD}
        component={Dashboard}
        options={({ navigation }) => ({
          tabBarLabel: "Dashboard",
          headerTitleAlign: "center",
          headerTintColor: Colors.red500,
          contentStyle: styles.contentStyle,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name={NavRoutes.ADD_NEWKID}
        component={AddNewKids}
        options={({ navigation }) => ({
          tabBarLabel: "Kid's Profile",
          title: "Kid's profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerRight: ({}) => (
            <Button
              onPress={() => navigation.navigate(NavRoutes.NAV_DASHBOARD)}
              color={Colors.red500}
            >
              +
            </Button>
          ),
        })}
      />
      <Tab.Screen
        name={NavRoutes.ADD_NEW_HABIT}
        component={AddNewHabit}
        options={({ navigation }) => ({
          tabBarLabel: "Habits",
          headerTitleAlign: "center",
          headerTintColor: Colors.red500,
          contentStyle: styles.contentStyle,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hiking" color={color} size={size} />
          ),
        })}
      />
      {/* <Tab.Screen name="Account" component={AccountScreen} /> */}
    </Tab.Navigator>
    /* 
    <Tab.Navigator
      
     
    >
      <Tab.Screen
        name={NavRoutes.NAV_DASHBOARD}
        component={Dashboard}
        options={({ navigation }) => ({
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate(NavRoutes.NAV_DASHBOARD)}
              color={Colors.red500}
            >
              +
            </Button>
          ),
        })}
      />
      <Tab.Screen
        name={NavRoutes.ADD_NEWKID}
        component={AddNewKids}
        options={({ navigation }) => ({
          tabBarLabel: "Kid's Profile",
          title: "Kid's profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerRight: ({}) => (
            <Button
              onPress={() => navigation.navigate(NavRoutes.NAV_DASHBOARD)}
              color={Colors.red500}
            >
              +
            </Button>
          ),
        })}
      />
    </Tab.Navigator> */
  );
};
