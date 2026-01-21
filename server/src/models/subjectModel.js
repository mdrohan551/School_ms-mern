import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    marks: {
      type: Number,
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

// subjectName must be unique per class + school
SubjectSchema.index(
  { subjectName: 1, classID: 1, schoolID: 1 },
  { unique: true }
);
SubjectSchema.index({ schoolID: 1, classID: 1 });

const Subject = mongoose.model("subject", SubjectSchema);
export default Subject;
