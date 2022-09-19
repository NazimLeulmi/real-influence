import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

function AuthBtn({ handleSubmit, submitForm, disabled, text, errors }) {
  return (
    <TouchableOpacity
      style={s.btn}
      disabled={disabled}
      onPress={handleSubmit(submitForm)}
    >
      {disabled ? <ActivityIndicator size="small" color="black" /> : null}
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
