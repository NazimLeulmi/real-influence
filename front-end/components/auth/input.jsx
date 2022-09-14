import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function AuthInput({ control, name, error, password }) {
  const [focused, setFocused] = React.useState(false);

  const placeholders = {
    email: "Enter your email address",
    name: "Enter your name",
    number: "Enter your phone number",
    password: "Enter your password",
    passwordc: "Confirm your password",
  };
  const icons = {
    email: "email",
    name: "account",
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
        value: 10,
        message: "The maximum length is 20 characters",
      },
    },
    number: {
      required: { value: true, message: "The mobile number is required" },
      minLength: {
        value: 3,
        message: "The minimum length is 10 characters",
      },
      maxLength: {
        value: 10,
        message: "The maximum length is 10 characters",
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
              style={focused ? s.focused : s.input}
              placeholder={placeholders[name]}
              placeholderTextColor="rgba(0,0,0,.25)"
              onChangeText={onChange}
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
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
  focused: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,.65)",
    borderLeftWidth: 5,
    borderLeftColor: "darkgold",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 15,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    color: "rgba(0,0,0,.25)",
  },
});

export default AuthInput;