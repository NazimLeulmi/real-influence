import * as React from 'react';
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
    padding: 15
  },
  header: {
    fontFamily: "regular",
    textTransform: "uppercase",
    fontSize: 20,
    letterSpacing: 1.5,
  },
  btn: {
    marginLeft: "auto",
    backgroundColor: "rgba(255,255,255,.5)",
    padding: 15,
    borderWidth: .1,
    borderRadius: 10
  },
  btnText: {
    fontFamily: "regular",
    letterSpacing: 2,
    fontSize: 10
  }
})

export default Header;