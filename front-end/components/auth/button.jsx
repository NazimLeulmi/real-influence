import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function AuthBtn({ handleSubmit, submitForm, disabled, text }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={s.btn}
      onPress={
        text === "SIGN UP"
          ? handleSubmit(submitForm)
          : () => navigation.navigate("App")
      }
      disabled={disabled}
    >
      {disabled ? <ActivityIndicator size="small" color="white" /> : null}
      <Text style={s.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    width: "100%",
    backgroundColor: "#FFD700",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    borderBottomColor: "rgba(0,0,0,.1)",
    borderBottomWidth: 1,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 22,
    color: "black",
    letterSpacing: 1,
    marginLeft: 15,
  },
});

export default AuthBtn;
