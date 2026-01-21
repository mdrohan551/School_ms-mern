import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/AuthVerification.js";
import School from "../models/schoolModel.js";
import Employee from "../models/employeeModel.js";
import studentModel from "../models/studentModel.js";
import Guardian from "../models/guardianModel.js";
import {refreshtokenController} from "../controllers/refreshtokenController.js";

const router = express.Router();

router.post("/login", authController.loginUser);
// user role get from front end and return role
router.post(
  "/auth/userRole/:userLockId",
  authenticateUser,
  async (req, res) => {
    const { userLockId } = req.params;
    let userRole;
    userRole =
      (await School.findOne({ userLockId: userLockId })) ||
      (await Employee.findOne({ userLockId: userLockId })) ||
      (await studentModel.findOne({ userLockId: userLockId })) ||
      (await Guardian.findOne({ userLockId: userLockId }));
    if (!userRole) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      status: true,
      currentRole: userRole.role,
    });
  }
);

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error(err);
  }
});







// refresh token handler


router.get('/refresh-token',refreshtokenController)









export default router;
