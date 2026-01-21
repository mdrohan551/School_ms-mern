import bcrypt from "bcrypt";
import { deleteImage, fileUpload, getPublicID } from "../helper/helper.js";
import mongoose from "mongoose";
import School from "../models/schoolModel.js";

const objID = mongoose.Types.ObjectId;

// school signUp
export const signUpService = async (req) => {
  try {
    const reqBody = req.body;
    const school = await School.findOne({ email: reqBody.email }); //check school exits or not
    if (school) {
      return {
        statusCode: 400,
        status: false,
        message: "This email is already registered",
      };
    }

    const hashPassword = await bcrypt.hash(reqBody.password, 10); // password make encrypted
    reqBody.password = hashPassword;
    // create new school
    const result = await School.create(reqBody);

    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 201, status: true, message: "Request success" };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// fetch school profile
export const fetchSchoolProfileService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const matchStage = { $match: { _id: schoolID } };
    const projection = {
      $project: {
        password: 0,
        forgotPasswordOtp: 0,
        refresh_token: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const pipeline = [matchStage, projection];
    const result = await School.aggregate(pipeline);
    if (!result) {
      return {
        statusCode: 404,
        status: false,
        message: "This School does not exist",
      };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Request success",
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

// update school Profile
export const updateSchoolProfileService = async (req) => {
  try {

    const reqBody = req.body.formData ? JSON.parse(req.body.formData) : req.body;

    const schoolID = new objID(req.headers.id);

      const school = await School.findById(schoolID);
    if (!school) {
      return {
        statusCode: 404,
        status: false,
        message: "This School does not exist",
      };
    }

    // image upload in cloudinary
    if (req.file) {

      if (school && school["logoImage"]) {
        const publicID = getPublicID(school["logoImage"]);
        await deleteImage(publicID);
      }
      let result = await fileUpload(
        req.file?.path || "",
        "school-management/school"
      );
      reqBody.logoImage = result.secure_url;
    }

    // update school details
    await School.updateOne({ _id: schoolID }, { $set: reqBody }, { new: true });
    return {
      statusCode: 200,
      status: true,
      message: "Update Successfully",
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
