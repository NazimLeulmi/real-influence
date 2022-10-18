import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../../screens/intro";
import SignIn from "../../screens/signin";
import SignUpOne from "../../screens/signUpOne";
import SignUpTwo from "../../screens/signUpTwo";
import Otp from "../../screens/otp";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Intro"
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpOne" component={SignUpOne} />
      <Stack.Screen name="SignUpTwo" component={SignUpTwo} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
}

export default AuthStack;
