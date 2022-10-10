import React, { useState } from "react";
import { Switch, StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

function SwitchInput({ enabled, setEnabled }) {
  const toggleSwitch = () => setEnabled((previousState) => !previousState);
  const route = useRoute();

  return (
    <View style={s.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={enabled}
      />
      <Text style={s.text}>
        {route.name === "SignIn" && !enabled && "Sign in as a normal user"}
        {route.name === "SignIn" && enabled && "Sign in as an influencer"}
        {route.name === "SignUpOne" && enabled && "Sign up as an influencer"}
        {route.name === "SignUpOne" && !enabled && "Sign up as normal user"}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontFamily: "regular",
    marginLeft: 10,
  },
});

export default SwitchInput;
