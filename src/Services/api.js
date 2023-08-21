import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function getPosts(token) {
    const config = createConfig(token);

    const promise = axios.get(`${BASE_URL}/home`, config)

    return promise
}

export function newPost(body, token) {
    const config = createConfig(token);
    
    const {link, postDescription} = body

    const promise = axios.post(`${BASE_URL}/home`,{link, postDescription}, config)

    return promise
}

export function getPostsByUserId(id, token) {
  const config = createConfig(token);
  console.log(config)
  const promise = axios.get(`${BASE_URL}/user/${id}`, config)
  console.log(promise)
  return promise
}