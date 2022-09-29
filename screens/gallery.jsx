import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "../components/topbar";
import Animated, { SlideInLeft, Layout, ZoomIn } from "react-native-reanimated";

const width = Dimensions.get("window").width;

class GalleryImage extends React.PureComponent {
  navigate() {
    this.props.navigation.navigate("Influencers", {
      screen: "Feed",
      params: {
        gallery: this.props.gallery,
        index: this.props.index,
      },
    });
  }
  render() {
    return (
      <Animated.View entering={ZoomIn.delay(this.props.index * 150)}>
        <TouchableOpacity style={s.galleryItem} onPress={() => this.navigate()}>
          <Image
            source={{ uri: "https://realinfluence.io/" + this.props.img }}
            style={s.img}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

function Gallery() {
  const navigation = useNavigation();
  const route = useRoute();
  const { gallery } = route.params;

  function renderItem({ item, index }) {
    return (
      <GalleryImage
        img={item.path}
        index={index}
        gallery={gallery}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<TopBar title="GALLERY" stack />}
        stickyHeaderIndices={[0]}
        numColumns={2}
      />
    </View>
  );
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
