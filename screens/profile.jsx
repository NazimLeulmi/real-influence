import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Empty from "../assets/empty.png";
import Animated, { ZoomInLeft } from "react-native-reanimated";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Profile({ route, navigation }) {
  const { name, img, bio, id } = route.params;
  const { data, refetch, isFetched } = useQuery(["gallery"], () =>
    fetchGallery(id)
  );

  if (isFetched) {
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
          <Header text="GALLERY" id={id} />

          {data?.gallery.length === 0 ? (
            <Image source={Empty} style={s.empty} />
          ) : (
            <MyCarousel gallery={data?.gallery} id={id} />
          )}
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
