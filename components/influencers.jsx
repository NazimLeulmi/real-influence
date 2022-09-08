import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Gal from "../assets/gal.jpeg";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Gal Gadot",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72ds",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72dssd",
    title: "Gal Gadot",
  },
];

function Infleuncer({ name }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Home", { screen: "Influencer" });
  }

  return (
    <TouchableOpacity style={s.influencer} onPress={navigate}>
      <Image source={Gal} style={s.img} />
      <Text style={s.name}>Gal Gadot</Text>
    </TouchableOpacity>
  );
}

const Infleuncers = () => {
  const renderItem = ({ item }) => <Infleuncer name={item.name} />;
  return (
    <View style={s.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: width,
    height: 155,
    position: "relative",
  },
  influencer: {
    alignItems: "center",
  },
  img: {
    width: width / 3 - 10,
    height: 125,
    margin: 5,
    position: "relative",
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Infleuncers;
