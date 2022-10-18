import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import MyCarousel from "../components/carousel";
import Header from "../components/header";
import Empty from "../assets/empty.png";
import Animated, { ZoomInLeft } from "react-native-reanimated";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import fetchVotes from "../requests/fetchVotes";
import { AuthContext } from "../context/authContext";
import toggleVote from "../requests/toggleVote";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Profile({ route, navigation }) {
  const { name, img, bio, id } = route.params;
  const { user } = useContext(AuthContext);
  const { data, isFetched } = useQuery(["gallery"], () => fetchGallery(id));
  const { data: votes } = useQuery(["votes"], () => fetchVotes(id));
  const [voted, setVoted] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(toggleVote, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["votes"]);
    },
  });

  useEffect(() => {
    let voted = false;
    if (votes) {
      for (let i = 0; i < votes.votes.length; i++) {
        if (votes.votes[i].user === user.id) {
          voted = true;
        }
      }
      setVoted(voted);
    }
  }, [votes]);

  function vote() {
    mutation.mutate(id);
  }

  if (isFetched) {
    return (
      <View style={s.container}>
        <View>
          <Image source={Bg} style={s.bg} />
        </View>
        <ScrollView>
          <TopBar title="Influencer Profile" stack={true} />
          <Animated.View
            style={s.imgContainer}
            entering={ZoomInLeft.duration(500)}
          >
            <Image
              source={{
                uri: "http://localhost:8888/" + img,
              }}
              style={s.img}
            />
          </Animated.View>
          <View style={s.content}>
            <Text style={s.name}>{name}</Text>
          </View>
          <Text style={s.header}>BIO</Text>
          <Text style={s.text}>{bio}</Text>
          <Header text="GALLERY" id={id} />

          {data?.gallery.length === 0 ? (
            <Image source={Empty} style={s.empty} />
          ) : (
            <MyCarousel gallery={data?.gallery} id={id} />
          )}
          <TouchableOpacity
            style={s.btn}
            disabled={user.type === "influencer"}
            onPress={vote}
          >
            <Text style={s.vote}>{votes?.votes.length} votes</Text>
            <Icon
              size={25}
              name={voted ? "account-arrow-down" : "account-arrow-up"}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const s = StyleSheet.create({
  btn: {
    backgroundColor: "rgba(0,0,0,.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 15,
    width: 135,
    maxWidth: 200,
    borderRadius: 10,
  },
  vote: {
    fontFamily: "regular",
    fontSize: 18,
    marginRight: 10,
  },
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
  imgContainer: {
    width: width / 1.75,
    height: width / 1.75,
    borderRadius: width / 1.75,
    alignSelf: "center",
    margin: 15,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: width / 1.75,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.15)",
  },
  content: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 5,
  },
  name: {
    fontFamily: "regular",
    fontSize: 18,
  },

  header: {
    fontFamily: "medium",
    textTransform: "uppercase",
    fontSize: 20,
    letterSpacing: 1.5,
    margin: 15,
  },
  text: {
    fontFamily: "regular",
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    paddingBottom: 15,
  },
  empty: {
    width: width,
    height: 300,
  },
});

export default Profile;
