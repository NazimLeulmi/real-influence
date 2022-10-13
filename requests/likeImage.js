import axios from "axios";

async function likeImage(props) {
  try {
    let response = await axios.post(
      "https://realinfluence.io/influencers/like",
      {
        imageId: props.imageId,
        influencerId: props.influencerId,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default likeImage;
