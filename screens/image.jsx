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
const width = Dimensions.get("window").width;
import Animated, {
  ZoomIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TopBar from "../components/topbar";

function ImageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { img } = route.params;
  return (
    <View style={s.container}>
      <TopBar stack title="GALLERY IMAGE" />
      <Animated.Image
        source={{ uri: "http://3.28.21.245/" + img }}
        style={s.img}
        entering={ZoomIn.duration(200).delay(100)}
      />
      <View style={s.btnGroup}>
        <Animated.View entering={FadeInLeft.duration(300)}>
          <TouchableOpacity>
            <Icon size={30} name="heart-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(300).delay(100)}>
          <TouchableOpacity>
            <Icon size={30} name="chat-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(300).delay(200)}>
          <TouchableOpacity>
            <Icon size={30} name="share-variant-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={s.last}
          entering={FadeInRight.duration(300).delay(300)}
        >
          <TouchableOpacity style={s.btn}>
            <Text style={s.btnText}>Favourite</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  img: {
    height: width,
    width: width,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btnGroup: {
    flexDirection: "row",
    alignSelf: "center",
    width: width,
    marginTop: 10,
  },
  icon: {
    color: "rgba(0,0,0,.3)",
    fontWeight: 300,
    marginLeft: 8,
  },
  last: {
    marginLeft: "auto",
    marginRight: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    width: 150,
    borderRadius: 50,
    padding: 4,
  },
  btnText: {
    fontFamily: "light",
    fontSize: 14,
  },
});

export default ImageScreen;