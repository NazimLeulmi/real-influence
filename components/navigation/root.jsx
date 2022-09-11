import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "./drawer";
import AuthStack from "./auth";

const Root = createStackNavigator();

function RootStack() {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      <Root.Screen name="Auth" component={AuthStack} />
      <Root.Screen name="App" component={DrawerNav} />
    </Root.Navigator>
  );
}

export default RootStack;
