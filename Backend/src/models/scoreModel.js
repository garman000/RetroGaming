import { gamingAppDb } from "../index.js";

async function add(newScore) {
  try {
    const score = await gamingAppDb.from("user_scores").insert(newScore);
    return { status: "ok", scoreId: score };
  } catch (err) {
    return { status: "error", message: err.sqlMessage };
  }
}

async function getLastScore(userEmail) {
  const response = await getScoresByUser(userEmail);
  if (response.status === "error") return response;

  const score = findLast(response.scores);
  return { status: "ok", lastScore: score };
}

async function getHighScore(userEmail) {
  const response = await getScoresByUser(userEmail);
  if (response.status === "error") return response;

  const score = findHighest(response.scores);
  return { status: "ok", highestScore: score };
}

async function getScoresByUser(userEmail) {
  try {
    const scores = await gamingAppDb
      .from("user_scores")
      .where({ email: userEmail });
    return { status: "ok", scores: scores };
  } catch (err) {
    return { status: "error", message: err.sqlMessage };
  }
}

function findHighest(scores) {
  let highestScore = "";
  let maxScorePoints = 0;
  scores.forEach((score) => {
    const a = parseInt(score.score);
    if (a > maxScorePoints) {
      maxScorePoints = a;
      highestScore = score;
    }
  });
  return highestScore;
}

function findLast(scores) {
  let latestScore = "";
  let latestTime = 0;
  scores.forEach((score) => {
    const timeInMilliseconds = Date.parse(score.created_at);
    if (timeInMilliseconds > latestTime) {
      latestTime = timeInMilliseconds;
      latestScore = score;
    }
  });
  return latestScore;
}

export default { add, getLastScore, getHighScore };
