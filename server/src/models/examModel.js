import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    examDate: {
      type: Date,
      required: true,
    },
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
      required: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Exam = mongoose.model("exam", ExamSchema);

export default Exam;
