import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomInLeft,
} from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Profile({ route, navigation }) {
  const { name, img, age } = route.params;
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView>
        <StatusBar />
        <TopBar title="Influencer Profile" stack={true} />
        <View style={s.hero}>
          <View style={s.imgContainer}>
            <Animated.Image
              source={img}
              style={s.img}
              entering={ZoomInLeft.duration(500)}
            />
          </View>
          <View style={s.content}>
            <Animated.Text style={s.name} entering={FadeInUp.duration(500)}>
              {name}
            </Animated.Text>
            <Animated.Text style={s.age} entering={FadeInDown.duration(500)}>
              {age}
            </Animated.Text>
          </View>
        </View>
        <Text style={s.header}>BIOGRAPHY</Text>
        <Text style={s.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown
        </Text>
        <Header text="SOMETHING" />
        <MyCarousel />
        <View style={s.btnGroup}>
          <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} />
            <Text style={s.btnText}>GO BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: "#FFD700" }]}>
            <Icon name="heart" size={22} />
            <Text style={s.btnText}>VOTE</Text>
          </TouchableOpacity>
        </View>
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
  hero: {
    width: width,
    height: 250,
    backgroundColor: "rgba(0,0,0,.2)",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imgContainer: {
    flex: 1,
    height: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "brand",
    fontSize: 22,
    color: "#FFD700",
  },
  age: {
    fontFamily: "brand",
    fontSize: 22,
  },
  img: {
    resizeMode: "cover",
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  btnGroup: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 25,
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
    marginTop: 20,
    flex: 1,
    marginLeft: 5,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 18,
    marginLeft: 15,
  },
  header: {
    fontFamily: "medium",
    textTransform: "uppercase",
    fontSize: 20,
    letterSpacing: 1.5,
    margin: 15,
  },
  text: {
    fontFamily: "regular",
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 15,
  },
});

export default Profile;
