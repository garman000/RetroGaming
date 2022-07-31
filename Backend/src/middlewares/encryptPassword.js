import bcrypt from "bcrypt";

function encryptPassword(req, res, next) {
  const saltsRounds = 10;
  bcrypt.hash(req.body.password, saltsRounds, (err, hash) => {
    if (err) next(err);
    req.body.password = hash;
    next();
  });
}

export { encryptPassword };
