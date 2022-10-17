async function postImage(uri) {
  const data = new FormData();
  const fileName = uri.split("/").pop();
  const mimeType = fileName.split(".").pop();
  data.append("galleryImage", {
    uri: uri,
    type: "image/" + mimeType,
    name: fileName,
  });
  const url = "http://localhost:8888/influencers/gallery";
  const headers = { "Content-Type": "multipart/form-data" };
  let response = await fetch(url, {
    method: "post",
    body: data,
    headers: headers,
    credentials: "include",
  });
  let res = await response.json();
  return res;
}

export default postImage;
