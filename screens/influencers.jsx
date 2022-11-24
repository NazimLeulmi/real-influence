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
import Search from "../components/search";
import fetchInfluencers from "../requests/fetchInfluencers";
import { useQuery } from "@tanstack/react-query";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class Influencer extends React.PureComponent {
  navigate = () => {
    this.props.navigation.navigate("Influencers", {
      screen: "Influencer",
      params: {
        _id: this.props.id,
      },
    });
  };
  render() {
    return (
      <TouchableOpacity style={s.influencer} onPress={this.navigate}>
        <Image
          source={{
            uri: "https://realinfluence.io/" + this.props.img,
          }}
          style={s.img}
        />
        <Text style={s.name}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

function InfluencersList() {
  const { data, isLoading, refetch } = useQuery(
    ["influencers"],
    fetchInfluencers
  );
  const [filtered, setFiltered] = useState(data?.influencers);
  const [text, setText] = useState("");
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <Influencer
        id={item._id}
        name={item.name}
        img={item.profileImg}
        bio={item.bio}
        navigation={navigation}
      />
    );
  }

  async function filter(text) {
    const copy = [...data?.influencers];
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
        data={filtered.filter(influencer => influencer.approved ? influencer : null)}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
