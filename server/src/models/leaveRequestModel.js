import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
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

const LeaveRequest = mongoose.model("leaveRequest", LeaveRequestSchema);

export default LeaveRequest;
