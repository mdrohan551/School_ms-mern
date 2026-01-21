import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    message: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    audience: {
      type: String,
      enum: ["All", "Students", "Teachers", "Guardians"], // Defines announcement audience
      default: "All",
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

const Announcement = mongoose.model("announcement", AnnouncementSchema);

export default Announcement;
