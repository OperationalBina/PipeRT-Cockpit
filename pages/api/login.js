import * as jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { USERS, JWT_EXPIRATION, JWT_KEY } from "../../config";
import * as CryptoJS from "crypto-js";

function validate(username, password) {
  const usersJson = JSON.parse(USERS);

  if (USERS.length == 0) {
    throw "Users dosn't exist";
  } else if (usersJson[username] == password) {
    return true;
  } else {
    return false;
  }
}

export default async function handler(req, res) {
  const reqBody = JSON.parse(req.body);
  const username = reqBody["username"];
  const password = reqBody["password"];

  const hashedPassword = CryptoJS.SHA256(password).toString()

  if (validate(username, hashedPassword)) {
    const token = jwt.sign({ username }, JWT_KEY, {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRATION,
    });

    res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
    res.json({});
  } else {
    res.status(401).json({});
  }
}
