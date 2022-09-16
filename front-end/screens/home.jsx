import { StyleSheet, Dimensions, View, Image } from "react-native";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Infleuncers from "../components/influencers";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import { ScrollView } from "react-native-gesture-handler";
import Brands from "../components/sponsors";
import { InfluencersContext } from "../context/infContext";
import React from "react";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  const { influencers } = React.useContext(InfluencersContext);
  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBar title="Miss Influencer" />
        <MyCarousel />
        <Header text="INFLUENCERS" btn />
        <Infleuncers data={influencers.slice(0, 12)} />
        <Header text="SPONSORS" btn />
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
