import authModel from "../models/authModel.js";

async function signup(req, res) {
  const response = await authModel.signup(req.body);
  if (response.status === "ok") res.status(201).json(response);
  else res.status(401).json(response);
}

async function login(req, res) {
  res.status(201).send(res.locals.response);
}

async function logout(req, res) {
  console.log("logOut");
}

export default { signup, login, logout };
