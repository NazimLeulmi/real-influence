import * as React from "react";
import { Dimensions, Text, View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { carousel } from "../data";

function MyCarousel({ margin }) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, marginTop: margin ? 20 : 0, position: "relative" }}>
      <Carousel
        loop
        width={width}
        height={300}
        autoPlay={true}
        data={carousel}
        scrollAnimationDuration={1000}
        mode="horizontal-stack"
        modeConfig={{ showLength: carousel.length - 1 }}
        renderItem={({ index, item }) => (
          <View style={s.container}>
            <Image
              source={item.img}
              resizeMode="cover"
              resizeMethod="auto"
              style={s.image}
            />
            <View style={s.counter}>
              <Text style={s.text}>
                {index + 1} / {carousel.length}
              </Text>
            </View>
          </View>
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
