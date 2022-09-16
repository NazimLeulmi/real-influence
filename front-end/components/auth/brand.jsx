import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Logo from "../../assets/logo.png";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function AuthBrand({ text }) {
  const navigation = useNavigation();
  return (
    <View style={s.container}>
      <Animated.Image
        source={Logo}
        style={s.logo}
        entering={FadeIn.duration(500)}
      />
      <Animated.Text style={s.brand} entering={FadeInLeft.duration(1000)}>
        {text}
      </Animated.Text>
      <TouchableOpacity style={s.icon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="whitesmoke" />
      </TouchableOpacity>
    </View>
  );
}

let s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "rgba(0,0,0,.25)",
  },
  logo: {
    width: 75,
    height: 75,
  },
  brand: {
    fontFamily: "medium",
    marginLeft: 15,
    fontSize: 26,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "rgba(0,0,0,.1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
});

export default AuthBrand;
