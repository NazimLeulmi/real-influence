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
import Bg from "../assets/background.jpg";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topbar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bas",
    title: "Gal Gadot",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63ds",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72123",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72d321s",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e213129d72dssd",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29dasd2123",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557sdsa1e29d72d321s",
    title: "Gal Gadot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e213adsadsa129d72dssd",
    title: "Gal Gadot",
  },
];

function Infleuncer({ name }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Influencer");
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
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="influencers" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  bg: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  influencer: {
    alignItems: "center",
    alignSelf: "flex-start",
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
