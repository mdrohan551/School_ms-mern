import mongoose from "mongoose";

const AcademicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

const AcademicYear = mongoose.model("academicYear", AcademicYearSchema);

export default AcademicYear;
