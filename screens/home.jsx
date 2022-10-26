import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import Header from "../components/header";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import Brands from "../components/sponsors";
import Influencers from "../components/home/influencersList";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchInfluencers from "../requests/fetchInfluencers";
import { useFocusEffect } from "@react-navigation/native";
import Carousel from "../components/shared/carousel";
import { carousel } from "../data";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, isLoading, refetch, isFetched } = useQuery(
    ["influencers"],
    fetchInfluencers
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("fetching influencers (Home)");
      refetch();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refreshing]);

  if (isFetched) {
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
          <TopBar title="Miss Influencer" />
          <Carousel data={carousel} local />
          <Header text="INFLUENCERS" btn />
          <Influencers data={data?.influencers} />
          <Header text="SPONSORS" btn />
          <Brands />
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
  empty: {
    height: width / 2,
    width: width / 2,
    alignSelf: "center",
  },
});

export default Home;
