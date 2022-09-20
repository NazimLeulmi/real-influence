import React from "react";
import { StyleSheet, Text, View } from "react-native";

function AuthHeader({ text }) {
  return (
    <View style={s.container}>
      <Text style={s.headline}>{text}</Text>
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
    fontFamily: "light",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AuthHeader;
