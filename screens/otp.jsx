import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Email from "../assets/email.png";
import axios from "axios";

const width = Dimensions.get("window").width;

function Otp() {
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  console.log(email, "otp");
  const field = useRef();

  async function verify() {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8888/users/otp", { otp: otp, email: email });
      if (response.data.success === true) {
        setLoading(false);
        setError("");
        navigation.navigate("Auth", { screen: "SignIn" })
      } else {
        setLoading(false);
        setError(response.data.error);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <KeyboardAvoidingView
      style={s.container}
      keyboardVerticalOffset={50}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.header}>Verify your email address</Text>
        <Image source={Email} style={s.img} />
        <Text style={s.text}>
          Enter the verification otp we just sent to your email address
        </Text>
        <OTPInputView
          ref={field.current}
          style={s.otp}
          pinCount={5}
          code={otp}
          onCodeChanged={setOtp}
          codeInputFieldStyle={s.otpField}
          onCodeFilled={(code) => {
            console.log("otp:", code);
          }}
        />
        <TouchableOpacity style={s.link}>
          <Text style={s.linkText}>Didn't receive the email ?</Text>
          <Text style={s.bold}>Resend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={verify} disabled={loading}>
          {loading && <ActivityIndicator color="black" size="small" />}
          {!loading && <Text style={s.btnText}>VERIFY</Text>}
        </TouchableOpacity>
        {error && <Text style={s.error}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 20,
  },
  header: {
    fontFamily: "regular",
    fontSize: 20,
    alignSelf: "center",
  },
  img: {
    width: width - 50,
    height: width - 50,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 20,
  },
  text: {
    fontFamily: "regular",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  otp: {
    width: width - 40,
    height: 60,
    alignSelf: "center",
    marginVertical: 20,
  },
  otpField: {
    color: "black",
    borderRadius: 10,
    width: 55,
    height: 55,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  linkText: {
    fontFamily: "regular",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  bold: {
    fontFamily: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  btn: {
    backgroundColor: "white",
    width: width - 50,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,.35)",
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 18,
    color: "rgba(0,0,0,.7)",
    letterSpacing: 1,
  },
  error: {
    fontFamily: "regular",
    color: "red",
    fontSize: 14,
    textAlign: "center"
  }
});

export default Otp;
