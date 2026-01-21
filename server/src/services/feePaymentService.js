import Counter from "../models/Counter.js";
import Fees from "../models/feePaymentModel.js";
import mongoose from "mongoose";
import Student from "../models/studentModel.js";
import FeeStructure from "../models/feeStructureModel.js";
import FeePayment from "../models/feePaymentModel.js";
const objID = mongoose.Types.ObjectId;

// helper: next receipt number
const getNextReceiptNo = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "receiptNo" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

// helper: compute waiver amount from type/value and totalFee
const computeWaiverAmount = (waiverType, waiverValue, totalFee) => {
  const val = Number(waiverValue || 0);
  if (!val) return 0;
  if (waiverType === "Percentage") return +((totalFee * val) / 100);
  return val; // Amount
};

// Create fee payment service
export const createFeePaymentService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const body = req.body;

    const {
      studentID,
      feeHeadID,
      month,
      amountPaid = 0,
      waiverType = "Amount",
      waiverValue = 0,
      paymentMethod,
      transactionID,
      remarks,
    } = body;

    // 1. validate student & get class/year
    const student = await Student.findById(studentID);
    if (!student)
      return { statusCode: 404, status: false, message: "Student not found" };
    if (student.schoolID.toString() !== schoolID.toString())
      return {
        statusCode: 403,
        status: false,
        message: "Student does not belong to this school",
      };

    // 2. get fee structure and expected amount
    const feeStructure = await FeeStructure.findOne({
      classID: student.classID,
      academicYearID: student.academicYearID,
      schoolID: schoolID,
      feeHeadID: feeHeadID,
      "monthlyFees.month": month,
    });

    if (!feeStructure) {
      return {
        statusCode: 404,
        status: false,
        message: "Fee structure not found for this class/year/head/month",
      };
    }

    const feeDetails = feeStructure.monthlyFees.find((f) => f.month === month);
    if (!feeDetails) {
      return {
        statusCode: 404,
        status: false,
        message: "Month entry not found in fee structure",
      };
    }

    const totalFee = Number(feeDetails.amount || 0);

    // 3. compute waiver amount & due
    const waiverAmount = computeWaiverAmount(waiverType, waiverValue, totalFee);
    const paid = Number(amountPaid || 0);
    const totalPaid = paid + waiverAmount;

    let dueAmount = totalFee - totalPaid;
    if (dueAmount < 0) dueAmount = 0; // avoid negative due

    let status = "Pending";
    if (totalPaid >= totalFee) status = "Paid";
    else if (totalPaid > 0) status = "Partial";

    // 4. get receipt number
    const receiptNo = await getNextReceiptNo();

    // 5. create payment document
    const paymentDoc = new FeePayment({
      studentID,
      classID: student.classID,
      academicYearID: student.academicYearID,
      schoolID: schoolID,
      feeHeadID,
      month,

      totalFee,
      amountPaid: paid,

      waiverType,
      waiverValue,
      waiverAmount,

      dueAmount,
      receiptNo,
      collectedBy: req.user ? req.user._id : undefined,

      paymentMethod,
      transactionID,
      status,
      remarks,
    });

    const saved = await paymentDoc.save();

    return {
      statusCode: 201,
      status: true,
      message: "Payment recorded",
      data: saved,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong",
      error: e.message,
    };
  }
};

// Create Fees Record
export const createFeesService = async (req) => {
  try {
    const reqBody = req.body;
    const schoolID = new objID(req.headers.id);
    reqBody.schoolID = schoolID;

    const existingFees = await Fees.findOne({
      studentID: reqBody.studentID,
      academicYearID: reqBody.academicYearID,
    });

    if (existingFees) {
      const updatedFees = await Fees.findOneAndUpdate(
        {
          studentID: reqBody.studentID,
          academicYearID: reqBody.academicYearID,
        },
        { $set: reqBody },
        { new: true }
      );

      return {
        statusCode: 200,
        status: true,
        message: "Fees record updated successfully",
        data: updatedFees,
      };
    } else {
      const newFees = await Fees.create(reqBody);

      return {
        statusCode: 201,
        status: true,
        message: "Fees record created successfully",
        data: newFees,
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// Update Fees Record
export const updateFeesService = async (req) => {
  try {
    const reqBody = req.body;
    const feesID = new objID(req.params.feesID);

    const existingFees = await Fees.findOne({ _id: feesID });
    if (!existingFees) {
      return {
        statusCode: 404,
        status: false,
        message: "Fees record not found",
      };
    }

    const result = await Fees.updateOne(
      { _id: feesID },
      { $set: reqBody },
      { new: true }
    );
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Fees record updated successfully",
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// Delete Fees Record
export const deleteFeesService = async (req) => {
  try {
    const feesID = new objID(req.params.feesID);

    const existingFees = await Fees.findOne({ _id: feesID });
    if (!existingFees) {
      return {
        statusCode: 404,
        status: false,
        message: "Fees record not found",
      };
    }

    const result = await Fees.deleteOne({ _id: feesID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Fees record deleted successfully",
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// Fetch Fees List
export const fetchFeesListService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const matchStage = { $match: { schoolID: schoolID } };
    const projection = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const pipeline = [matchStage, projection];
    const result = await Fees.aggregate(pipeline);

    if (!result.length) {
      return {
        statusCode: 404,
        status: false,
        message: "No Fees records found",
      };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Request successful",
      data: result,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};
