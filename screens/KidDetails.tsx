import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchKidDetails } from "./../utils/database";
import { Kid } from "..//model/Kid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    fontSize: 32,
    color: "white",
  },
});

const KidDetails: React.FC = () => {
  const route = useRoute();
  const [kidDetails, setKidDetails] = useState([Kid]);
  const { id } = route.params as { id: number };

  useEffect(() => {
    const fetchKid = async (id: number) => {
      const selectedKidDetail = await fetchKidDetails(id);
      console.log("kid Deatils " + JSON.stringify(selectedKidDetail));
      setKidDetails(selectedKidDetail[0]);
    };
    fetchKid(id);
    return () => {
      setKidDetails([]);
    };
  }, [id]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> {kidDetails.fullName}'s Points</Text>
      </View>
    </View>
  );
};

export default KidDetails;
