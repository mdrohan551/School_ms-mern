import Employee from "../models/employeeModel.js";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const objID = mongoose.Types.ObjectId;

// create employee by admin
export const createEmployeeService = async (req) => {
    try {
        const reqBody = req.body.formData ? JSON.parse(req.body.formData) : req.body;
        const schoolID = new objID(req.headers.id);
        reqBody.schoolID = schoolID;

        // Generate random username and password
        let randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
        let sanitizedName = reqBody.name.toLowerCase().replace(/\s+/g, ""); // Remove spaces
        let userName = `${sanitizedName}${randomNum}`;
        let password = `${sanitizedName}${randomNum}`;
        reqBody.userName = userName;
        reqBody.password = password;

        //check employee exit or not
        const employee = await Employee.findOne({phone: reqBody.phone});
        if (employee) {
            return {
                statusCode: 400, status: false, message: "This Employee already exists",
            };
        }
        // Image Upload to Cloudinary
        if (req.file) {
            if (employee && employee["Image"]) {
                const publicID = getPublicID(employee["Image"]);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "school_management/employee");
            reqBody.image = result.secure_url;
        }
        if (!req.body.email || req.body.email.trim() === "") {
            req.body.email = null;
        }

        const result = await Employee.create(reqBody);
        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }
        return {
            statusCode: 201, status: true, message: "Request success", userName: userName, password: password,
        };
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};

// update employee by admin
export const updateEmployeeService = async (req) => {
    try {
        const reqBody = req.body.formData ? JSON.parse(req.body.formData) : req.body;
        const password = reqBody.password;
        reqBody.password = password;

        const employeeID = new objID(req.params.employeeID);
        const employee = await Employee.findOne({_id: employeeID});
        if (!employee) {
            return {statusCode: 404, status: false, message: "Employee not found"};
        }

        // image upload in cloudinary
        if (req.file) {
            if (employee && employee["image"]) {
                const publicID = getPublicID(employee["image"]);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "school_management/employee");
            reqBody.image = result.secure_url;
        }
        await Employee.updateOne({_id: employeeID}, {$set: reqBody}, {new: true});
        return {statusCode: 200, status: true, message: "Update Successfully"};
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};

// delete employee by admin
export const deleteEmployeeService = async (req) => {
    try {
        const employeeID = new objID(req.params.employeeID);
        const employee = await Employee.findOne({_id: employeeID});
        if (!employee) {
            return {statusCode: 404, status: false, message: "Employee not found"};
        }

        // image delete from cloudinary
        if (employee && employee["image"]) {
            const publicID = getPublicID(employee["image"]);
            await deleteImage(publicID);
        }
        await Employee.deleteOne({_id: employeeID});
        return {statusCode: 200, status: true, message: "Delete Successfully"};
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};

// fetch employeeList by admin
export const fetchEmployeeListService = async (req) => {
    try {
        const schoolID = new objID(req.headers.id);
        const matchStage = {$match: {schoolID: schoolID}};

        const projection = {
            $project: {

                _id: 1, name: 1, email: 1, image: 1, role: 1,phone:1,
                userName:1,
                password:1,
                dateOfJoining:1,
                nationalID:1,
                dateOfBirth:1,
                status:1

            },
        };
        const pipeline = [matchStage, projection];
        const result = await Employee.aggregate(pipeline);
        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }
        return {
            statusCode: 200, status: true, message: "Request success", data: result,
        };
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};

// fetch single employee profile by admin
export const fetchEmployeeService = async (req) => {
    try {
        const employeeID = new objID(req.params.employeeID);
        const matchStage = {$match: {_id: employeeID}};
        // const joinWithClass = {
        //   $lookup: {
        //     from: "classes",
        //     localField: "classID",
        //     foreignField: "_id",
        //     as: "classDetails",
        //   },
        // };
        // const unwindClass = {
        //   $unwind: { path: "$classDetails", preserveNullAndEmptyArrays: true },
        // };
        // // [projection field]
        // const projection = {
        //   $project: {
        //     createdAt: 0,
        //     updatedAt: 0,
        //     userName: 0,
        //     password: 0,
        //     forgotPasswordOtp: 0,
        //     refreshToken: 0,
        //     classID: 0,
        //     "classDetails.createdAt": 0,
        //     "classDetails.updatedAt": 0,
        //     "classDetails._id": 0,
        //     "classDetails.teacherID": 0,
        //   },
        // };
        const result = await Employee.aggregate([matchStage, // joinWithClass,
            // unwindClass,
            // projection,
        ]);
        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }

        return {
            statusCode: 200, status: true, message: "Request success", data: result[0],
        };
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};

// search employee by admin
export const searchEmployeeService = async (req) => {
    try {
        const {name, role, email, userName, gender, bloodGroup, nationalID} = req.query;

        // Create a dynamic search object
        let searchQuery = {};
        if (name) searchQuery.name = new RegExp(name, "i");
        if (role) searchQuery.role = new RegExp(role, "i");
        if (email) searchQuery.email = new RegExp(email, "i");
        if (userName) searchQuery.userName = new RegExp(userName, "i");
        if (bloodGroup) searchQuery.bloodGroup = new RegExp(bloodGroup, "i");
        if (gender) searchQuery.gender = new RegExp(gender, "i");
        if (nationalID) searchQuery.nationalID = new RegExp(nationalID, "i");

        const matchStage = {$match: searchQuery};
        const projection = {
            $project: {
                _id: 1, name: 1, email: 1, image: 1, role: 1,phone:1,
                userName:1,
                password:1,
                dateOfJoining:1,
                nationalID:1,
                dateOfBirth:1,
                status:1
            },
        };
        const pipeline = [matchStage, projection];
        const result = await Employee.aggregate(pipeline);
        if (result.length === 0) {
            return {statusCode: 404, status: false, message: "No Employee found"};
        }
        return {
            statusCode: 200, status: true, message: "Request success", data: result,
        };
    } catch (e) {
        return {
            statusCode: 500, status: false, message: "Something went wrong!", error: e.message,
        };
    }
};
