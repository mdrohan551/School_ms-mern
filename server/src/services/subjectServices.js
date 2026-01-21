import mongoose from "mongoose";
import Subject from "../models/subjectModel.js";
import Class from "../models/classModel.js";

const objID = mongoose.Types.ObjectId;

// ====================== ASSIGN SUBJECT ======================
export const assignSubjectService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);
    const { subjects, classID } = req.body;

    if (!classID) {
      return {
        statusCode: 400,
        status: false,
        message: "ClassID must be required",
      };
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return { statusCode: 400, status: false, message: "No subjects found" };
    }

    // check if class exists
    const checkClass = await Class.findOne({ _id: classID, schoolID });
    if (!checkClass) {
      return { statusCode: 404, status: false, message: "Class not found" };
    }

    // check duplicates
    const subjectNames = subjects.map((s) => s.subjectName.toLowerCase());
    const exists = await Subject.findOne({
      subjectName: { $in: subjectNames },
      classID,
      schoolID,
    });

    if (exists) {
      return {
        statusCode: 400,
        status: false,
        message: "Subject already exists in this class",
      };
    }

    // insert
    const data = subjects.map((s) => ({
      subjectName: s.subjectName.toLowerCase(),
      marks: s.marks,
      classID: new objID(classID),
      schoolID,
    }));

    await Subject.insertMany(data);
    return {
      statusCode: 201,
      status: true,
      message: "Subjects assigned successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: false,
      message: error.message.toString(),
    };
  }
};

// ====================== FETCH SUBJECT LIST CLASS WISE ======================
export const fetchSubjectListByClassService = async (req) => {
  try {
    const schoolID = new objID(req.headers.id);

    const pipeline = [
      { $match: { schoolID } },
      {
        $lookup: {
          from: "classes",
          localField: "classID",
          foreignField: "_id",
          as: "class",
        },
      },
      { $unwind: { path: "$class", preserveNullAndEmptyArrays: true} },
      {
        $group: {
          _id: "$class._id",
          className: { $first: "$class.name" },
          subjects: {
            $push: {
              id: "$_id",
              subjectName: "$subjectName",
              marks: "$marks",
            },
          },
          totalSubjects: { $sum: 1 },
          totalMarks: { $sum: "$marks" },
        },
      },
      { $sort: { className: 1 } },
    ];

    const response = await Subject.aggregate(pipeline);

    if (!response || response.length === 0) {
      return { statusCode: 404, status: false, message: "No Subjects Found" };
    }

    return {
      statusCode: 200,
      status: true,
      message: "Request Success",
      data: response,
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: false,
      message: error.message.toString(),
    };
  }
};

// ====================== UPDATE SUBJECT ======================
export const updateSubjectService = async (req) => {
  try {
    const { subjectName, marks, subjects, subjectID } = req.body;
    const schoolID = new objID(req.headers.id);
    const classID = new objID(req.params.classID);

    // ----- Update existing subject -----
    if (subjectID) {
      const checkSubject = await Subject.findOne({
        _id: subjectID,
        schoolID,
        classID,
      });
      if (!checkSubject) {
        return { statusCode: 404, status: false, message: "Subject not found" };
      }

      // check duplicate when renaming
      if (subjectName) {
        const duplicate = await Subject.findOne({
          subjectName: subjectName.toLowerCase(),
          classID,
          schoolID,
          _id: { $ne: subjectID },
        });
        if (duplicate) {
          return {
            statusCode: 400,
            status: false,
            message: "Duplicate subject name in this class",
          };
        }
      }

      await Subject.updateOne(
        { _id: subjectID, schoolID, classID },
        { $set: { subjectName: subjectName?.toLowerCase(), marks } }
      );
    }

    // ----- Add new subjects -----
    if (Array.isArray(subjects) && subjects.length > 0) {
      const subjectNames = subjects.map((s) => s.subjectName.toLowerCase());
      const exists = await Subject.findOne({
        subjectName: { $in: subjectNames },
        classID,
        schoolID,
      });

      if (exists) {
        return {
          statusCode: 400,
          status: false,
          message: "Subject already exists in this class",
        };
      }

      const newSubject = subjects.map((s) => ({
        subjectName: s.subjectName.toLowerCase(),
        marks: s.marks,
        classID,
        schoolID,
      }));
      await Subject.insertMany(newSubject);
    }

    return { statusCode: 200, status: true, message: "Data has been updated" };
  } catch (error) {
    return {
      statusCode: 500,
      status: false,
      message: error.message.toString(),
    };
  }
};
