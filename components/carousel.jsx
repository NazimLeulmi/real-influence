import * as React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { carousel } from "../data";

function MyCarousel({ margin }) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, marginTop: margin ? 20 : 0 }}>
      <Carousel
        loop
        width={width}
        height={300}
        autoPlay={true}
        data={carousel}
        scrollAnimationDuration={1000}
        renderItem={({ index, item }) => (
          <View style={{ flex: 1, position: "relative" }}>
            <Image
              source={item.img}
              resizeMode="cover"
              resizeMethod="auto"
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        )}
      />
    </View>
  );
}

export default MyCarousel;
