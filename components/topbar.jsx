import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
function TopBar({ stack, title }) {
  const navigation = useNavigation();
  const route = useRoute();

  function action() {
    if (stack) {
      navigation.goBack();
    } else {
      navigation.openDrawer();
    }
  }

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={action}>
        <Icon name={stack ? "arrow-left" : "menu"} style={s.menu} />
      </TouchableOpacity>
      <Text style={s.brand}>{title}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    width: windowWidth,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,.3)",
  },
  brand: {
    fontFamily: "light",
    fontSize: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginRight: "auto",
    marginLeft: "auto",
  },
  menu: {
    color: "rgba(0,0,0,.45)",
    fontSize: 30,
  },
});

export default TopBar;
