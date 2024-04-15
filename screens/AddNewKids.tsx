import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from "react-native-elements";

import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native";
import Colors from "..//Constants/Colors";
import { Kid } from "..//model/Kid";
import { addNewKid, fetchKidList, initKidsDb } from "..//utils/database";
import CustomButton from "../UI/Button";

interface IProps {
  placeId?: string;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    borderColor: Colors.red500,
    borderWidth: 2,
    backgroundColor: "white",
    padding: 4,
    marginLeft: 5,
    alignContent: "center",
    flex: 1,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    height: 40,
    margin: 12,
  },
  fullName: {
    width: "80%",
  },
  age: {
    marginTop: 10,
    padding: 4,
    width: 150,
  },
  gender: {
    marginTop: 10,
    padding: 4,
    width: 150,
  },
  zipcode: {
    marginTop: 10,
    padding: 4,
    width: 150,
  },
  emailAddress: {
    marginTop: 10,
    padding: 4,
    width: "80%",
  },
  favoriteFood: {
    marginTop: 10,
    padding: 4,
    width: "80%",
  },
  registerBtnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerBtn: {
    flex: 1,
    flexDirection: "row",
    padding: 50,
    margin: 15,
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: 25,
    fontWeight: "700",
  },
});

export const AddNewKids: FC<IProps> = () => {
  const [kidName, setKidName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [kidObject, setKidObject] = useState({});

  const validateEmail = (email: string) => {
    console.log("email" + email);
    let regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    initKidsDb();
  }, []);

  const onsubmit = async () => {
    const isValidEmail = validateEmail(email);
    console.log("on Submit :" + isValidEmail + "email " + email);
    if (isValidEmail) {
      // Generate a random number and convert it to base 36 (alphanumeric)
      const randomNumber = Math.random().toString(36).substring(2);
      // Get the current timestamp in milliseconds
      const timestamp = new Date().getTime();
      // Concatenate the timestamp and random number to create the ID
      const uniqueId = `${timestamp}-${randomNumber}`;

      const newKid = new Kid(
        uniqueId,
        kidName,
        email,
        Number(age),
        gender,
        Number(zipcode)
      );

      const newKidResponse = await addNewKid(newKid);
      console.log("newKid response " + JSON.stringify(newKidResponse));
      console.log("newKid data " + JSON.stringify(newKid));
      await fetchKidList();
      alert("Valid Email");
    } else {
      alert("Invalid email");
    }
  };
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TextInput
          style={[styles.fullName, styles.input]}
          placeholder="First Name, Last Name"
          onChangeText={(value) => setKidName(value)}
          value={kidName}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={40}
        />
        <TextInput
          style={[styles.emailAddress, styles.input]}
          placeholder="Parent's Email Address"
          value={email}
          textContentType="emailAddress"
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View>
          <View>
            <TextInput
              style={[styles.age, styles.input]}
              placeholder="Age"
              value={age}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => setAge(value)}
            />
            <TextInput
              style={[styles.gender, styles.input]}
              placeholder="Gender"
              value={gender}
              onChangeText={(value) => setGender(value)}
            />

            <TextInput
              placeholder="Enter Your Zipcode"
              keyboardType="numeric"
              onChangeText={(zip) => setZipcode(zip)}
              value={zipcode}
              maxLength={5}
              style={[styles.zipcode, styles.input]}
            />
            <TextInput
              style={[styles.favoriteFood, styles.input]}
              placeholder="Your kid's favorite food"
              value={favoriteFood}
              onChangeText={(value) => setFavoriteFood(value)}
            />
          </View>
          <View></View>
        </View>

        <View style={styles.registerBtnContainer}>
          {/* <Button
            title="Register"
            color={Colors.red500}
            onPress={onsubmit}
          ></Button> */}
          <CustomButton onPress={onsubmit} style={styles.registerBtn}>
            <Text style={styles.btnTitle}>Register</Text>
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};
