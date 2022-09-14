import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function Header({ text, screen }) {
  return (
    <View style={s.container}>
      <Text style={s.header}>{text}</Text>
      <TouchableOpacity style={s.btn}>
        <Text style={s.btnText}>VIEW ALL</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  header: {
    fontFamily: "medium",
    textTransform: "uppercase",
    fontSize: 20,
    letterSpacing: 1.5,
  },
  btn: {
    marginLeft: "auto",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "regular",
    letterSpacing: 2,
    fontSize: 10,
  },
});

export default Header;
