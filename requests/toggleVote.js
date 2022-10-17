import axios from "axios";

async function toggleVote(id) {
  try {
    let response = await axios.post(
      `http://localhost:8888/influencers/${id}/votes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default toggleVote;
