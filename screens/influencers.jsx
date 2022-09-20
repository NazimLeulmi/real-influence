import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Bg from "../assets/background.jpg";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topbar";
import { InfluencersContext } from "../context/infContext";
import Search from "../components/search";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class Influencer extends React.PureComponent {
  navigate = () => {
    this.props.navigation.navigate("Influencers", {
      screen: "Influencer",
      params: {
        name: this.props.name,
        img: this.props.img,
        bio: this.props.bio,
      },
    });
  };
  render() {
    return (
      <TouchableOpacity style={s.influencer} onPress={this.navigate}>
        <Image
          source={{ uri: "http://192.168.1.102:8888/" + this.props.img }}
          style={s.img}
        />
        <Text style={s.name}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

function InfluencersList() {
  const { influencers } = useContext(InfluencersContext);
  const [filtered, setFiltered] = useState(influencers);
  const [text, setText] = useState("");
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <Influencer
        name={item.name}
        img={item.profileImg}
        bio={item.bio}
        navigation={navigation}
      />
    );
  }

  async function filter(text) {
    const copy = [...influencers];
    const filtered = await copy.filter((influencer) =>
      influencer.name.includes(text)
    );
    setFiltered(filtered);
  }

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <TopBar title="influencers" />
      <Search value={text} onChange={filter} />
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  bg: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  influencer: {
    alignItems: "center",
    alignSelf: "flex-start",
  },
  img: {
    width: width / 3 - 10,
    height: width / 3 - 10,
    margin: 5,
    position: "relative",
    borderRadius: 8,
  },
  name: {
    fontFamily: "regular",
    fontSize: 12,
  },
});

export default InfluencersList;
