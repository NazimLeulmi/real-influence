import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Bg from "../assets/background.jpg";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topbar";
import { influencers } from "../data";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Infleuncer({ name, img, age }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Influencers", {
      screen: "Influencer",
      params: {
        name: name,
        img: img,
        age: age,
      },
    });
  }
  return (
    <TouchableOpacity style={s.influencer} onPress={navigate}>
      <Image source={img} style={s.img} />
      <Text style={s.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const Infleuncers = () => {
  const renderItem = ({ item }) => (
    <Infleuncer name={item.name} img={item.img} age={item.age} />
  );
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="influencers" />
      <FlatList
        data={influencers}
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
    height: 175,
    margin: 5,
    position: "relative",
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Infleuncers;
