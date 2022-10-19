import React from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
const width = Dimensions.get("window").width;

class GalleryImage extends React.PureComponent {
  render() {
    return (
      <Animated.View
        entering={ZoomIn.delay(this.props.index * 150)}
        exiting={ZoomOut.duration(100)}
      >
        <TouchableOpacity style={s.galleryItem} onLongPress={this.props.alert}>
          <Image
            source={{ uri: "http://localhost:8888/" + this.props.img.path }}
            style={s.galleryImg}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
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
    resizeMode: "contain",
  },
});

export default GalleryImage;
