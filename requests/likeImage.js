import axios from "axios";

async function likeImage(props) {
  try {
    let response = await axios.post("http://localhost:8888/influencers/like", {
      imageId: props.imageId,
      influencerId: props.influencerId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default likeImage;
