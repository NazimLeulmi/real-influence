import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import Label from "../components/auth/label";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import { useFocusEffect, useRoute } from "@react-navigation/native";
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
  const [loading, setLoading] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [imgError, setImgError] = React.useState("");
  const [serverError, setServerError] = React.useState("");

  async function submitForm(formData) {
    try {
      if (!img) {
        setImgError("The profile picture is required");
        return;
      }
      setLoading(true);
      const uri = img.uri;
      const data = new FormData();
      data.append("email", route.params.email);
      data.append("name", route.params.name);
      data.append("dialCode", route.params.dialCode);
      data.append("isoCode", route.params.isoCode);
      data.append("number", route.params.number);
      data.append("password", formData.password);
      data.append("passwordc", formData.passwordc);
      const fileName = uri.split("/").pop();
      const mimeType = fileName.split(".").pop();
      data.append("profileImage", {
        uri: uri,
        type: "image/" + mimeType,
        name: fileName,
      });
      const url = "https://realinfluence.io/signup";
      const headers = { "Content-Type": "multipart/form-data" };
      let response = await fetch(url, {
        method: "post",
        body: data,
        headers: headers,
      });
      let res = await response.json();
      if (res.success === true) {
        setLoading(false);
        navigation.navigate("Auth", { screen: "SignIn" });
      }
      if (res.success === false) {
        setLoading(false);
        setServerError(res.error);
      }
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
        <PicturePicker setImg={setImg} />
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
        {imgError && !img ? <Error text={imgError} /> : null}
        {serverError ? <Error text={serverError} /> : null}

        <Btn
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          text="SUBMIT"
          errors={errors}
          disabled={loading}
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
