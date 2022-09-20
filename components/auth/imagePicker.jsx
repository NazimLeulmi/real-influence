import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function PicturePicker({ setImg }) {
  const [image, setImage] = useState(null);
  0;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImg(result);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={s.placeholder}>
      {image ? (
        <Image source={{ uri: image }} style={s.img} resizeMethod="resize" />
      ) : (
        <Icon name="cloud-upload" color="rgba(255,255,255,.75)" size={45} />
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(0,0,0,.25)",
    borderLeftWidth: 3,
    borderLeftColor: "gold",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "white",
    marginLeft: 15,
  },
  placeholder: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 1.5,
    alignSelf: "center",
    margin: 15,
    backgroundColor: "rgba(0,0,0,.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: width / 1.5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
  },
});

export default PicturePicker;
