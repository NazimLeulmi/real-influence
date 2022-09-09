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
import Gal from "../assets/gal.jpeg";
import Bg from "../assets/background.jpg";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topbar";
import { InfluencersContext } from "../context/infContext";

const height = Dimensions.get("window").height;
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

const Infleuncers = () => {
  const { influencers } = useContext(InfluencersContext);

  const renderItem = ({ item }) => (
    <Infleuncer
      firstName={item.firstName}
      lastName={item.lastName}
      picture={item.picture}
    />
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
