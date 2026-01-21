import {verifyAccessToken} from "../utils/TokenHelper.js";

export const authenticateUser = async (req, res, next) => {

  // Retrieve token from headers or cookies
  let accessToken = req.headers['accessToken'] || req.cookies['accessToken'];

  if (!accessToken) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized user. Please login first",
    });
  }
  let decodeToken = await verifyAccessToken(accessToken);

  if (!decodeToken) {
    return res.status(401).send({status: "fail", message:"Invalid or expired token. Please log in again."});
  }else{
    let id = decodeToken._id;
    let role = decodeToken.role;
    req.headers.id = id;
    req.headers.role = role;
    next()
  }
}


// Role-Based Access Control Middleware (Using Headers)
export const authorizeRole = (...roles) => (req, res, next) => {
  const userRole = req.headers["role"];

  if (!userRole || !roles.includes(userRole)) {
    return res.status(403).json({
      status: "fail",
      message: "Access Denied. Please contact your administrator."
    });
  }
  next();
};
