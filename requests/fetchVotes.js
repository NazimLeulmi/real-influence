import axios from "axios";

async function fetchVotes(id) {
  try {
    let response = await axios.get(
      `https://realinfluence.io/influencers/${id}/votes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchVotes;
