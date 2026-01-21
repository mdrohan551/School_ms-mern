import mongoose from "mongoose";
import AcademicYear from "../models/academicYearModel.js";
const objID = mongoose.Types.ObjectId;

// Create AcademicYear Service
export const createAcademicYearService = async (req) => {
  try {
    const {name} = req.body;
    const schoolID = new objID(req.headers.id)
    const exists = await AcademicYear.findOne({ name, schoolID });
    if (exists){
      return { status: false, statusCode: 400 , message: "AcademicYear already exists" };
    }
    const data = await AcademicYear.create({name, schoolID});
    if (!data) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 201, status: true, message: "AcademicYear Created Successfully"};
  } catch (error) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString()};
  }
};

// Update AcademicYear  by Admin
export const updateAcademicYearService = async (req) => {
  try {
    const {name} = req.body;
    const academicYearID = new objID(req.params.academicYearID);
    const schoolID = new objID(req.headers.id);

    // Check if AcademicYear exists
    const existingYear = await AcademicYear.findOne({ _id: academicYearID, schoolID });
    if (!existingYear) {
      return { statusCode: 404, status: false, message: "This year not be created"};
    }

    const result = await AcademicYear.updateOne(
      { _id: academicYearID, schoolID },
      { $set: {name} },
      { new: true }
    );
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 200, status: true, message: "Data has been updated" };
  } catch (e) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: e.message.toString() };
  }
};

// Delete AcademicYear by Admin
export const deleteAcademicYearService = async (req) => {
  try {
    const academicYearID = new objID(req.params.academicYearID);
    const schoolID = new objID(req.headers.id);

    // Check if AcademicYear exists
    const existingYear = await AcademicYear.findOne({ _id: academicYearID, schoolID });
    if (!existingYear) {
      return { statusCode: 404, status: false, message: "This year not be created"};
    }

    const result = await AcademicYear.deleteOne({ _id: academicYearID, schoolID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 200, status: true, message: "Data has been deleted" };
  } catch (e) {
    return { statusCode: 500, status: false, message: "Something went wrong!", error: e.message.toString() };
  }
};

// Fetch AcademicYear List by Admin
export const fetchAcademicYearListService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const matchStage = { $match: { schoolID } };

    const lookupStage = {
      $lookup: {
        from: 'schools',
        localField: 'schoolID',
        foreignField: '_id',
        as: 'schoolinfo'
      }
    };

    // schoolinfo array থেকে 1ম element নাও এবং শুধুমাত্র প্রয়োজনীয় field রাখো
    const addFieldsStage = {
      $addFields: {
        schoolinfo: {
          $let: {
            vars: {
              info: { $arrayElemAt: ["$schoolinfo", 0] }
            },
            in: {
              status: "$$info.status",
              logoImage: "$$info.logoImage",
              instituteName: "$$info.instituteName",
              countresAndZila: "$$info.countresAndZila",
              address: "$$info.address",
              phone: "$$info.phone"
            }
          }
        }
      }
    };

    const projection = {
      $project: {
        createdAt: 0,
        updatedAt: 0
      }
    };

    const pipeline = [matchStage, lookupStage, addFieldsStage, projection];
    const result = await AcademicYear.aggregate(pipeline);

    if (!result.length) {
      return { statusCode: 404, status: false, message: "No AcademicYear found" };
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


