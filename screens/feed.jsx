import React from "react";
import {
  Text,
  StyleSheet,
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
import { useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";
import fetchLikes from "../requests/fetchLikes";
import likeImage from "../requests/likeImage";
import { AuthContext } from "../context/authContext";

function GalleryImage({ item, id }) {
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
    console.log(item._id, "imageID");
    mutation.mutate({ imageId: item._id, influencerId: id });
  }

  React.useEffect(() => {
    let likesCounter = 0;
    let liked = false;
    if (data) {
      for (let i = 0; i < data.likes.length; i++) {
        if (data.likes[i].image === item._id) {
          likesCounter++;
          if (data.likes[i].from === user.id) {
            console.log("already liked");
            liked = true;
          }
        }
      }
    }
    setLikeCounter(likesCounter);
    setLiked(liked);
  }, [data]);
  return (
    <View style={s.container}>
      <Animated.Image
        source={{ uri: "http://localhost:8888/" + item.path }}
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
        data={data?.gallery}
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
