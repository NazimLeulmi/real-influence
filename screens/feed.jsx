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
import axios from "axios";
const width = Dimensions.get("window").width;
import Animated, {
  ZoomIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TopBar from "../components/topbar";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { InfluencersContext } from "../context/infContext";

function GalleryImage({ item, id }) {
  let liked = false;
  const { user, setUser } = React.useContext(AuthContext);
  const { influencers, setInfluencers } = React.useContext(InfluencersContext);
  if (item.likes.length !== 0) {
    for (let i = 0; i < item.likes.length; i++) {
      if (user.id === item.likes[i].from) {
        liked = true;
        break;
      }
    }
  }
  async function likeImage() {
    const response = await axios.post(
      "http://localhost:8888/influencers/like",
      { imageId: item._id }
    );
    if (item._id === response.data.image._id) {
      const newInf = await influencers.map(async (obj) => {
        if (obj._id === id) {
          await obj.gallery.map((image) => {
            if (image._id === response.data.image._id) {
              return response.data.image;
            } else {
              return image;
            }
          });
        }
        return obj;
      });
      console.log(newInf[0]);
    }
  }

  return (
    <View style={s.container}>
      <Animated.Image
        source={{ uri: "http://localhost:8888/" + item.path }}
        style={s.img}
        entering={ZoomIn.duration(200).delay(100)}
      />
      <View style={s.btnGroup}>
        <Animated.View entering={FadeInLeft.duration(300)}>
          <TouchableOpacity onPress={likeImage}>
            <Icon
              size={30}
              name={liked ? "heart" : "heart-outline"}
              style={s.icon}
            />
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
            <Text style={s.btnText}>{item.likes.length} Likes</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
function Feed() {
  const route = useRoute();
  const { gallery, index, id } = route.params;
  const listRef = React.useRef(null);

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
    return <GalleryImage item={item} id={id} />;
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
