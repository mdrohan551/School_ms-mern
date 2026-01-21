import { deleteImage, fileUpload, getPublicID } from "../helper/helper.js";
import Student from "../models/studentModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Class from "../models/classModel.js";
import AcademicYear from "../models/academicYearModel.js";
const objID = mongoose.Types.ObjectId;

// create student by admin
export const createStudentService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const reqBody = req.body.formData
      ? JSON.parse(req.body.formData)
      : req.body;
    reqBody.schoolID = schoolID;

    //validate academicYearID & classID
    const academicYear = await AcademicYear.findOne({
      _id: reqBody.academicYearID,
    });
    if (!academicYear) {
      return {
        statusCode: 404,
        status: false,
        message: "Academic Year not found",
      };
    }

    const existingStudent = await Student.findOne({ birthID: reqBody.birthID });
    if (existingStudent) {
      return {
        statusCode: 404,
        status: false,
        message: "This Student already exists",
      };
    }
    // Get the last student's registration number
    const lastStudent = await Student.findOne()
      .sort({ registrationNumber: -1 })
      .lean();
    const lastNumber = lastStudent
      ? parseInt(lastStudent.registrationNumber)
      : 10001;
    const registrationNumber = String(lastNumber + 1); // Increment last number
    reqBody.registrationNumber = registrationNumber;

    // Generate random username and password
    let randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    let sanitizedName = reqBody.name.toLowerCase().replace(/\s+/g, ""); // Remove spaces
    let userName = `${sanitizedName}${randomNum}`;
    let password = `${sanitizedName}${randomNum}`;
    reqBody.userName = userName;
    reqBody.password = password;

    // Image Upload to Cloudinary
    if (req.file) {
      let result = await fileUpload(
        req.file?.path || "",
        "school_management/student"
      );
      reqBody.image = result.secure_url;
    }
    const newStudent = await Student.create(reqBody);
    if (!newStudent) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Request success",
      userName: userName,
      password: password,
      registration: registrationNumber,
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

// fetch studentList by admin
export const fetchStudentListService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const matchStage = { $match: { schoolID: schoolID } };
    const page = parseInt(req.query.page) || 1;
    const count = req.query.count ? parseInt(req.query.count) : null; // null হলে সব নেবে
    const skip = (page - 1) * (count || 0);

    const projection = {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        registrationNumber: 1,
        classID: 1,
        academicYearID: 1,
        dateOfAdmission: 1,
        FatherName: 1,
        phone: 1,
        password: 1,
        userName: 1,
      },
    };

    // pipeline স্টেজ অ্যারে বানানো
    const pipeline = [matchStage, projection];

    // যদি skip লাগে (page > 1 এবং count থাকে)
    if (count && page > 1) {
      pipeline.push({ $skip: skip });
    }

    // যদি count থাকে, তাহলে limit দাও, নাহলে না
    if (count) {
      pipeline.push({ $limit: count });
    }

    const result = await Student.aggregate(pipeline);

    // totalCount হিসাব করতে মনে হচ্ছে তোমার intention ক্লাসের কাউন্ট নিচ্ছো, যা student count হওয়া উচিত
    const totalCount = await Student.countDocuments({ schoolID: schoolID });

    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }

    return {
      statusCode: 200,
      status: true,
      message: "Request success",
      data: result,
      meta: {
        total: totalCount,
        page,
        count: count || totalCount,
        totalPages: count ? Math.ceil(totalCount / count) : 1,
      },
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

// fetch single student by admin
export const fetchStudentService = async (req) => {
  try {
    const studentID = new objID(req.params.studentID);
    const matchStage = { $match: { _id: studentID } };
    const joinWithClass = {
      $lookup: {
        from: "classes",
        localField: "classID",
        foreignField: "_id",
        as: "classDetails",
      },
    };
    const unwindClass = {
      $unwind: { path: "$classDetails", preserveNullAndEmptyArrays: true },
    };
    // [projection field]
    const projection = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        forgotPasswordOtp: 0,
        refreshToken: 0,
        "classDetails.createdAt": 0,
        "classDetails.updatedAt": 0,
        "classDetails._id": 0,
        "classDetails.teacherID": 0,
      },
    };
    const result = await Student.aggregate([
      matchStage,
      joinWithClass,
      unwindClass,
      projection,
    ]);
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
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

// update student by admin
export const updateStudentService = async (req) => {
  try {
    const reqBody = req.body;

    const studentID = new objID(req.params.studentID);
    const student = await Student.findOne({ _id: studentID });
    if (!student) {
      return { statusCode: 404, status: false, message: "Student not found" };
    }
    //validate academicYearID
    const academicYear = await AcademicYear.findOne({
      _id: reqBody.academicYearID,
    });
    if (!academicYear) {
      return {
        statusCode: 404,
        status: false,
        message: "Academic Year not found",
      };
    }

    // image upload in cloudinary
    if (req.file) {
      if (student && student["image"]) {
        const publicID = getPublicID(student["image"]);
        await deleteImage(publicID);
      }
      let result = await fileUpload(
        req.file?.path || "",
        "school-management/student"
      );
      reqBody.image = result.secure_url;
    }
    await Student.updateOne(
      { _id: studentID },
      { $set: reqBody },
      { new: true }
    );
    return { statusCode: 200, status: true, message: "Update Successfully" };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// delete student by admin
export const deleteStudentService = async (req) => {
  try {
    const studentID = new objID(req.params.studentID);
    const student = await Student.findOne({ _id: studentID });
    if (!student) {
      return {
        statusCode: 404,
        status: false,
        message: "This student does not exist",
      };
    }
    // image delete from cloudinary
    if (student && student["image"]) {
      const publicID = getPublicID(student["image"]);
      await deleteImage(publicID);
    }
    await Student.deleteOne({ _id: studentID });
    return {
      statusCode: 200,
      status: true,
      message: "Delete Successfully",
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

// search student by admin
export const searchStudentService = async (req) => {
  try {
    const { name, registrationNumber, birthID, religion, bloodGroup, classID } =
      req.query;

    // Create a dynamic search object
    let searchQuery = {};
    if (name) searchQuery.name = new RegExp(name, "i");
    if (registrationNumber)
      searchQuery.registrationNumber = new RegExp(registrationNumber, "i");
    if (birthID) searchQuery.birthID = new RegExp(birthID, "i");
    if (religion) searchQuery.religion = new RegExp(religion, "i");
    if (bloodGroup) searchQuery.bloodGroup = new RegExp(bloodGroup, "i");
    if (classID) searchQuery.classID = new objID(classID);

    const matchStage = { $match: searchQuery };
    const projection = {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        registrationNumber: 1,
        FatherName: 1,
        phone: 1,
      },
    };
    const pipeline = [matchStage, projection];
    const result = await Student.aggregate(pipeline);
    if (result.length === 0) {
      return { statusCode: 404, status: false, message: "No student found" };
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
