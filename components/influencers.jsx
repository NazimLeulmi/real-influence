import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, Layout, ZoomIn } from "react-native-reanimated";

const width = Dimensions.get("window").width;

function Infleuncer({ name, img, bio, gallery, index }) {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate("Influencers", {
      screen: "Influencer",
      params: {
        name: name,
        img: img,
        bio: bio,
        gallery: gallery,
      },
    });
  }
  return (
    <Animated.View entering={ZoomIn.delay(index * 150)}>
      <TouchableOpacity style={s.influencer} onPress={navigate}>
        <Image
          source={{
            uri: "http://localhost:8888/" + img,
          }}
          style={s.img}
          resizeMethod="resize"
        />
        <Text style={s.name}>{name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const Infleuncers = ({ data }) => {
  const renderItem = ({ item, index }) => (
    <Infleuncer
      name={item.name}
      img={item.profileImg}
      bio={item.bio}
      gallery={item.gallery}
      index={index}
    />
  );
  return (
    <View style={s.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: width,
    position: "relative",
  },
  influencer: {
    alignItems: "center",
  },
  img: {
    width: width / 2 - 25,
    height: width / 2 - 25,
    margin: 5,
    position: "relative",
    resizeMode: "cover",
    borderRadius: 8,
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default Infleuncers;
