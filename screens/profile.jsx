import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/topbar";
import Bg from "../assets/background.jpg";
import Header from "../components/header";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import fetchGallery from "../requests/fetchGallery";
import fetchVotes from "../requests/fetchVotes";
import { AuthContext } from "../context/authContext";
import toggleVote from "../requests/toggleVote";
import Carousel from "../components/shared/carousel";
import ProfileImage from "../components/shared/profileImage";
import VoteBtn from "../components/voteBtn";
import fetchInfluencer from "../requests/fetchInfluencer";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Profile({ route }) {
  const { _id } = route.params;
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // [1] Fetch Influencer's Data
  const { data: influencer, isLoading: loadingProfile } = useQuery(["influencer"], () =>
    fetchInfluencer(_id)
  );

  // [2] Fetch Influencer's Votes
  const { data: votes, isLoading: loadingVotes } = useQuery(["votes"], () => fetchVotes(_id));

  // [3] Fetch Influencer's Gallery
  const { data: gallery, isLoading: loadingGallery } = useQuery(["gallery"], () =>
    fetchGallery(_id)
  );
  const [voted, setVoted] = useState(false);

  const mutation = useMutation(toggleVote, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["votes"]);
    },
  });

  useEffect(() => {
    // run for normal users only
    if (user.type === "user") {
      let voted = false;
      if (votes) {
        for (let i = 0; i < votes.votes.length; i++) {
          if (votes.votes[i].user === user.id) {
            voted = true;
          }
        }
        setVoted(voted);
      }
    }
  }, [votes]);

  function vote() {
    mutation.mutate(_id);
  }

  if (loadingProfile || loadingGallery || loadingVotes) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="black" size="large" />
      </View>
    )
  }

  return (
    <View style={s.container}>
      <View>
        <Image source={Bg} style={s.bg} />
      </View>
      <ScrollView>
        <TopBar title="Influencer Profile" stack={true} />
        <ProfileImage img={influencer.profileImg} />
        <View style={s.imgFooter}>
          <Text style={s.name}>{influencer.name}</Text>
          <VoteBtn
            vote={vote}
            votes={votes.votes.length}
            type={user.type}
            voted={voted}
          />
        </View>
        <Text style={s.header}>BIO</Text>
        <Text style={s.text}>{influencer.bio}</Text>
        <Header text="GALLERY" id={_id} />
        <Carousel data={gallery.gallery} id={_id} />
      </ScrollView>
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
  imgFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  name: {
    fontFamily: "regular",
    fontSize: 18,
    marginRight: "auto",
    marginLeft: 15,
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
