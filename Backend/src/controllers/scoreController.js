import scoreModel from "../models/scoreModel.js";

async function add(req, res) {
  const response = await scoreModel.add(req.body);
  if (response.status === "ok") res.status(201).json(response);
  else {
    res.status(401).json(response);
  }
}

async function getLastScore(req, res) {
  const response = await scoreModel.getLastScore(req.query.userEmail);
  if (response.status === "ok") res.status(201).json(response);
  else res.status(401).json(response);
}

async function getHighScore(req, res) {
  const response = await scoreModel.getHighScore(req.query.userEmail);
  if (response.status === "ok") res.status(201).json(response);
  else res.status(401).json(response);
}

export default { add, getLastScore, getHighScore };
