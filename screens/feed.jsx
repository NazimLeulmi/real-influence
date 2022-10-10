import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
const width = Dimensions.get("window").width;
import Animated, {
  ZoomIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TopBar from "../components/topbar";
import { useRoute, useFocusEffect } from "@react-navigation/native";

function GalleryImage({ img }) {
  return (
    <View style={s.container}>
      <Animated.Image
        source={{ uri: "http://localhost:8888/" + img }}
        style={s.img}
        entering={ZoomIn.duration(200).delay(100)}
      />
      <View style={s.btnGroup}>
        <Animated.View entering={FadeInLeft.duration(300)}>
          <TouchableOpacity>
            <Icon size={30} name="heart-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(300).delay(100)}>
          <TouchableOpacity>
            <Icon size={30} name="chat-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(300).delay(200)}>
          <TouchableOpacity>
            <Icon size={30} name="share-variant-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={s.last}
          entering={FadeInRight.duration(300).delay(300)}
        >
          <TouchableOpacity style={s.btn}>
            <Text style={s.btnText}>Favourite</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
function Feed() {
  const route = useRoute();
  const { gallery, index } = route.params;
  const listRef = React.useRef(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log(listRef.current);

  //     console.log("Scrolled");
  //   }, [])
  // );

  setTimeout(
    () =>
      listRef.current.scrollToIndex({
        index: index,
        viewPosition: 0.5,
        animated: false,
      }),
    250
  );

  function renderItem({ item }) {
    return <GalleryImage img={item.path} />;
  }
  function getItemLayout(data, index) {
    return {
      length: s.container.height,
      offset: s.container.height * index,
      index,
    };
  }

  return (
    <View style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <FlatList
        ref={listRef}
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        getItemLayout={getItemLayout}
        ListHeaderComponent={<TopBar title="INFLUENCER FEED" stack />}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  img: {
    height: width,
    width: width,
    resizeMode: "contain",
  },
  container: {
    height: width + 60,
    width: width,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    height: 60,
  },
  icon: {
    color: "rgba(0,0,0,.3)",
    fontWeight: 300,
    marginLeft: 8,
  },
  last: {
    marginLeft: "auto",
    marginRight: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.1)",
    width: 150,
    borderRadius: 50,
    padding: 4,
  },
  btnText: {
    fontFamily: "light",
    fontSize: 14,
  },
});

export default Feed;
