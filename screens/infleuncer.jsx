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
import Gadot from "../assets/gadot.png";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Influencer() {
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView>
        <StatusBar />
        <TopBar title="Gal Gadot" stack={true} />
        <View style={s.hero}>
          <View style={s.imgContainer}>
            <Image source={Gadot} style={s.img} />
          </View>
          <Text style={s.name}> Gal Gadot</Text>
        </View>
        <Header text="PRODUCTS" />
        <MyCarousel />
        <TouchableOpacity style={s.btn}>
          <Icon name="arrow-up" size={22} />
          <Text style={s.btnText}>VOTE</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,.1)",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
  },
  imgContainer: {
    flex: 1,
    height: "100%",
    position: "relative",
  },
  name: {
    fontFamily: "regular",
    fontSize: 24,
    flex: 1,
  },
  img: {
    // resizeMode: "cover",
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 150,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default Influencer;
