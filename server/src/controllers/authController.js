
// admin login
import {COOKIE_EXPIRE_TIME, JWT_EXPIRATION_TIME_REFRESH_TOKEN} from "../config/config.js";
import {loginUserService} from "../services/authService.js";

export const loginUser = async (req, res) => {
    let result = await loginUserService(req);
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

    res.cookie("accessToken", result.accessToken, accessTokenOptions);
    res.cookie("refreshToken", result.refreshToken, refreshTokenOptions);

    return res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        userLockId: result.userLockId

    });
}