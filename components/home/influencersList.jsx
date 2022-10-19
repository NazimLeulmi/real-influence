import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Influencer from "./influencer";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

function InfluencersList({ data }) {
  const navigation = useNavigation();
  function renderItem({ item, index }) {
    return (
      <Influencer
        influencer={item}
        index={index}
        navigate={navigation.navigate}
      />
    );
  }
  return (
    <View style={s.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        estimatedItemSize={50}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: width,
  },
});

export default InfluencersList;
