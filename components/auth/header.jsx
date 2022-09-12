import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";

function AuthHeader({ route }) {
  return (
    <>
      <Animated.Text style={s.headline} entering={SlideInLeft.duration(500)}>
        {route === "SignUp" ? "SIGN UP" : "SIGN IN"}
      </Animated.Text>
      <Text style={s.subHeader}>
        {route === "SignUp"
          ? "Enter a valid email and a strong password to create an account"
          : "Enter your email and password to start chatting"}
      </Text>
    </>
  );
}

let s = StyleSheet.create({
  headline: {
    fontFamily: "brand",
    fontSize: 55,
    color: "rgb(139,0,139)",
    marginBottom:10
  },
  subHeader: {
    fontFamily: "light",
    fontSize: 22,
    width: "75%",
    color: "black",
    marginBottom: 30,
  },
});

export default AuthHeader;