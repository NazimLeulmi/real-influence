import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

const width = Dimensions.get("window").width;

function SnackBar({ setSnack, text }) {
  function close() {
    setSnack(false);
  }

  setTimeout(close, 2500);

  return (
    <Animated.View
      entering={SlideInLeft.duration("500")}
      exiting={SlideOutRight.duration("100")}
      style={s.container}
    >
      <Text style={s.text}>{text}</Text>
      <Icon name="alert-box" size={25} color="rgba(0,0,0,.25)" />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    width: width - 30,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15,
    borderBottomColor: "#FFD700",
    borderBottomWidth: 1,
    backgroundColor: "rgba(0,0,0,.1)",
  },
  text: {
    marginRight: "auto",
    fontFamily: "regular",
    color: "black",
  },
});

export default SnackBar;
