import { StyleSheet, Dimensions, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";

const width = Dimensions.get("window").width;

function Carousel({ data, local }) {
  const listRef = useRef(null);

  function renderItem({ item, index }) {
    return (
      <View style={s.container}>
        <Animated.Image
          entering={ZoomIn.duration(200)}
          source={
            local ? item.img : { uri: "http://localhost:8888/" + item.path }
          }
          resizeMode="contain"
          style={s.img}
        />
      </View>
    );
  }

  return (
    <FlashList
      ref={listRef}
      data={data}
      renderItem={renderItem}
      horizontal={true}
      decelerationRate="fast"
      snapToInterval={width}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={6}
    />
  );
}

const s = StyleSheet.create({
  carousel: {
    width: width,
    height: width,
  },
  container: {
    width: width,
    height: width,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default Carousel;
