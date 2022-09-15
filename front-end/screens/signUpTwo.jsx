import React from "react";
import { KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import Label from "../components/auth/label";
import Header from "../components/auth/header";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import { useFocusEffect } from "@react-navigation/native";
import AuthBrand from "../components/auth/brand";
import PicturePicker from "../components/auth/imagePicker";
import Countries from "../components/auth/countries";

function SignUpTwo({ navigation }) {
  const route = useRoute();
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
  const [disabled, setDisabled] = React.useState(false);

  async function submitForm(formData) {
    try {
      setDisabled(true);
      // let response = await axios.post(
      //   "http://192.168.1.103:8888/signup",
      //   formData
      // );
      // let data = await response.data;
      // if (data.isValid === true) navigation.navigate("SignIn");
      // for (const errorName in data.errors) {
      //   console.log(`${errorName}: ${data.errors[errorName]}`);
      //   if (data.errors[errorName]) {
      //     setError(errorName, {
      //       type: "server",
      //       message: data.errors[errorName],
      //     });
      //   }
      // }
      setDisabled(false);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      return function () {
        reset();
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView style={s.container} keyboardVerticalOffset={50}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthBrand text="Sign up" />
        <Header text="Upload your profile picture , and enter a strong password" />
        {/* UPLOAD PROFILE IMAGE */}
        <PicturePicker />
        {/* PASSWORD INPUT */}
        <Label text="Password" />
        <Input control={control} name="password" error={errors.password} />
        {errors.password ? <Error text={errors.password.message} /> : null}
        {/* PASSWORD CONFIRMATION */}
        <Label text="Password confirmation" />
        <Input
          control={control}
          name="passwordc"
          error={errors.passwordc}
          password={password.current}
        />
        {errors.passwordc ? <Error text={errors.passwordc.message} /> : null}

        <Btn
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          text="SUBMIT"
          disabled={disabled}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 20,
    paddingTop: 40,
  },
});

export default SignUpTwo;
