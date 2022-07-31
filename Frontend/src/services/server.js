import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
});

async function signup(signUpDataObj) {
  const response = await api.post("/auth/signup", signUpDataObj);
  return response.data;
}

async function login(email, password) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

async function addScore(scoreObj) {
  const response = await api.post("/score/add", scoreObj);
  return response.data;
}

async function getLastScore(email) {
  const response = await api.get("/score/lastScore", {
    params: { userEmail: email },
  });
  return response.data;
}

async function getHighestScore(email) {
  const response = await api.get("/score/highScore", {
    params: { userEmail: email },
  });
  return response.data;
}

export { signup, login, addScore, getLastScore, getHighestScore };
