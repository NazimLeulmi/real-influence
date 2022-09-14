import * as React from "react";
import { StyleSheet, View } from "react-native";

function Brands() {
  return (
    <View style={s.container}>
      <View style={s.firstRow}>
        <View style={s.placeholder} />
        <View style={[s.placeholder, { marginLeft: 5 }]} />
      </View>
      <View style={s.secondRow}>
        <View style={s.placeholder} />
        <View style={[s.placeholder, { marginLeft: 5 }]} />
      </View>
      <View style={s.thirdRow}>
        <View style={s.placeholder} />
        <View style={[s.placeholder, { marginLeft: 5 }]} />
      </View>
      <View style={s.forthRow} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 15,
  },
  placeholder: {
    backgroundColor: "rgba(0,0,0,.1)",
    flex: 1,
  },
  firstRow: {
    flexDirection: "row",
    height: 175,
  },
  secondRow: {
    flexDirection: "row",
    height: 200,
    marginTop: 5,
  },
  thirdRow: {
    flexDirection: "row",
    height: 300,
    marginTop: 5,
  },
  forthRow: {
    flex: 1,
    height: 200,
    backgroundColor: "rgba(0,0,0,.1)",
    marginTop: 5,
  },
});

export default Brands;
