import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import Label from "../components/auth/label";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AuthBrand from "../components/auth/brand";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const width = Dimensions.get("window").width;
import axios from "axios";

function SignUpTwo({ navigation }) {
  const route = useRoute();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [imgError, setImgError] = React.useState("");
  const [serverError, setServerError] = React.useState("");

  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        if (result.type !== "image") {
          setImgError("The profile picture has to be a valid image");
          setImage(null);
          return;
        }
        setImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitForm(formData) {
    try {
      if (route.params.enabled) {
        if (!image) {
          setImgError("The profile picture is required");
          setImage(null);
          return;
        }
        setLoading(true);
        const data = new FormData();
        data.append("email", route.params.email);
        data.append("name", route.params.name);
        data.append("dialCode", route.params.dialCode);
        data.append("isoCode", route.params.isoCode);
        data.append("number", route.params.number);
        data.append("password", formData.password);
        data.append("passwordc", formData.passwordc);
        const fileName = image.split("/").pop();
        const mimeType = fileName.split(".").pop();
        data.append("profileImage", {
          uri: image,
          type: "image/" + mimeType,
          name: fileName,
        });
        const url = "https://realinfluence.io/influencers/signup";
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
      } else {
        setLoading(true);
        const url = "https://realinfluence.io/users/signup";
        const response = await axios.post(url, {
          ...formData,
          email: route.params.email,
          number: route.params.number,
          isoCode: route.params.isoCode,
          dialCode: route.params.dialCode,
          name: route.params.name,
        });
        console.log(response.data, "response");
        const data = response.data;
        if (data.success === true) {
          setLoading(false);
          navigation.navigate("Auth", { screen: "SignIn" });
        }
        if (data.success === false) {
          setLoading(false);
          setServerError(data.error);
        }
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
        {route.params.enabled && (
          <TouchableOpacity onPress={pickImage} style={s.placeholder}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={s.img}
                resizeMethod="resize"
              />
            ) : (
              <Icon
                name="cloud-upload"
                color="rgba(255,255,255,.75)"
                size={45}
              />
            )}
          </TouchableOpacity>
        )}
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
        {imgError && !image ? <Error text={imgError} /> : null}
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
  placeholder: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 1.5,
    alignSelf: "center",
    margin: 15,
    backgroundColor: "rgba(0,0,0,.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    borderRadius: width / 1.5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
  },
});

export default SignUpTwo;
