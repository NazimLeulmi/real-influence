import React from "react";
import { StyleSheet, Text } from "react-native";

function AuthError({ text }) {
  return <Text style={s.error}>{text}</Text>;
}

const s = StyleSheet.create({
  error: {
    fontFamily: "regular",
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
});

export default AuthError;