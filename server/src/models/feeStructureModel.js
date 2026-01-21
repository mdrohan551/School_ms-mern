import mongoose from "mongoose";

const FeeStructureSchema = new mongoose.Schema(
    {
        classID: { type: mongoose.Schema.Types.ObjectId, ref: "class", required: true },
        academicYearID: { type: mongoose.Schema.Types.ObjectId, ref: "academicYear", required: true },
        schoolID: { type: mongoose.Schema.Types.ObjectId, ref: "school", required: true },
        feeHeadID: { type: mongoose.Schema.Types.ObjectId, ref: "feeHead", required: true },
        monthlyFees: [
            {
                month: { type: String, enum: ["January","February","March","April","May","June","July","August","September","October","November","December"], required: true },
                amount: { type: Number, required: true }
            }
        ]
    },
    { timestamps: true, versionKey: false }
);

const FeeStructure = mongoose.model("feeStructure", FeeStructureSchema);
export default FeeStructure;
