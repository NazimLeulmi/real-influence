import axios from "axios";

async function fetchLikes(id) {
  try {
    let response = await axios.get(
      `https://realinfluence.io/influencers/${id}/likes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchLikes;
