import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
      studentID:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "class",
      },
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    schoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },
      studentName: { type: String, required: true },
      logo: { type: String, default: null },
      ID:{type:Number},

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Attendance = mongoose.model("attendance", AttendanceSchema);

export default Attendance;
