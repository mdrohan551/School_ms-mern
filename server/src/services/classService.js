import Class from "../models/classModel.js";
import mongoose from "mongoose";
import Subject from "../models/subjectModel.js";
const objID = mongoose.Types.ObjectId;

// create class by admin
export const createClassService = async (req) => {
  try {
    const reqBody = req.body;
    const schoolID = new objID(req.headers.id);
    reqBody.schoolID = schoolID;

    //check class exit or not
    const existingClass = await Class.findOne({ name: reqBody.name });
    if (existingClass) {
      return {
        statusCode: 400,
        status: false,
        message: "This Class already assigned",
      };
    }

    const result = await Class.create(reqBody);
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 201, status: true, message: "Request success" ,data:result}
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// update class by admin
export const updateClassService = async (req) => {
  try {
    const reqBody = req.body;
    const classID = new objID(req.params.classID);

    //check class exit or not
    const existingClass = await Class.findOne({ _id: classID });
    if (!existingClass) {
      return {
        statusCode: 404,
        status: false,
        message: "This Class not assigned",
      };
    }

    const result = await Class.updateOne(
      { _id: classID },
      { $set: reqBody },
      { new: true }
    );
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return { statusCode: 200, status: true, message: "Updated successfully" };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};

// delete class by admin
export const deleteClassService = async (req) => {
  try {
    const classID = new objID(req.params.classID);
    const schoolID = new objID(req.headers.id);
    //check class exit or not
    const existingClass = await Class.findOne({ _id: classID });
    if (!existingClass) {
      return {
        statusCode: 404,
        status: false,
        message: "This Class not assigned",
      };
    }

    const result = await Class.deleteOne({ _id: classID, schoolID});
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    await Subject.deleteMany({classID, schoolID})
    return { statusCode: 200, status: true, message: "Delete successfully" };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: "Something went wrong!",
      error: e.message,
    };
  }
};


// fetch classList by admin
export const fetchClassListService = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 10;
    const skip = (page - 1) * count;

    // join students
    const lookupStage = {
      $lookup: {
        from: 'students',
        let: { thisClassID: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$classID', '$$thisClassID'],
              },
            },
          },
          {
            $project: {
              name: 1,
              registrationNumber: 1,
              image: 1,
              classID: 1,
              FatherName:1,
              phone: 1,
              password:1,
              userName:1,
            },
          },
        ],
        as: 'students',
      },
    };

    // add totalStudent count
    const addFieldStage = {
      $addFields: { totalStudent: { $size: '$students' } },
    };

    const sortStage = { $sort: { totalStudent: -1 } };




    const projection = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
      },
    };

    // Fetch top class separately to get topClassID
    const topClassData = await Class.aggregate([
      lookupStage,
      addFieldStage,
      sortStage,
      { $limit: 1 },
      { $project: { _id: 1, totalStudent: 1 } },
    ]);

    const topClassID = topClassData[0]?._id || null;

    // Main paginated class list pipeline
    const pipeline = [
      lookupStage,
      addFieldStage,
      sortStage,
      projection,
      { $skip: skip },
      { $limit: count },
    ];

    const result = await Class.aggregate(pipeline);
    const totalCount = await Class.countDocuments();

    if (!result || result.length === 0) {
      return {
        statusCode: 404,
        status: false,
        message: 'No class found',
      };
    }

    return {
      statusCode: 200,
      status: true,
      message: 'Request successfully',
      data: result,
      meta: {
        total: totalCount,
        page,
        count,
        totalPages: Math.ceil(totalCount / count),
        topClassID, // ⬅️ Add this
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: false,
      message: 'Something went wrong!',
      error: e.message,
    };
  }
};


// fetch single class by admin 
export const fetchClassServices = async (req) => {
  try {

    const classID = new objID(req.params.classID)
    const matchStage = { $match: { _id: classID } }
   const lookupStage = {
      $lookup: {
        from:'students',
        let:{thisClassID:"$_id"},
        pipeline:[
          {
            $match: {
              $expr :{
                $eq: ["$classID","$$thisClassID"]
              }
            }
          },{
            $project:{
              name:1,
              registrationNumber:1,
              image:1,
              classID:1,
              FatherName:1,
              phone: 1,
              dateOfAdmission:1
            }
          }
        ],
        as:"students",
      }
   }











    const result = await Class.aggregate([matchStage,lookupStage]);
    if (!result) {
      return { statusCode: 400, status: false, message: "Request Failed" }
    }
    return {
      statusCode: 200,
      status: true,
      message: "Request success",
      data: result[0]
    };

  } catch (e) {
    return {
      statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
    };
  }
}