import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
// Sponsors
import Pic1 from "../assets/sponsors/pic1.png";
import Pic2 from "../assets/sponsors/pic2.png";
import Pic3 from "../assets/sponsors/pic3.png";
import Pic4 from "../assets/sponsors/pic4.png"


function Brands() {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.placeholder}>
          <Image source={Pic1} height={95} width={138} />
        </View>
        <View style={[s.placeholder, { marginLeft: 5 }]}>
          <Image source={Pic2} height={95} width={138} />
        </View>
      </View>
      <View style={s.row}>
        <View style={s.placeholder}>
          <Image source={Pic3} height={95} width={138} />
        </View>
        <View style={[s.placeholder, { marginLeft: 5 }]}>
          <Image source={Pic4} height={95} width={138} />
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
    backgroundColor: "white",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: .5,
    borderColor: "rgba(0,0,0,.1)"
  },
});

export default Brands;
