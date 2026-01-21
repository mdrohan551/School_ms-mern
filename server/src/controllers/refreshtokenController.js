import {createAccessToken, DecodeRefreshToken, EncodeRefreshToken} from "../utils/TokenHelper.js";
import School from "../models/schoolModel.js";
import Employee from "../models/employeeModel.js";
import studentModel from "../models/studentModel.js";
import Guardian from "../models/guardianModel.js";
import {COOKIE_EXPIRE_TIME} from "../config/config.js";


export const refreshtokenController = async (req, res) => {

    try {

        const getRefreshToken = req.cookies.refreshToken;

        if (!getRefreshToken) {
            return res.status(401).json({
                statusCode: 401,
                status: false,
                message: "Please login first"
            })
        }


        const decoded = DecodeRefreshToken(getRefreshToken);

        if (!decoded) {
            return res.status(403).json({
                statusCode: 403,
                status: false,
                message: "Refresh token invalid or expired"
            });
        }



       const userId = decoded.id;

       const user =
           (await School.findById(userId))||(await Employee.findById(userId))||(await studentModel.findById(userId))||(await Guardian.findById(userId));
       if (!user) {
           return res.status(404).json({
               statusCode: 404,
               status: false,
               message: "User not found",
           });
       }

       // generate new token
         const newAccessToken = createAccessToken(user._id,user.role);
         const newRefreshToken =await EncodeRefreshToken(user._id)

        await user.updateOne({refreshToken: newRefreshToken})

        const accessTokenOptions  = {
            httpOnly: true,
            secure: true,
            sameSite: "none", // Cross-site cookie support (CORS)
            maxAge: COOKIE_EXPIRE_TIME, // 24 hours
            path: "/",
        };
        const refreshTokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 দিন
            path: "/",
        };

        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);



        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Success",
        });

    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }


}