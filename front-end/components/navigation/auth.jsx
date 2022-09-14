import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../../screens/intro";
import SignIn from "../../screens/signin";
import SignUp from "../../screens/signup";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Intro"
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthStack;
