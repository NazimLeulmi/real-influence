import React from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
import TopBar from "../components/topbar";
import Img from "../assets/coming.png";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Notifications() {
  return (
    <View style={s.container}>
      <TopBar title="Notifications" />
      <Text style={s.header}>COMING SOON</Text>
      <Image source={Img} style={s.img} />
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    fontFamily: "regular",
    fontSize: 22,
    marginTop: "auto",
    marginBottom: 15,
  },
  img: {
    alignSelf: "center",
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: "auto",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Notifications;
