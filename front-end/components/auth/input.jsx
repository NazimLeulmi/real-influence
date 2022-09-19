import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function AuthInput({ control, name, error, password, number }) {
  const placeholders = {
    email: "email@domain.com",
    name: "Lara Croft",
    country: "+XXX",
    number: "XXXXXXXXX",
    password: "Enter your password",
    passwordc: "Confirm your password",
  };
  const icons = {
    email: "email",
    name: "account",
    country: "flag",
    number: "phone",
    password: "lock",
    passwordc: "lock",
  };
  const rules = {
    email: {
      required: { value: true, message: "The email is required" },
      minLength: {
        value: 6,
        message: "The minimum length is 6 characters",
      },
      maxLength: {
        value: 60,
        message: "The maximum length is 60 characters",
      },
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "The email is invalid",
      },
    },
    name: {
      required: { value: true, message: "The username is required" },
      minLength: {
        value: 3,
        message: "The minimum length is 3 characters",
      },
      maxLength: {
        value: 20,
        message: "The maximum length is 20 characters",
      },
    },
    number: {
      required: { value: true, message: "The mobile number is required" },
      minLength: {
        value: 7,
        message: "The minimum length is 7 characters",
      },
    },
    password: {
      required: { value: true, message: "The password is required" },
      minLength: {
        value: 8,
        message: "The minimume length is 8 characters",
      },
    },
    passwordc: {
      required: {
        value: true,
        message: "The password confirmation is required",
      },
      validate: (value) =>
        value === password || "The password confirmation doesn't match",
    },
  };
  return (
    <View style={s.inputContainer}>
      <Controller
        defaultValue=""
        control={control}
        name={name}
        rules={rules[name]}
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={number ? s.number : s.input}
              placeholder={placeholders[name]}
              placeholderTextColor="rgba(0,0,0,.25)"
              onChangeText={onChange}
              secureTextEntry={name === "password" || name === "passwordc"}
              value={value}
              keyboardType={number ? "numeric" : null}
            />
            <Icon style={s.inputIcon} name={icons[name]} size={25} />
          </>
        )}
      />
    </View>
  );
}

export let s = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,.65)",
    borderLeftWidth: 3,
    borderLeftColor: "gold",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 15,
    position: "relative",
  },
  number: {
    height: 55,
    backgroundColor: "rgba(255,255,255,.65)",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 15,
    position: "relative",
    width: width - 150,
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    color: "rgba(0,0,0,.25)",
  },
});

export default AuthInput;
