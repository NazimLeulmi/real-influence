import React from "react";
import { KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import Label from "../components/auth/label";
import Header from "../components/auth/header";
import Input from "../components/auth/input";
import Error from "../components/auth/error";
import Btn from "../components/auth/button";
import Link from "../components/auth/link";
import { useFocusEffect } from "@react-navigation/native";
import AuthBrand from "../components/auth/brand";

function SignUp({ navigation }) {
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
        <Header route={route.name} />
        {/* EMAIL ADDRESS INPUT */}
        <Label text="Email address" />
        <Input control={control} name="email" error={errors.email} />
        {errors.email ? <Error text={errors.email.message} /> : null}
        {/* USERNAME INPUT */}
        <Label text="Full name" />
        <Input control={control} name="name" error={errors.name} />
        {errors.name ? <Error text={errors.name.message} /> : null}
        {/* MOBILE NUMBER */}
        <Label text="Mobile number" />
        <Input control={control} name="number" error={errors.number} />
        {errors.number ? <Error text={errors.number.message} /> : null}
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
          text="SIGN UP"
          disabled={disabled}
        />
        <Link route={route.name} navigate={navigation.navigate} />
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

export default SignUp;