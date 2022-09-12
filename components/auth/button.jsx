import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

function AuthBtn({ handleSubmit, submitForm, disabled, text }) {
  return (
    <TouchableOpacity
      style={s.btn}
      onPress={handleSubmit(submitForm)}
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
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
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
