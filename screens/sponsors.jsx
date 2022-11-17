import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Bg from "../assets/background.jpg";
import TopBar from "../components/topbar";
// Sponsors

import Pic1 from "../assets/sponsors/pic1.png";
import Pic2 from "../assets/sponsors/pic2.png";
import Pic3 from "../assets/sponsors/pic3.png";
import Pic4 from "../assets/sponsors/pic4.png";
import Pic5 from "../assets/sponsors/pic5.png";
import Pic6 from "../assets/sponsors/pic6.png";
import Pic7 from "../assets/sponsors/pic7.png";
import Pic8 from "../assets/sponsors/pic8.png";
import Pic9 from "../assets/sponsors/pic9.png";
import Pic10 from "../assets/sponsors/pic10.png";
import Pic11 from "../assets/sponsors/pic11.png";
import Pic12 from "../assets/sponsors/pic12.png";
import Pic13 from "../assets/sponsors/pic13.png";
import Pic14 from "../assets/sponsors/pic14.png";
import Pic15 from "../assets/sponsors/pic15.png";
import Pic16 from "../assets/sponsors/pic16.png";
import Pic17 from "../assets/sponsors/pic17.png";
import Pic18 from "../assets/sponsors/pic18.png";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const data = [
  { img: Pic1, id: "1" },
  { img: Pic2, id: "2" },
  { img: Pic3, id: "3" },
  { img: Pic4, id: "4" },
  { img: Pic5, id: "5" },
  { img: Pic6, id: "6" },
  { img: Pic7, id: "7" },
  { img: Pic8, id: "8" },
  { img: Pic8, id: "9" },
  { img: Pic9, id: "10" },
  { img: Pic10, id: "11" },
  { img: Pic11, id: "12" },
  { img: Pic12, id: "13" },
  { img: Pic13, id: "14" },
  { img: Pic14, id: "15" },
  { img: Pic15, id: "16" },
  { img: Pic16, id: "17" },
  { img: Pic17, id: "18" },
];

class Sponsor extends React.PureComponent {
  render() {
    return (
      <View style={s.placeholder} >
        <Image source={this.props.img} style={s.img} />
      </View>
    );
  }
}

function SponsorsList() {
  function renderItem({ item }) {
    return <Sponsor img={item.img} />;
  }

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="Sponsors" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  bg: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  placeholder: {
    width: width / 2 - 10,
    height: width / 2 - 10,
    margin: 5,
    position: "relative",
    backgroundColor: "white",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: .5,
    borderColor: "rgba(0,0,0,.1)"
  },
  img: {
    width: 138,
    height: 95
  },
});

export default SponsorsList;
