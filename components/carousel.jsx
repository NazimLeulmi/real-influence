import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { carousel } from "../data";
import { useNavigation } from "@react-navigation/native";

function MyCarousel({ margin, gallery }) {
  const data = gallery ? gallery : carousel;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();

  function navigate(props) {
    navigation.navigate("Influencers", {
      screen: "Image",
      params: {
        img: props,
      },
    });
  }
  return (
    <View style={{ flex: 1, marginTop: margin ? 20 : 0, position: "relative" }}>
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={data}
        autoPlayInterval={4500}
        mode="pause-advanced-parallax"
        modeConfig={{ showLength: data.length - 1 }}
        renderItem={({ index, item }) => (
          <Pressable
            style={s.container}
            onPress={gallery ? () => navigate(item.path) : null}
          >
            <Image
              source={
                gallery ? { uri: "http://3.28.21.245/" + item.path } : item.img
              }
              resizeMode="contain"
              resizeMethod="auto"
              style={s.image}
            />
            <View style={s.counter}>
              <Text style={s.text}>
                {index + 1} / {data.length}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  counter: {
    position: "absolute",
    zIndex: 3,
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(255,255,255,.45)",
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default MyCarousel;
