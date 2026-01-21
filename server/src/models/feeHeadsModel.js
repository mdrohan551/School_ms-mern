import mongoose from "mongoose";

const FeeHeadsSchema = new mongoose.Schema(
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

const FeeHead = mongoose.model("feeHead", FeeHeadsSchema);

export default FeeHead;
