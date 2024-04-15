import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavRoutes } from "../Constants/NavigationRoutes";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";

interface Kid {
  fullName: string;
  id: number;
  age: number;
}

interface KidsListComponentProps {
  kidsList: Kid[];
}

interface ItemProps {
  kid: Kid;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

const KidsListComponent: React.FC<KidsListComponentProps> = ({ kidsList }) => {
  const [selectedId, setSelectedId] = useState<number>();

  const { navigate } = useNavigation();

  const onPressKids = useCallback(
    (itemId: number): void => {
      setSelectedId(itemId);
      navigate(NavRoutes.KID_DETAILS, { id: itemId });
    },
    [navigate]
  );

  const renderItem = ({ item }: { item: Kid }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
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
    <SafeAreaView style={styles.container}>
      <Text>Kids list</Text>
      <FlatList
        data={kidsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default KidsListComponent;
