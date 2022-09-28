import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Empty from "../assets/empty.png";
import { AuthContext } from "../context/authContext";
import Animated, { ZoomIn, ZoomInLeft } from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Profile({ route, navigation }) {
  const { name, img, bio, gallery } = route.params;
  const { user, setUser } = useContext(AuthContext);
  if (user && img) {
    return (
      <View style={s.container}>
        <View>
          <Image source={Bg} style={s.bg} />
        </View>
        <ScrollView>
          <TopBar title="Influencer Profile" stack={true} />
          <Animated.View
            style={s.imgContainer}
            entering={ZoomInLeft.duration(500)}
          >
            <Image
              source={{
                uri: "https://realinfluence.io/" + img,
              }}
              style={s.img}
            />
          </Animated.View>
          <View style={s.content}>
            <Text style={s.name}>{name}</Text>
          </View>
          <Text style={s.header}>BIO</Text>
          <Text style={s.text}>{bio}</Text>
          <Header text="GALLERY" />

          {!gallery || gallery.length === 0 ? (
            <Image source={Empty} style={s.empty} />
          ) : (
            <MyCarousel gallery={gallery} />
          )}
          <View style={s.btnGroup}>
            <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={22} />
              <Text style={s.btnText}>BACK</Text>
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
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 15,
  },
  empty: {
    width: width,
    height: 300,
  },
});

export default Profile;
