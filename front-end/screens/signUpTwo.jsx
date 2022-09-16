import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import Label from "../components/auth/label";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import { useFocusEffect } from "@react-navigation/native";
import AuthBrand from "../components/auth/brand";
import PicturePicker from "../components/auth/imagePicker";

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
  const scrollViewRef = React.useRef();

  async function submitForm(formData) {
    try {
      console.log(formData);
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
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={50}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthBrand text="SIGN UP" />
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
