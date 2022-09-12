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
import Animated, {
  ZoomIn,
  FadeIn,
  FadeInLeft,
  StretchInY,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Intro() {
  const navigation = useNavigation();

  function start() {
    navigation.navigate("Auth", { screen: "SignIn" });
  }

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView style={s.scroll}>
        <Animated.Image
          source={Logo}
          style={s.logo}
          entering={ZoomIn.duration(650)}
        />
        <Animated.Text style={s.brand} entering={FadeInLeft.duration(1000)}>
          Miss Influencer
        </Animated.Text>
        <Animated.View
          style={s.headerContainer}
          entering={FadeInLeft.duration(800)}
        >
          <Animated.Text style={s.header} entering={FadeInLeft.duration(1000)}>
            OUR MISSION
          </Animated.Text>
        </Animated.View>
        <Animated.Text style={s.text} entering={FadeIn.duration(1200)}>
          Miss Influencer Dubai is dedicated to spread value throughout beauty.
          We aim to prove that – on the contrary to so many misconceptions –
          dazzling and powerful women of social media can indeed rule the whole
          world by using their positive influence on their followers. This time
          they are not only willing to grow their own personal brand but
          together will publicize and strengthen the brilliance of Dubai and use
          their strong impact on their combined, enormous crowd to grow the
          market value of our partners.
        </Animated.Text>
        <Animated.View entering={StretchInY.duration(750)}>
          <TouchableOpacity style={s.btn} onPress={start}>
            <Text style={s.btnText}>GET STARTED</Text>
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
    padding: 20,
  },
  brand: {
    fontFamily: "brand",
    fontSize: 30,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.2)",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 15,
  },
  header: {
    fontSize: 24,
    fontFamily: "medium",
  },
  headerContainer: {
    borderLeftWidth: 5,
    borderColor: "#FFD700",
    paddingLeft: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    fontFamily: "regular",
    width: "95%",
  },
  btn: {
    width: "95%",
    padding: 15,
    backgroundColor: "#FFD700",
    marginTop: 20,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    fontFamily: "regular",
    marginRight: "auto",
    letterSpacing: 1,
    color: "black",
  },
  animated: {
    fontFamily: "bold",
    fontSize: 30,
    marginBottom: 30,
  },
});

export default Intro;
