import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { fetchKidDetails } from "./../utils/database";
import { Kid } from "..//model/Kid";
import Colors from "Constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 32,
    color: Colors.red500,
  },
});

const KidDetails: React.FC = () => {
  const route = useRoute();
  const [kidDetails, setKidDetails] = useState([Kid]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      console.log("kid id: " + route.params?.id);
      const id = route.params?.id;
      const fetchKid = async (id: number) => {
        const selectedKidDetail: any = await fetchKidDetails(id);
        // console.log("kid Deatils " + JSON.stringify(selectedKidDetail));
        setKidDetails(selectedKidDetail[0]);
      };
      fetchKid(id);
    }
  }, [isFocused, route]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{kidDetails.fullName}</Text>
        <Text style={styles.title}>{kidDetails.favoriteFood}</Text>
        <Text style={styles.title}>{kidDetails.age}</Text>
      </View>
    </View>
  );
};

export default KidDetails;
