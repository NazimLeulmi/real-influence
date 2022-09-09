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

function Infleuncer({ firstName, lastName, picture }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Influencers", {
      screen: "Influencer",
      initial: false,
    });
  }
  return (
    <TouchableOpacity style={s.influencer} onPress={navigate}>
      <Image source={{ uri: picture }} style={s.img} />
      <Text style={s.name}>
        {firstName} {lastName}
      </Text>
    </TouchableOpacity>
  );
}

const Infleuncers = ({ data, first }) => {
  const renderItem = ({ item }) => (
    <Infleuncer
      firstName={item.firstName}
      lastName={item.lastName}
      picture={item.picture}
    />
  );
  return (
    <View style={s.container}>
      <FlatList
        data={data}
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
    resizeMode: "contain",
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Infleuncers;
