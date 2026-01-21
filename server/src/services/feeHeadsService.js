import FeeHead from "../models/feeHeadsModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

// Create Fee Head by Admin
export const createFeeHeadService = async (req) => {
  try {
    const { name } = req.body;
    const schoolID = new objID(req.headers.id);

    const exists = await FeeHead.findOne({ name, schoolID });
    if (exists) {
      return { statusCode: 400, status: false, message: "Fee head already exists" };
    }
    const data = await FeeHead.create({ name, schoolID });
    if (!data) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 201, status: true, message: "Fee Head created successfully" };
  } catch (e) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: e.message.toString()};
  }
};

// Update Fee Head by Admin
export const updateFeeHeadService = async (req) => {
  try {
    const { name } = req.body;
    const feeHeadID = new objID(req.params.feeHeadID);
    const schoolID = new objID(req.headers.id);

    const existingFeeHead = await FeeHead.findOne({ _id: feeHeadID, schoolID });
    if (!existingFeeHead) {
      return { statusCode: 404, status: false, message: "This fee head not be created" };
    }

    const updateData = await FeeHead.updateOne(
      { _id: feeHeadID, schoolID },
      { $set: {name} },
      { new: true }
    );
    if (!updateData) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 200, status: true, message: "Data has been updated"};
  } catch (e) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: e.message.toString() };
  }
};

// Delete Fee Head by Admin
export const deleteFeeHeadService = async (req) => {
  try {
    const feeHeadID = new objID(req.params.feeHeadID);
    const schoolID = new objID(req.headers.id);
    const existingFeeHead = await FeeHead.findOne({ _id: feeHeadID, schoolID });
    if (!existingFeeHead) {
      return { statusCode: 404, status: false, message: "This fee head not be created" };
    }

    const result = await FeeHead.deleteOne({ _id: feeHeadID, schoolID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 200, status: true, message: "Data has been deleted" };
  } catch (e) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: e.message.toString() };
  }
};

// Fetch Fee Head List by Admin
export const fetchFeeHeadListService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);

    const data = await FeeHead.find({ schoolID }).select("name")
    if (!data || data.length === 0) {
      return { statusCode: 404, status: false, message: "No Fee Head records found" };
    }
    return { statusCode: 200, status: true, message: "Request success", data: data };
  } catch (error) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString() };
  }
};
