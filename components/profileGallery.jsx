import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import fetchGallery from "../requests/fetchGallery";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import deleteImage from "../requests/deleteImage";

const width = Dimensions.get("window").width;
class Img extends React.PureComponent {
  deleteAlert(id) {
    Alert.alert("Confirmation", `Do you want to delete this image?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", onPress: this.props.deleteImg },
    ]);
  }

  render() {
    return (
      <Animated.View
        entering={ZoomIn.delay(this.props.index * 150)}
        exiting={ZoomOut.duration(150)}
      >
        <TouchableOpacity
          style={s.galleryItem}
          onLongPress={() => this.deleteAlert(this.props.img._id)}
        >
          <Image
            source={{ uri: "http://localhost:8888/" + this.props.img.path }}
            style={s.galleryImg}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

function ProfileGallery({ header }) {
  const { user, setUser } = useContext(AuthContext);
  const { data, refetch, isFetched } = useQuery(["gallery"], () =>
    fetchGallery(user.id)
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteImage, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["gallery"]);
    },
  });

  function deleteImg(id) {
    mutation.mutate(id);
  }

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  function renderItem({ item, index }) {
    return (
      <Img img={item} index={index} deleteImg={() => deleteImg(item._id)} />
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={data?.gallery}
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
