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
import Header from "../components/header";
import Animated, { ZoomInLeft } from "react-native-reanimated";
import ProfileImg from "../assets/pics/pic2.jpg";
import Pic0 from "../assets/sponsors/pic0.jpg";
import Pic1 from "../assets/sponsors/pic1.jpg";
import Pic2 from "../assets/sponsors/pic2.jpg";
import Pic3 from "../assets/sponsors/pic3.jpg";
import ProfileGallery from "../components/profileGallery";

const data = [
  { img: Pic0, id: "0" },
  { img: Pic1, id: "1" },
  { img: Pic2, id: "2" },
  { img: Pic3, id: "3" },
];

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
class Img extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={s.galleryItem}>
        <Image source={this.props.img} style={s.galleryImg} />
      </TouchableOpacity>
    );
  }
}

function MyProfile() {
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="Profile" stack={true} />
      <View style={s.imgContainer}>
        <Animated.Image
          source={ProfileImg}
          style={s.img}
          entering={ZoomInLeft.duration(500)}
        />
      </View>
      <View style={s.content}>
        <Text style={s.name}>Lara Watson - </Text>
        <Text style={s.name}>23</Text>
      </View>
      <Header text="BIO" />
      <Text style={s.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown
      </Text>
      <Header text="GALLERY" btn={false} />
      <ProfileGallery />
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
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignSelf: "center",
    margin: 10,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: width / 3,
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
    fontSize: 16,
  },
  text: {
    fontFamily: "regular",
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default MyProfile;
