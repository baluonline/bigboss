import React, { useCallback, useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { NavRoutes } from "../Constants/NavigationRoutes";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
} from "react-native";
import { Kid } from "../model/Kid";
import { useSelector } from "react-redux";
import Colors from "Constants/Colors";

interface ItemProps {
  kid: Kid;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const Item: React.FC<ItemProps> = ({
  kid,
  onPress,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{kid.fullName}</Text>
  </TouchableOpacity>
);

const KidsListComponent = () => {
  const [selectedId, setSelectedId] = useState<number>();
  let kids = useSelector((state) => {
    return state.kidsStore.kids || [];
  });
  console.log("kids list component " + JSON.stringify(kids[0]));
  const { navigate } = useNavigation();

  const onPressKids = useCallback(
    (itemId: number): void => {
      setSelectedId(itemId);
      navigate(NavRoutes.KID_DETAILS, { id: itemId });
    },
    [navigate]
  );

  const renderItem = ({ item }: { item: Kid }) => {
    const backgroundColor =
      item.gender === "boy" ? Colors.primary500 : Colors.pink50;
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        kid={item}
        onPress={() => onPressKids(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={kids[0]}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        extraData={selectedId}
      />
    </View>
  );
};

export default KidsListComponent;
