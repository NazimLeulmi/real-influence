import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import Animated, { ZoomInUp } from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function ImageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { img } = route.params;
  return (
    <View style={s.container}>
      <Animated.Image
        source={{ uri: "https://realinfluence.io/" + img }}
        style={s.img}
        entering={ZoomInUp.duration(700)}
      />
      <View style={s.btnGroup}>
        <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} />
          <Text style={s.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, { backgroundColor: "#FFD700" }]}>
          <Icon name="heart" size={22} />
          <Text style={s.btnText}>LIKE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  img: {
    height: height / 1.3,
    resizeMode: "cover",
    margin: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btnGroup: {
    flexDirection: "row",
    width: width - 20,
    alignSelf: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default ImageScreen;
