import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Bg from "../assets/background.jpg";
import Logo from "../assets/logo.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { ZoomIn, FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Model from "../assets/model.jpg";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Intro() {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);

  function start() {
    navigation.navigate("Auth", { screen: "SignIn" });
  }

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView style={s.scroll}>
        <View style={s.hero}>
          <Image
            source={Model}
            style={s.img}
            onLoad={() => setLoading(false)}
          />
          {loading === false && (
            <>
              <Animated.Image
                source={Logo}
                style={s.logo}
                entering={ZoomIn.duration(650)}
              />
              <Animated.Text entering={FadeIn.duration(650)} style={s.brand}>
                Miss Influencer
              </Animated.Text>
            </>
          )}
        </View>
        <Animated.Text style={s.text} entering={FadeIn.duration(1500)}>
          Our primary vision of Miss Influencer is to support and strengthen
          those talented individuals who are ready to use their social media
          platforms to create value, generate meaningful engagement and build a
          community by empowering each other.
        </Animated.Text>
        <Animated.View entering={FadeIn.duration(1500)}>
          <TouchableOpacity style={s.btn} onPress={start}>
            <Text style={s.btnText}>Continue</Text>
            <Icon name="arrow-right" size={30} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

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
  scroll: {
    padding: 15,
    position: "relative",
  },
  hero: {
    width: width - 30,
    minHeight: height / 1.7,
    flex: 1,
    alignSelf: "center",
    position: "relative",
    borderRadius: 20,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 100,
    bottom: 0,
    left: 0,
    zIndex: 2,
    margin: 20,
  },
  brand: {
    fontFamily: "bold",
    fontSize: 30,
    color: "#FFD700",
    position: "absolute",
    zIndex: 2,
    transform: [{ rotate: "90deg" }],
    right: -115,
    bottom: "50%",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontFamily: "regular",
    fontSize: 17,
    marginTop: 20,
    flex: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    margin: 10,
    marginTop: 15,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    alignSelf: "flex-end",
  },
  btnText: {
    fontFamily: "medium",
    fontSize: 18,
    letterSpacing: 1,
    marginRight: 15,
  },
});

export default Intro;
