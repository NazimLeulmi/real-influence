import axios from "axios";

async function fetchInfluencers() {
  try {
    let response = await axios.get("https://realinfluence.io/influencers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchInfluencers;
