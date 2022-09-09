import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Infleuncers from "../components/influencers";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import { ScrollView } from "react-native-gesture-handler";
import Brands from "../components/brands";
import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { InfluencersContext } from "../context/infContext";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  const { influencers, setInfluencers } = useContext(InfluencersContext);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchInfluencers() {
        try {
          let response = await axios.get(
            "https://dummyapi.io/data/v1/user?limit=20",
            {
              headers: {
                "app-id": "627b889d977f951db58d57db",
              },
            }
          );
          let influencers = response.data.data;
          setInfluencers(influencers);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
      fetchInfluencers();
    }, [])
  );
  return loading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator
        size="large"
        color="black"
        style={{ transfom: [{ scale: 3 }] }}
      />
    </View>
  ) : (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView>
        <TopBar title="Miss Influencer" />
        <MyCarousel />
        <Header text="INFLUENCERS" />
        <Infleuncers data={influencers.slice(0, 10)} />
        <Infleuncers data={influencers.slice(10, 20)} />
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
