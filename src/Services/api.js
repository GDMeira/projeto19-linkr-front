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

  const { link, postDescription } = body

  const promise = axios.post(`${BASE_URL}/home`, { link, postDescription }, config)

  return promise
}

export function getPostsByUserId(id, token) {
  const config = createConfig(token);
  console.log(config)
  const promise = axios.get(`${BASE_URL}/user/${id}`, config)
  return promise
}

export function searchUser(search, token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/search?username=${search}`, config)
  return promise
}

<<<<<<< HEAD
export function followUser(id, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/users/${id}/follow`, {}, config)
  return promise
=======
export function getTrendings(token, setTrending) {
  axios.get(`${BASE_URL}/trending`, createConfig(token))
    .then((res) => {
      setTrending(res.data);
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
>>>>>>> main
}