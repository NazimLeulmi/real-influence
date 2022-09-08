import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Infleuncer from "../screens/infleuncer";

const RootStack = createStackNavigator();

function Root() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Index" component={Home} />
      <RootStack.Screen name="Influencer" component={Infleuncer} />
    </RootStack.Navigator>
  );
}

export default Root;
