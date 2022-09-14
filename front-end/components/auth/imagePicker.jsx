import React, { useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AuthLabel from "./label";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function PicturePicker() {
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={s.placeholder}>
      {image ? (
        <Image source={{ uri: image }} style={s.img} />
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
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(0,0,0,.1)",
    alignSelf: "center",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 125,
  },
});

export default PicturePicker;
