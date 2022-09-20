import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Bg from "../assets/background.jpg";
import TopBar from "../components/topbar";
// Sponsors
import Pic0 from "../assets/sponsors/pic0.jpg";
import Pic1 from "../assets/sponsors/pic1.jpg";
import Pic2 from "../assets/sponsors/pic2.jpg";
import Pic3 from "../assets/sponsors/pic3.jpg";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const data = [
  { img: Pic0, id: "0" },
  { img: Pic1, id: "1" },
  { img: Pic2, id: "2" },
  { img: Pic3, id: "3" },
];

class Sponsor extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={s.influencer} onPress={this.navigate}>
        <Image source={this.props.img} style={s.img} />
      </TouchableOpacity>
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
  sponsor: {
    alignItems: "center",
    alignSelf: "flex-start",
  },
  img: {
    width: width / 2 - 10,
    height: width / 2 - 10,
    margin: 5,
    position: "relative",
    borderRadius: 8,
  },
});

export default SponsorsList;
