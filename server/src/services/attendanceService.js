import Attendance from "../models/attendanceModel.js";
import mongoose from "mongoose";
import Student from "../models/studentModel.js";

const objID = mongoose.Types.ObjectId;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// Create Attendance by Admin (or return existing)
export const createAttendanceService = async (req) => {
  try {
    const { classID, date, schoolID } = req.body;

    // Validate required fields
    if (!classID || !date || !schoolID) {
      return { statusCode: 400, status: false, message: "All fields are required" };
    }
    // ID validation
    if (!isValidObjectId(classID) || !isValidObjectId(schoolID)) {
      return { statusCode: 400, status: false, message: "Invalid ID format" };
    }

    // Normalize date to UTC 00:00:00 for comparison
    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0);

    // Check if attendance already exists for this class and date
    const existingAttendance = await Attendance.findOne({
      classID,
      date: utcDate,
    });

    if (existingAttendance) {
      return {
        statusCode: 200,
        status: true,
        message: "Attendance already exists for this class and date",
        data: existingAttendance, // Optional: return existing data
      };
    }

    // Fetch students of the class
    const students = await Student.find({ classID }).select("_id name image registrationNumber");

    if (!students.length) {
      return {
        statusCode: 404,
        status: false,
        message: "No students found for this class",
      };
    }

    // Prepare attendance records
    const attendanceData = students.map((student) => ({
      studentID: student._id,
      studentName: student.name,
      logo: student.image,
      ID: student.registrationNumber,
      classID,
      schoolID,
      date: utcDate,
      status: "Absent", // default status
    }));

    // Bulk insert
    const result = await Attendance.insertMany(attendanceData);

    return {
      statusCode: 201,
      status: true,
      message: "Attendance records created successfully",
      data: result,
    };
  } catch (e) {
    return { statusCode: 500, status: false, message: e.message };
  }
};
// Update Attendance Status by Admin
export const updateAttendanceService = async (req) => {
  try {
    const { attendanceList, schoolID, classID } = req.body;

    // Validate required fields
    if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
      return {
        statusCode: 400,
        status: false,
        message: "attendanceList must be a non-empty array",
      };
    }

    if (!isValidObjectId(schoolID) || !isValidObjectId(classID)) {
      return {
        statusCode: 400,
        status: false,
        message: "Invalid schoolID or classID format",
      };
    }

    // Validate all items in one go using functional approach
    const invalidIDs = attendanceList.filter(
        (item) => !isValidObjectId(item.attendanceID)
    );
    if (invalidIDs.length > 0) {
      return {
        statusCode: 400,
        status: false,
        message: `Invalid attendance IDs found: ${invalidIDs.map((i) => i.attendanceID).join(", ")}`,
      };
    }

    const invalidStatus = attendanceList.filter(
        (item) => !["Present", "Absent"].includes(item.status)
    );
    if (invalidStatus.length > 0) {
      return {
        statusCode: 400,
        status: false,
        message: `Invalid status values found: ${invalidStatus.map((i) => `${i.status} (ID: ${i.attendanceID})`).join(", ")}`,
      };
    }

    // Prepare bulk update operations (no loop, just map)
    const operations = attendanceList.map((item) => ({
      updateOne: {
        filter: {
          _id: item.attendanceID,
          schoolID,
          classID,
        },
        update: { status: item.status },
      },
    }));

    // Execute all updates in one DB call
    const result = await Attendance.bulkWrite(operations, { ordered: false }); // ordered: false = continue on error

    const matchedCount = result.matchedCount || 0;
    const modifiedCount = result.modifiedCount || 0;

    if (matchedCount === 0) {
      return {
        statusCode: 404,
        status: false,
        message: "No matching attendance records found for the given school/class",
      };
    }

    return {
      statusCode: 200,
      status: true,
      message: `Successfully updated ${modifiedCount} A / P`,
      data: { matchedCount, modifiedCount },
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: e.message,
    };
  }
};
// Fetch Attendance List by Admin
export const fetchAttendanceListService = async (req) => {
  try {
    const { classID, date } = req.query;

    const match = {};

    if (classID) {
      if (!isValidObjectId(classID)) {
        return {
          statusCode: 400,
          status: false,
          message: "Invalid classID format",
        };
      }
      match.classID = new mongoose.Types.ObjectId(classID);
    }
    if (date) {
      const utcDate = new Date(date);
      utcDate.setUTCHours(0, 0, 0, 0);
      match.date = utcDate;
    }

    const pipeline = [
      { $match: match }, 
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ];

    const result = await Attendance.aggregate(pipeline);

    if (!result.length) {
      return {
        statusCode: 404,
        status: false,
        message: "No attendance records found",
      };
    }

    return {
      statusCode: 200,
      status: true,
      message: "Attendance fetched successfully",
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



//Attendance Summary for All Classes



export const getAttendanceSummaryService = async () => {
  try {
    const summary = await Attendance.aggregate([
      // Step 1: Count attendance per class per status
      {
        $group: {
          _id: { classID: "$classID", status: "$status" },
          count: { $sum: 1 },
        },
      },
      // Step 2: Aggregate total present, absent, and totalRecords per class
      {
        $group: {
          _id: "$_id.classID",
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$_id.status", "Present"] }, "$count", 0] },
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$_id.status", "Absent"] }, "$count", 0] },
          },
          totalRecords: { $sum: "$count" },
        },
      },
      // Step 3: Join with Class collection to get class name
      {
        $lookup: {
          from: "classes", // MongoDB collection name (lowercase plural of model by default)
          localField: "_id",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      // Step 4: Unwind the joined array
      { $unwind: "$classInfo" },
      // Step 5: Project the final fields
      {
        $project: {
          _id: 0,
          classID: "$_id",
          className: "$classInfo.name",
          totalPresent: 1,
          totalAbsent: 1,
          totalRecords: 1,
        },
      },
    ]);

    return {
      statusCode: 200,
      status: true,
      message: "Attendance summary fetched successfully",
      data: summary,
    };
  } catch (e) {
    return { statusCode: 500, status: false, message: e.message };
  }
};

// total present absent all attendance
export const getStudentAttendanceStatsService = async (req) => {
  try {
    const classID = req.params.classID;
    if (!mongoose.Types.ObjectId.isValid(classID)) {
      return {
        statusCode: 400,
        status: false,
        message: "Invalid class ID",
      };
    }
    const students = await Student.find({ classID }).select("name image _id").lean();
    const stats = await Attendance.aggregate([
      {
        $match: { studentID: { $in: students.map((s) => s._id) } },
      },
      {
        $group: {
          _id: { studentID: "$studentID", status: "$status", date: "$date" },
          count: { $sum: 1 },
        },
      },
    ]);

    const mergedData = students.map((student) => {
      const studentStats = stats.filter(
          (s) => s._id.studentID.toString() === student._id.toString()
      );

      const presentDates = new Set(
          studentStats
              .filter((s) => s._id.status === "Present")
              .map((s) => s._id.date.toISOString())
      );

      const absentDates = new Set(
          studentStats
              .filter((s) => s._id.status === "Absent")
              .map((s) => s._id.date.toISOString())
      );

      return {
        studentID: student._id,
        name: student.name,
        image: student.image,
        totalPresent: presentDates.size,
        totalAbsent: absentDates.size,
      };
    });

    return {
      statusCode: 200,
      status: true,
      message: "Student attendance stats fetched successfully",
      data: mergedData,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: e.message,
    };
  }
};
// today Present absent count


export const getTodayAttendanceStatsService = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    // Attendance aggregation (Present / Absent)
    const stats = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    let totalPresent = 0;
    let totalAbsent = 0;

    stats.forEach(stat => {
      if (stat._id === "Present") {
        totalPresent = stat.count;
      } else if (stat._id === "Absent") {
        totalAbsent = stat.count;
      }
    });


    const totalStudents = await Student.countDocuments();

    return {
      statusCode: 200,
      status: true,
      message: "Today's attendance stats fetched successfully",
      data: { totalPresent, totalAbsent, totalStudents },
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: false,
      message: error.message,
    };
  }
};

// Delete Attendance by Admin
export const deleteAttendanceService = async (req) => {
  try {
    const attendanceID = new objID(req.params.attendanceID);
    const existingAttendance = await Attendance.findOne({ _id: attendanceID });
    if (!existingAttendance) {
      return {
        statusCode: 404,
        status: false,
        message: "Attendance record not found",
      };
    }

    const result = await Attendance.deleteOne({ _id: attendanceID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Attendance record deleted successfully",
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