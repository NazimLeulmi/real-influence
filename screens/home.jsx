import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import Brands from "../components/sponsors";
import Influencers from "../components/influencers";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchInfluencers from "../requests/fetchInfluencers";
import { useFocusEffect } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, isLoading, refetch, isFetching } = useQuery(
    ["influencers"],
    fetchInfluencers
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("refetching");
      refetch();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    console.log("Refetched");
    setRefreshing(false);
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
        <TopBar title="Miss Influencer" />
        <MyCarousel />
        <Header text="INFLUENCERS" btn />
        <Influencers data={data?.influencers.slice(0, 12)} />
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
  empty: {
    height: width / 2,
    width: width / 2,
    alignSelf: "center",
  },
});

export default Home;
