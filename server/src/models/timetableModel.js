import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
    ],
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    roomNo: {
      type: String,
    },
    subjectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
    },
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
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

const Timetable = mongoose.model("timetable", TimetableSchema);

export default Timetable;
