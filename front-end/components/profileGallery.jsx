import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Pic0 from "../assets/sponsors/pic0.jpg";
import Pic1 from "../assets/sponsors/pic1.jpg";
import Pic2 from "../assets/sponsors/pic2.jpg";
import Pic3 from "../assets/sponsors/pic3.jpg";

const data = [
  { img: Pic0, id: "0" },
  { img: Pic1, id: "1" },
  { img: Pic2, id: "2" },
  { img: Pic3, id: "3" },
  { img: Pic3, id: "4" },
  { img: Pic3, id: "5" },
  { img: Pic3, id: "6" },
  { img: Pic3, id: "7" },
  { img: Pic3, id: "8" },
  { img: Pic3, id: "9" },
  { img: Pic3, id: "10" },
];

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
class Img extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={s.galleryItem}>
        <Image source={this.props.img} style={s.galleryImg} />
      </TouchableOpacity>
    );
  }
}

function ProfileGallery({ header }) {
  function renderItem({ item }) {
    return <Img img={item.img} />;
  }
  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  container: {
    width: width,
    position: "relative",
  },
  galleryItem: {
    width: width / 3 - 10,
    height: width / 3 - 10,
    margin: 5,
    position: "relative",
    borderRadius: 8,
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ProfileGallery;
