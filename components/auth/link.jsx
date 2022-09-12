import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

function AuthLink({ navigate, route }) {
  return (
    <TouchableOpacity
      onPress={() => navigate(route === "SignUp" ? "SignIn" : "SignUp")}
    >
      <Animated.Text style={s.link} entering={SlideInDown.duration(500)}>
        {route === "SignUp" ? "Already" : "Don't"} have an account ?{" "}
        <Text style={s.bold}>{route === "SignUp" ? "SIGN IN" : "SIGN UP"}</Text>
      </Animated.Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  link: {
    textAlign: "center",
    fontFamily: "light",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    color: "black",
  },
  bold: {
    fontFamily: "bold",
    fontSize: 16,
    color: "purple",
  },
});

export default AuthLink;