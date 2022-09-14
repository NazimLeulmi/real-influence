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
        <Text style={s.bold}>{route === "SignUp" ? "Sign in" : "Sign up"}</Text>
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
    fontFamily: "medium",
    fontSize: 15,
    letterSpacing: 1,
  },
});

export default AuthLink;