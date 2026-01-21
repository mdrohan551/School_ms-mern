import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const Counter = mongoose.model("counter", CounterSchema);
export default Counter;
