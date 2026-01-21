import mongoose from "mongoose";

const FeePaymentSchema = new mongoose.Schema(
  {
    studentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    academicYearID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "academicYear",
      required: true,
    },
    schoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },

    feeHeadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feeHead",
      required: true,
    },

    month: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      required: true,
    },

    // ---- financial snapshot ----
    totalFee: { type: Number, required: true }, // snapshot of the expected fee at payment time
    amountPaid: { type: Number, required: true },

    // waiver can be provided as amount or percentage
    waiverType: {
      type: String,
      enum: ["Amount", "Percentage"],
      default: "Amount",
    },
    waiverValue: { type: Number, default: 0 }, // number: if Percentage, then percent value (e.g. 10 => 10%)
    waiverAmount: { type: Number, default: 0 }, // computed amount actually waived

    dueAmount: { type: Number, default: 0 },

    receiptNo: { type: Number, unique: true },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank", "Mobile Banking"],
      default: "Cash",
    },
    transactionID: { type: String },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Paid",
    },
    remarks: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const FeePayment = mongoose.model("feepayment", FeePaymentSchema);

export default FeePayment;
