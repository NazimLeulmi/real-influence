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
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

function Infleuncer({ name, img, bio }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Influencers", {
      screen: "Influencer",
      params: {
        name: name,
        img: img,
        bio: bio,
      },
    });
  }
  return (
    <TouchableOpacity style={s.influencer} onPress={navigate}>
      <Image
        source={{ uri: "http://192.168.0.177:8888/" + img }}
        style={s.img}
        resizeMethod="resize"
      />
      <Text style={s.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const Infleuncers = ({ data }) => {
  const renderItem = ({ item }) => (
    <Infleuncer name={item.name} img={item.profileImg} bio={item.bio} />
  );
  return (
    <View style={s.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: width,
    position: "relative",
  },
  influencer: {
    alignItems: "center",
  },
  img: {
    width: width / 2 - 25,
    height: width / 2 - 25,
    margin: 5,
    position: "relative",
    resizeMode: "cover",
    borderRadius: 8,
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Infleuncers;
