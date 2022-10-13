import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
const width = Dimensions.get("window").width;
class Img extends React.PureComponent {
  render() {
    return (
      <Animated.View entering={ZoomIn.delay(this.props.index * 150)}>
        <TouchableOpacity style={s.galleryItem}>
          <Image
            source={{ uri: "https://realinfluence.io/" + this.props.img }}
            style={s.galleryImg}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

function ProfileGallery({ header, data }) {
  function renderItem({ item, index }) {
    return <Img img={item.path} index={index} />;
  }
  return (
    <View style={s.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={3}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    width: width,
    position: "relative",
    flex: 1,
  },
  galleryItem: {
    width: width / 3 - 10,
    height: width / 3 - 10,
    margin: 5,
    position: "relative",
    borderRadius: 8,
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ProfileGallery;
