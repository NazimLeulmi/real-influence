import axios from "axios";

async function fetchGallery(id) {
  try {
    let response = await axios.get(
      `http://localhost:8888/influencers/${id}/gallery`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchGallery;
