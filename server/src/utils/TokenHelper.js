import jwt from "jsonwebtoken";
import schoolModel from "../models/schoolModel.js";
import {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_EXPIRATION_TIME_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRATION_TIME_REFRESH_TOKEN,
} from "../config/config.js";
import Employee from "../models/employeeModel.js";
import studentModel from "../models/studentModel.js";
import Guardian from "../models/guardianModel.js";

// encode Access Token
export const createAccessToken = (_id, role, userLockId) => {
  const payload = { _id, role, userLockId };
  const options = { expiresIn: JWT_EXPIRATION_TIME_ACCESS_TOKEN };
  return jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, options);
};

// decode access token
export const verifyAccessToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
    return decodedToken;
  } catch (e) {
    return null;
  }
};

// Encode Refresh Token
export const EncodeRefreshToken = async (userID) => {
  const KEY = JWT_SECRET_REFRESH_TOKEN;
  const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME_REFRESH_TOKEN };
  const PAYLOAD = { id: userID };
  const token = jwt.sign(PAYLOAD, KEY, EXPIRE);

  let user =
    (await Employee.findById(userID)) ||
    (await studentModel.findById(userID)) ||
    (await Guardian.findById(userID)) ||
    (await schoolModel.findById(userID));

  if (!user) {
    throw new Error("User not found for refresh token update");
  }

  await user.constructor.findOneAndUpdate(
    { _id: userID },
    { $set: { refresh_token: token } },
    { new: true }
  );
  return token;
};

// Decode Refresh Token
export const DecodeRefreshToken = (token) => {
  try {
    const KEY = JWT_SECRET_REFRESH_TOKEN;
    return jwt.verify(token, KEY);
  } catch (e) {
    console.error("Invalid or expired refresh token:", e.message);
    return null;
  }
};
