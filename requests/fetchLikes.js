import axios from "axios";

async function fetchLikes(id) {
  try {
    let response = await axios.get(
      `http://localhost:8888/influencers/likes/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchLikes;
