import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
// Sponsors
import Pic0 from "../assets/sponsors/pic0.jpg";
import Pic1 from "../assets/sponsors/pic1.jpg";
import Pic2 from "../assets/sponsors/pic2.jpg";
import Pic3 from "../assets/sponsors/pic3.jpg";

function Brands() {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.placeholder}>
          <Image source={Pic0} style={s.img} />
        </View>
        <View style={[s.placeholder, { marginLeft: 5 }]}>
          <Image source={Pic1} style={s.img} />
        </View>
      </View>
      <View style={s.row}>
        <View style={s.placeholder}>
          <Image source={Pic2} style={s.img} />
        </View>
        <View style={[s.placeholder, { marginLeft: 5 }]}>
          <Image source={Pic3} style={s.img} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 15,
  },
  row: {
    flexDirection: "row",
    height: 175,
    marginBottom: 5,
  },
  placeholder: {
    backgroundColor: "rgba(0,0,0,.1)",
    flex: 1,
    borderRadius: 8,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default Brands;
