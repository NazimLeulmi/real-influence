import React, { useContext } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { s } from "./signUpOne";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import Label from "../components/auth/label";
import Header from "../components/auth/header";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import Link from "../components/auth/link";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import AuthBrand from "../components/auth/brand";

function SignIn({ navigation }) {
  // React hook form state
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const route = useRoute();
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = useContext(AuthContext);

  async function submitForm(formData) {
    setLoading(true);
    try {
      let response = await axios.post(
        "http://194.233.163.93:8888/signin",
        formData
      );
      let data = await response.data;
      if (data.isValid === false) {
        console.log(data.error);
        setError("password", { message: data.error });
      }
      if (data.success === true) setUser(data.user);
      setLoading(false);
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
    <KeyboardAvoidingView style={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <AuthBrand text="SIGN IN" />
        <Header text="Enter your email address and password to join our community" />
        {/* EMAIL ADDRESS INPUT */}
        <Label text="Email Address" />
        <Input control={control} name="email" error={errors.email} />
        {errors.email ? <Error text={errors.email.message} /> : null}
        {/* PASSWORD INPUT */}
        <Label text="Password" />
        <Input control={control} name="password" error={errors.password} />
        {errors.password ? <Error text={errors.password.message} /> : null}
        <Btn
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          text="SIGN IN"
          disabled={loading}
        />
        <Link route={route.name} navigate={navigation.navigate} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
