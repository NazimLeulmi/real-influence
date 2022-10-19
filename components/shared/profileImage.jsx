import { Image, StyleSheet, Dimensions } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const width = Dimensions.get("window").width;

function ProfileImage({ img }) {
  return (
    <Animated.View style={s.imgContainer} entering={ZoomIn.duration(250)}>
      <Image
        source={{
          uri: "http://localhost:8888/" + img,
        }}
        style={s.img}
      />
    </Animated.View>
  );
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
