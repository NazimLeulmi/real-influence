import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const width = Dimensions.get("window").width;

function Search({ onChange, text }) {
  return (
    <View style={s.container}>
      <TextInput
        value={text}
        style={s.search}
        placeholder="Search"
        placeholderTextColor="rgba(0,0,0,.25)"
        selectionColor="rgba(0,0,0,.5)"
        onChangeText={(text) => onChange(text)}
        autoComplete="password"
        autoCorrect={false}
      />
      <Icon name="magnify" style={s.icon} size={25} />
    </View>
  );
}

export default Search;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  search: {
    width: width - 10,
    height: 50,
    backgroundColor: "rgba(255,255,255,.35)",
    borderLeftWidth: 3,
    borderLeftColor: "gold",
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 15,
    position: "relative",
    margin: 10,
  },
  icon: {
    position: "absolute",
    left: 20,
    color: "rgba(0,0,0,.25)",
  },
});
