import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../screens/intro";
import DrawerNav from "./drawer";

const Root = createStackNavigator();

function RootStack() {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InfluencersList"
    >
      <Root.Screen name="Intro" component={Intro} />
      <Root.Screen name="App" component={DrawerNav} />
    </Root.Navigator>
  );
}

export default RootStack;
