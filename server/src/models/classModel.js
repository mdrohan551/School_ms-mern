import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    teacherID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee", // Reference to employee model (teacher)
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

const Class = mongoose.model("class", ClassSchema);

export default Class;
