import axios from "axios";

async function deleteImage(id) {
  try {
    let response = await axios.delete(
      `https://realinfluence.io/influencers/gallery/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default deleteImage;
