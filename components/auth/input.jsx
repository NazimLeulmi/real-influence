import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function AuthInput({ control, name, error, password }) {
  const placeholders = {
    email: "Enter a valid email",
    name: "Enter your username",
    password: "Enter your password",
    passwordc: "Confirm your password",
  };
  const icons = {
    email: "email",
    name: "account",
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
        value: 10,
        message: "The maximum length is 20 characters",
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
              style={s.input}
              placeholder={placeholders[name]}
              placeholderTextColor="rgba(0,0,0,.25)"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={name === "password" || name === "passwordc"}
              value={value}
              autoComplete="password"
            />
            <Icon style={s.inputIcon} name={icons[name]} size={25} />
          </>
        )}
      />
    </View>
  );
}

let s = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#FAF9F6",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.1)",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 10,
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    right: 15,
    color: "rgba(0,0,0,.2)",
  },
});

export default AuthInput;
