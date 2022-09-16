import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import Label from "../components/auth/label";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import Link from "../components/auth/link";
import { useFocusEffect } from "@react-navigation/native";
import AuthBrand from "../components/auth/brand";
import { s as style } from "../components/auth/input";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Countries from "../components/auth/countries";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function SignUpOne({ navigation }) {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("+971");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");

  function submitForm(data) {
    console.log(data);
  }

  useFocusEffect(
    React.useCallback(() => {
      return function () {
        // reset();
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={s.container}
      keyboardVerticalOffset={50}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthBrand text="SIGN UP" />
        {/* EMAIL ADDRESS INPUT */}
        <Label text="Email Address" />
        <Input control={control} name="email" error={errors.email} />
        {errors.email ? <Error text={errors.email.message} /> : null}
        {/* USERNAME INPUT */}
        <Label text="Full Name" />
        <Input control={control} name="name" error={errors.name} />
        {errors.name ? <Error text={errors.name.message} /> : null}
        {/* MOBILE NUMBER */}
        <Label text="Mobile Number" />
        <View style={style.inputContainer}>
          <Icon
            name="flag"
            size={25}
            style={style.inputIcon}
            onPress={() => setShow(true)}
          />
          <TouchableOpacity
            style={s.countryPicker}
            onPress={() => setOpen(true)}
          >
            <Text style={s.pickerText}>{code}</Text>
          </TouchableOpacity>
          <Input
            control={control}
            name="number"
            error={errors.number}
            number={true}
          />
        </View>
        {errors.number ? <Error text={errors.number.message} /> : null}
        <Btn
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          text="NEXT"
          disabled={false}
        />
        <Link route={route.name} navigate={navigation.navigate} />
        <Countries open={open} setOpen={setOpen} setCode={setCode} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 20,
  },
  countryPicker: {
    height: 55,
    width: 150,
    backgroundColor: "rgba(255,255,255,.65)",
    borderLeftWidth: 3,
    borderLeftColor: "gold",
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 55,
    paddingRight: 15,
    position: "relative",
    justifyContent: "center",
    marginRight: 10,
  },
  pickerText: {
    fontFamily: "regular",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default SignUpOne;
