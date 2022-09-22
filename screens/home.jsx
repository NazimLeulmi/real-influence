import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Infleuncers from "../components/influencers";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import Brands from "../components/sponsors";
import { InfluencersContext } from "../context/infContext";
import React from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  const { influencers, setInfluencers } = React.useContext(InfluencersContext);
  const [refreshing, setRefreshing] = React.useState(false);
  async function fetchInfluencers() {
    try {
      let response = await axios.get("http://194.233.163.93:8888/users");
      let data = response.data;
      if (data.success === true) {
        setInfluencers(data.influencers);
        setRefreshing(false);
        console.log("Fetched Influencers");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchInfluencers();
    }, [setInfluencers])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchInfluencers();
  }, [refreshing]);

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {influencers ? (
          <>
            <TopBar title="Miss Influencer" />
            <MyCarousel />
            <Header text="INFLUENCERS" btn />
            <Infleuncers data={influencers.slice(0, 12)} />
            <Header text="SPONSORS" btn />
            <Brands />
          </>
        ) : (
          <View
            style={{
              flex: 1,
              minHeight: height,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
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
  empty: {
    height: width / 2,
    width: width / 2,
    alignSelf: "center",
  },
});

export default Home;
