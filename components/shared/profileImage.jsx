import { Image, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import React from "react";

const width = Dimensions.get("window").width;

class ProfileImage extends React.PureComponent {
  render() {
    return (
      <Animated.View style={s.imgContainer} entering={ZoomIn.duration(250)}>
        <Pressable onPress={this.props.pickImage ? this.props.pickImage : null}>
          <Image
            source={{
              uri: "http://localhost:8888/" + this.props.img,
            }}
            style={s.img}
          />
        </Pressable>
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
  imgContainer: {
    width: width - 30,
    height: width,
    margin: 15,
    alignSelf: "center",
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
    borderRadius: 15,
  },
});

export default ProfileImage;
