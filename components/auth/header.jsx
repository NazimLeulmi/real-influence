import React from "react";
import { StyleSheet, Text, View } from "react-native";

function AuthHeader({ route }) {
  return (
    <View style={s.container}>
      <Text style={s.headline}>
        {route === "SignUp"
          ? "Enter a valid email and a strong password to create an account"
          : "Enter your email and password to join our community of influencers"}
      </Text>
    </View>
  );
}

let s = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
  },
  headline: {
    fontFamily: "medium",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AuthHeader;
