import { StyleSheet, Dimensions, View, Pressable, Image } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useRef, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Empty from "../../assets/empty.png";
import { FlatList } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

function Carousel({ data, local, id }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  function navigate(index) {
    navigation.navigate("Influencers", {
      screen: "Feed",
      params: {
        index: index,
        id: id,
      },
    });
  }

  function renderItem({ item, index }) {
    return (
      <Pressable
        style={s.container}
        onPress={local ? null : () => navigate(index)}
      >
        <Animated.Image
          entering={ZoomIn.duration(200)}
          source={
            local ? item.img : { uri: "https://realinfluence.io/" + item.path }
          }
          resizeMode="contain"
          style={s.img}
        />
      </Pressable>
    );
  }
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { index, item } = viewableItems[0];
      setActiveIndex(index);
    }
  });

  function Pagination() {
    return (
      <View style={s.pagination}>
        {data.map((img, index) => (
          <Icon
            color={index === activeIndex ? "gold" : "black"}
            key={local ? img.id : img._id}
            name="circle"
            style={s.circle}
          />
        ))}
      </View>
    );
  }
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        ListEmptyComponent={
          <Image source={Empty} style={{ width: width, alignSelf: "center" }} />
        }
      />
      <Pagination />
    </>
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
  pagination: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export default Carousel;
