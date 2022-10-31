import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "../components/topbar";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";
import Empty from "../assets/empty.png";

const width = Dimensions.get("window").width;

function GalleryImage({ index, img, id, navigation }) {
  function navigate() {
    navigation.navigate("Influencers", {
      screen: "Feed",
      params: {
        index: index,
        id: id,
      },
    });
  }
  return (
    <Animated.View entering={ZoomIn.delay(index * 150)}>
      <TouchableOpacity style={s.galleryItem} onPress={navigate}>
        <Image
          source={{ uri: "https://realinfluence.io/" + img }}
          style={s.img}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

function Gallery() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { data, isFetched } = useQuery(["gallery"], () => fetchGallery(id));

  function renderItem({ item, index }) {
    return (
      <GalleryImage
        img={item.path}
        index={index}
        navigation={navigation}
        id={id}
      />
    );
  }

  if (isFetched) {
    return (
      <View style={s.container}>
        <FlatList
          data={data?.gallery}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<TopBar title="GALLERY" stack />}
          stickyHeaderIndices={[0]}
          numColumns={2}
          ListEmptyComponent={
            <Image
              source={Empty}
              style={{ width: width - 50, alignSelf: "center" }}
            />
          }
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  img: {
    width: width / 2 - 10,
    height: width / 2,
    position: "relative",
    borderRadius: 8,
    margin: 5,
  },
});

export default Gallery;
