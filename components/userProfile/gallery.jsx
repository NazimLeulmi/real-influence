import React, { useContext, useCallback } from "react";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import fetchGallery from "../../requests/fetchGallery";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import deleteImage from "../../requests/deleteImage";
import GalleryImage from "./galleryImage";
import { useFocusEffect } from "@react-navigation/native";

const width = Dimensions.get("window").width;

function ProfileGallery({ header }) {
  const { user, setUser } = useContext(AuthContext);
  const { data, refetch, isFetched } = useQuery(["myGallery"], () =>
    fetchGallery(user.id)
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteImage, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["myGallery"]);
    },
  });

  function deleteAlert(id) {
    Alert.alert("Confirmation", `Do you want to delete this image?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", onPress: () => mutation.mutate(id) },
    ]);
  }

  function renderItem({ item, index }) {
    if (isFetched) {
      return (
        <GalleryImage
          img={item}
          index={index}
          alert={() => deleteAlert(item._id)}
        />
      );
    }
  }

  if (isFetched) {
    return (
      <View style={s.container}>
        <FlatList
          data={data.gallery}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={3}
          ListHeaderComponent={header}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
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
