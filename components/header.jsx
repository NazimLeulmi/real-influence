import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function Header({ text, btn, status, setStatus, postBio, uploadImage, id }) {
  const navigation = useNavigation();

  function action() {
    if (text === "INFLUENCERS") {
      navigation.navigate("Influencers", { screen: "InfluencersList" });
    } else if (text === "SPONSORS") {
      navigation.navigate("Sponsors");
    } else if (text === "BIO") {
      if (status === "VIEW") setStatus("EDIT");
      else {
        postBio();
      }
    } else if (text === "GALLERY" && id) {
      navigation.navigate("Influencers", {
        screen: "Gallery",
        params: {
          id: id,
        },
      });
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.header}>{text}</Text>
      {text === "INFLUENCERS" || text === "SPONSORS" ? (
        <TouchableOpacity style={s.btn} onPress={action}>
          <Text style={s.btnText}>VIEW ALL</Text>
        </TouchableOpacity>
      ) : null}
      {text === "BIO" ? (
        <TouchableOpacity style={s.btn} onPress={action}>
          {status === "VIEW" ? (
            <Icon name="pen" size={20} />
          ) : (
            <Text style={s.btnText}>SUBMIT</Text>
          )}
        </TouchableOpacity>
      ) : null}
      {text === "GALLERY" && btn ? (
        <TouchableOpacity style={s.btn} onPress={uploadImage}>
          <Icon name="image-plus" size={20} />
        </TouchableOpacity>
      ) : null}
      {text === "GALLERY" && id ? (
        <TouchableOpacity style={s.btn} onPress={action}>
          <Text style={s.btnText}>VIEW ALL</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  header: {
    fontFamily: "medium",
    textTransform: "uppercase",
    fontSize: 20,
    letterSpacing: 1.5,
  },
  btn: {
    marginLeft: "auto",
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: "regular",
    letterSpacing: 2,
    fontSize: 10,
  },
});

export default Header;
