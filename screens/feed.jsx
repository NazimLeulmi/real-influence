import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import Bg from "../assets/background.jpg";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

import Animated, {
  ZoomIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TopBar from "../components/topbar";
import { useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";
import fetchLikes from "../requests/fetchLikes";
import likeImage from "../requests/likeImage";
import { AuthContext } from "../context/authContext";

function GalleryImage({ item, id, index }) {
  const { user, setUser } = React.useContext(AuthContext);
  const [likesCounter, setLikeCounter] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const { data } = useQuery(["likes"], () => fetchLikes(id));
  const queryClient = useQueryClient();
  const mutation = useMutation(likeImage, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"]);
    },
  });

  function toggleLike() {
    mutation.mutate({ imageId: item._id, influencerId: id });
  }
  useFocusEffect(
    useCallback(() => {
      let likesCounter = 0;
      let liked = false;
      if (data) {
        for (let i = 0; i < data.likes.length; i++) {
          if (data.likes[i].image === item._id) {
            likesCounter++;
            if (data.likes[i].from === user.id) {
              liked = true;
            }
          }
        }
      }
      setLikeCounter(likesCounter);
      setLiked(liked);
    }, [data])
  );

  const shareImage = async () => {
    try {
      const link = `https://realinfluence.io/share/feed/${id}/${index}`;
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={s.container}>
      <Animated.Image
        source={{ uri: "https://realinfluence.io/" + item.path }}
        style={s.img}
        entering={ZoomIn.duration(200).delay(100)}
      />
      <View style={s.btnGroup}>
        <Animated.View entering={FadeInLeft.duration(300)}>
          <TouchableOpacity onPress={toggleLike}>
            <Icon
              size={30}
              name={liked ? "heart" : "heart-outline"}
              style={s.icon}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(300).delay(200)}>
          <TouchableOpacity onPress={shareImage}>
            <Icon size={30} name="share-variant-outline" style={s.icon} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={s.last}
          entering={FadeInRight.duration(300).delay(300)}
        >
          <TouchableOpacity style={s.btn}>
            <Text style={s.btnText}>{likesCounter} Likes</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
function Feed() {
  const route = useRoute();
  const { index, id } = route.params;
  const { data } = useQuery(["gallery"], () => fetchGallery(id));
  const listRef = React.useRef(null);

  function renderItem({ item, index }) {
    return <GalleryImage item={item} id={id} index={index} />;
  }

  function getItemLayout(data, index) {
    return {
      length: s.container.height,
      offset: s.container.height * index,
      index,
    };
  }

  return (
    <View style={s.wrapper}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <FlatList
        ref={listRef}
        data={data?.gallery}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        getItemLayout={getItemLayout}
        ListHeaderComponent={<TopBar title="INFLUENCER FEED" stack />}
        stickyHeaderIndices={[0]}
        initialScrollIndex={index}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  bg: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
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
    color: "rgba(0,0,0,.6)",
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
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    width: 85,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 14,
  },
});

export default Feed;
