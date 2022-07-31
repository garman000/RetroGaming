import authModel from "../models/authModel.js";

async function emailAndPasswordValidation(req, res, next) {
  const { email, password } = req.body;
  const response = await authModel.login(email, password);
  if (response.status === "ok") {
    res.locals.response = response;
    next();
  } else {
    res.status(400).json(response);
  }
}

export { emailAndPasswordValidation };
