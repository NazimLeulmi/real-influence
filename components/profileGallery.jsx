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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
class Img extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity style={s.galleryItem}>
        <Image
          source={{ uri: "https://realinfluence.io/" + this.props.img }}
          style={s.galleryImg}
        />
      </TouchableOpacity>
    );
  }
}

function ProfileGallery({ header, data }) {
  function renderItem({ item }) {
    return <Img img={item.path} />;
  }
  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
