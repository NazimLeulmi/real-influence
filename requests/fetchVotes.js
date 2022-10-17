import axios from "axios";

async function fetchVotes(id) {
  try {
    let response = await axios.get(
      `http://localhost:8888/influencers/${id}/votes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchVotes;
