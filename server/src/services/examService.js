import Exam from "../models/examModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

// Create Exam by Admin
export const createExamService = async (req) => {
  try {
    const reqBody = req.body;
    const schoolID = new objID(req.headers.id);
    reqBody.schoolID = schoolID;
    const result = await Exam.create(reqBody);
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 201,
      status: true,
      message: "Exam scheduled successfully",
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

// Update Exam by Admin
export const updateExamService = async (req) => {
  try {
    const reqBody = req.body;
    const examID = new objID(req.params.examID);

    const existingExam = await Exam.findOne({ _id: examID });
    if (!existingExam) {
      return {
        statusCode: 404,
        status: false,
        message: "Exam record not found",
      };
    }

    const result = await Exam.updateOne(
      { _id: examID },
      { $set: reqBody },
      { new: true }
    );
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Exam updated successfully",
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

// Delete Exam by Admin
export const deleteExamService = async (req) => {
  try {
    const examID = new objID(req.params.examID);

    const existingExam = await Exam.findOne({ _id: examID });
    if (!existingExam) {
      return {
        statusCode: 404,
        status: false,
        message: "Exam record not found",
      };
    }

    const result = await Exam.deleteOne({ _id: examID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Exam record deleted successfully",
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

// Fetch Exam List by Admin
export const fetchExamListService = async (req) => {
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
    const result = await Exam.aggregate(pipeline);

    if (!result.length) {
      return {
        statusCode: 404,
        status: false,
        message: "No Exam records found",
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
