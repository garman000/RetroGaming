import authModel from "../models/authModel.js";

async function signUpUserValidation(req, res, next) {
  const user = await authModel.getUserByEmail(req.body.email);
  if (user && user.length !== 0) {
    res.status(400).send({ status: "error", message: "user already exist" });
  } else {
    res.locals.user = user;
    next();
  }
}

export { signUpUserValidation };
