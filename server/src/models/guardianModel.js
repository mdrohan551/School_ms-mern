import mongoose from "mongoose";

const GuardianSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    forgotPasswordOtp: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    fatherName: {
      type: String,
      trim: true,
      default: "",
    },
    fatherNID: {
      type: String,
      trim: true,
      default: "",
    },
    fatherOccupation: {
      type: String,
      default: "",
    },
    fatherEducation: {
      type: String,
      default: "",
    },
    fatherPhone: {
      type: String,
      trim: true,
      default: "",
    },
    fatherIncome: {
      type: String,
      trim: true,
      default: "",
    },
    motherName: {
      type: String,
      default: "",
    },
    motherNID: {
      type: String,
      default: "",
    },
    motherOccupation: {
      type: String,
      default: "",
    },
    motherEducation: {
      type: String,
      default: "",
    },
    motherPhone: {
      type: String,
      default: "",
    },
    motherIncome: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Guardian",
    },
    userLockId: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 10), // 8-digit random string
    },
    studentID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student", // Reference to students
        required: true,
      },
    ],
    schoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Guardian = mongoose.model("guardian", GuardianSchema);

export default Guardian;
