import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const width = Dimensions.get("window").width;

class Influencer extends React.PureComponent {
  navigate = () => {
    this.props.navigate("Influencers", {
      screen: "Influencer",
      params: { influencer: this.props.influencer },
    });
  };
  render() {
    const { profileImg, name } = this.props.influencer;
    return (
      <Animated.View entering={ZoomIn.delay(this.props.index * 150)}>
        <TouchableOpacity style={s.influencer} onPress={this.navigate}>
          <Image
            source={{
              uri: "http://localhost:8888/" + profileImg,
            }}
            style={s.img}
            resizeMethod="resize"
          />
          <Text style={s.name}>{name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    width: width,
    position: "relative",
  },
  influencer: {
    alignItems: "center",
  },
  img: {
    width: width / 2 - 25,
    height: width / 2 - 25,
    margin: 5,
    position: "relative",
    resizeMode: "cover",
    borderRadius: 8,
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Influencer;
