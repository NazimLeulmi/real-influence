import { StyleSheet, Dimensions, View, Image } from "react-native";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Infleuncers from "../components/influencers";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import { ScrollView } from "react-native-gesture-handler";
import Brands from "../components/brands";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView>
        <TopBar title="Miss Influencer" />
        <MyCarousel />
        <Header text="INFLUENCERS" />
        <Infleuncers />
        <Infleuncers />
        <Header text="ANNOUNCEMENTS" />
        <MyCarousel />
        <Header text="FEATURED BRANDS" />
        <Brands />
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
});

export default Home;
