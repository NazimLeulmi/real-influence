import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import Logo from "../../assets/logo.png";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";

function AuthBrand({ text }) {
  return (
    <View style={s.container}>
      <Animated.Image
        source={Logo}
        style={s.logo}
        entering={FadeIn.duration(500)}
      />
      <Animated.Text style={s.brand} entering={FadeInLeft.duration(1000)}>
        {text}
      </Animated.Text>
    </View>
  );
}

let s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 75,
  },
  brand: {
    fontFamily: "medium",
    marginLeft: 15,
    fontSize: 26,
  },
});

export default AuthBrand;
