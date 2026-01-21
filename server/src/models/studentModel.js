import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    FatherName: {
      type: String,
      default: null,
    },
    FatherNationalID: {
      type: String,
      default: null,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
    },
    profession: {
      type: String,
      default: null,
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    dateOfAdmission: {
      type: Date,
      default: Date.now(),
    },
    discount: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      default: "",
    },
    birthID: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    previousSchool: {
      type: String,
      trim: true,
      default: "",
    },
    religion: {
      type: String,
      default: "",
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    totalSiblings: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "Student",
    },
    userLockId: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 10), // 8-digit random string
    },

    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    schoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },
    academicYearID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "academicYear",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Student = mongoose.model("student", StudentSchema);

export default Student;
