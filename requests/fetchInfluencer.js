import axios from "axios";

async function fetchInfluencer(id) {
  try {
    let response = await axios.get(
      `https://realinfluence.io/influencers/${id}/`
    );
    return response.data.influencer;
  } catch (error) {
    console.log(error);
  }
}

export default fetchInfluencer;

