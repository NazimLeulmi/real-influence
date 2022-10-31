import axios from "axios";

async function toggleVote(id) {
  try {
    let response = await axios.post(
      `https://realinfluence.io/influencers/${id}/votes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default toggleVote;
