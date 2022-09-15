import React from "react";
import {
  ScrollView,
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
        <TopBar title="Influencer Profile" stack={true} />
        <View style={s.imgContainer}>
          <Animated.Image
            source={img}
            style={s.img}
            entering={ZoomInLeft.duration(500)}
          />
        </View>
        <View style={s.content}>
          <Text style={s.name}>{name} - </Text>
          <Text style={s.name}>{age}</Text>
        </View>
        <Text style={s.header}>BIO</Text>
        <Text style={s.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown
        </Text>
        <Header text="GALLERY" />
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
  imgContainer: {
    width: width / 1.75,
    height: width / 1.75,
    borderRadius: width / 1.75,
    alignSelf: "center",
    margin: 15,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: width / 1.75,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
  },
  content: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 5,
  },
  name: {
    fontFamily: "regular",
    fontSize: 18,
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
