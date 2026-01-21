import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        logoImage: {
            type: String,
            default: "",
        },
        instituteName: {
            type: String,
            default: "",
        },
        tagline: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        countresAndZila: { type: String, default: "" },
        role: {
            type: String,
            default: "Admin",
        },
        userLockId: {
            type: String,
            default: () => Math.random().toString(36).substring(2, 10), // 8-digit random string
        },

        forgotPasswordOtp: {
            type: String,
            default: "",
        },
        refresh_token: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"],
            default: "Active",
        },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const School = mongoose.model("school", SchoolSchema);

export default School;
