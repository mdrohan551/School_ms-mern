import Employee from "../models/employeeModel.js";
import Guardian from "../models/guardianModel.js";
import bcrypt from "bcrypt";
import { createAccessToken, EncodeRefreshToken } from "../utils/TokenHelper.js";
import School from "../models/schoolModel.js";
import studentModel from "../models/studentModel.js";
import crypto from "crypto";
// Allowable roles
const VALID_ROLES = ["Admin", "Employee", "Student", "Guardian"];
export const loginUserService = async (req) => {
  try {
    const { email, userName, role, password } = req.body;
    // === 1. Basic validation ===
    if (!role || !VALID_ROLES.includes(role)) {
      return { statusCode: 400, status: false, message: "Invalid role" };
    }
    if ((!email && !userName) || !password) {
      return {
        statusCode: 400,
        status: false,
        message: "Email/UserName and password are required",
      };
    }
    let user = null;
    // === 2. Admin Login (by email) ===
    if (role === "Admin" && email) {
      user = await School.findOne({ email, role });
    }
    // === 3. Other Roles (search in parallel) ===
    else if (role !== "Admin" && userName) {
      const [emp, student, guardian] = await Promise.all([
        Employee.findOne({ userName, role }),
        studentModel.findOne({ userName, role }),
        Guardian.findOne({ userName, role }),
      ]);
      user = emp || student || guardian;
    }
    // === 4. User not found ===
    if (!user) {
      return { statusCode: 404, status: false, message: "User not found" };
    }
    // === 5. Password check (bcrypt for everyone) ===
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { statusCode: 401, status: false, message: "Invalid Credentials" };
    }
    // === 6. Generate userLockId and update ===
    const userLockId = crypto.randomBytes(12).toString("hex");
    await user.constructor.updateOne(
      { _id: user._id },
      { $set: { userLockId } }
    );
    // === 7. Create tokens ===
    const accessToken = await createAccessToken(
      user._id,
      user.role,
      userLockId
    );
    const refreshToken = await EncodeRefreshToken(user._id);
    return {
      statusCode: 200,
      status: true,
      message: "Login Success",
      accessToken,
      refreshToken,
      userLockId,
    };
  } catch (e) {
    console.error("Login error:", e);
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong! Please try again later.",
    };
  }
};
