import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            sparse: true,
        },
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
        role: {
            type: String,
            enum: ["Teacher", "Principal", "Accountant", "Staff"],
            required: true,
        },
        userLockId: {
            type: String,
            default: () => Math.random().toString(36).substring(2, 10), // 8-digit random string
        },
        image: {
            type: String,
            default: null,
        },
        dateOfJoining: {
            type: Date,
            default: Date.now(),
        },
        salary: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        experience: {
            type: String,
            default: "",
        },
        nationalID: {
            type: String,
            unique: true,
            sparse: true, // ✅ allow multiple null/undefined values
            default: "",
        },
        religion: {
            type: String,
            default: "",
        },
        education: {
            type: String,
            default: "",
        },
        bloodGroup: {
            type: String,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            trim: true,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"], // Standardized capitalization
            default: "Active",
        },
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

const Employee = mongoose.model("employee", EmployeeSchema);

export default Employee;
