import axios from "axios";

async function fetchInfluencers() {
  try {
    let response = await axios.get("http://localhost:8888/influencers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchInfluencers;
