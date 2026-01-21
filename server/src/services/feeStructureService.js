import FeeStructure from "../models/feeStructureModel.js";
import mongoose from "mongoose";

const objID = mongoose.Types.ObjectId;

// Create Fee Structure
export const createFeeStructureService = async (req) => {
    try {
        const {classID, academicYearID, feeHeadID, monthlyFees} = req.body;
        const schoolID = new objID(req.headers.id);

        const existingFeeStructure = await FeeStructure.findOne({
            classID,
            academicYearID,
            schoolID,
            feeHeadID
        });

        if (existingFeeStructure) {
            return {statusCode: 400, status: false, message: "Structure already exists for this fee head"};
        }

        const result = await FeeStructure.create({
            classID,
            academicYearID,
            schoolID,
            feeHeadID,
            monthlyFees
        });
        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }
        return {statusCode: 201, status: true, message: "Fee Structure created successfully"};
    } catch (error) {
        return {statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString()};
    }
};

// Update Fee Structure
export const updateFeeStructureService = async (req) => {
    try {
        const {classID, academicYearID, feeHeadID, ...monthlyFees} = req.body;
        const feeStructureID = new objID(req.params.feeStructureID);
        const schoolID = new objID(req.headers.id);
        const existingFeeStructure = await FeeStructure.findOne({
            _id: feeStructureID,
            schoolID,
        });
        if (!existingFeeStructure) {
            return {statusCode: 404, status: false, message: "Fee Structure not found"};
        }

        const result = await FeeStructure.updateOne(
            {_id: feeStructureID, schoolID, classID, academicYearID, feeHeadID},
            {$set: {...monthlyFees}},
            {new: true}
        );

        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }

        return {statusCode: 200, status: true, message: "Data has been updated"};
    } catch (error) {
        return {statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString()};
    }
};

// Delete Fee Structure
export const deleteFeeStructureService = async (req) => {
    try {
        const {classID, academicYearID, feeHeadID} = req.query;
        const feeStructureID = new objID(req.params.feeStructureID);
        const schoolID = new objID(req.headers.id);
        const existingFeeStructure = await FeeStructure.findOne({
            _id: feeStructureID,
            schoolID,
        });
        if (!existingFeeStructure) {
            return {statusCode: 404, status: false, message: "Fee Structure not found"};
        }

        const result = await FeeStructure.deleteOne({_id: feeStructureID, schoolID, classID, academicYearID, feeHeadID});
        if (!result) {
            return {statusCode: 400, status: false, message: "Request failed"};
        }
        return {statusCode: 200, status: true, message: "Data has been deleted"};
    } catch (error) {
        return {statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString()};
    }
};

// Fetch Fee Structure List
export const fetchFeeStructureService = async (req) => {
    try {
        const schoolID = new objID(req.headers.id);
        const classID = new objID(req.query.classID);
        const feeHeadID = new objID(req.query.feeHeadID);
        const academicYearID = new objID(req.query.academicYearID);

        const matchStage = {$match: {feeHeadID, classID, academicYearID, schoolID}};

        // join with class collection
        const joinWithClass = {
            $lookup: {
                from: "classes",
                localField: "classID",
                foreignField: "_id",
                as: "class",
            }
        }

        // join with class collection
        const joinWithAcademicYear = {
            $lookup: {
                from: "academicyears",
                localField: "academicYearID",
                foreignField: "_id",
                as: "academicYear",
            }
        }

        // join with fee head collection
        const joinWithFeeHead = {
            $lookup: {
                from: "feeheads",
                localField: "feeHeadID",
                foreignField: "_id",
                as: "feeHead",
            }
        }
        const projection = {
            $project: {
                id: 1,
                classID: "$class._id",
                academicYearID: "$academicYear._id",
                feeHeadID: "$feeHead._id",
                className: "$class.name",
                academicYearName: "$academicYear.name",
                feeHeadName: "$feeHead.name",
                totalFees: {$sum: "$monthlyFees.amount"},
                monthlyFees: 1,
            },
        };
        const pipeline = [
            matchStage,
            joinWithClass,
            {$unwind: {path: "$class", preserveNullAndEmptyArrays: true}},
            joinWithAcademicYear,
            {$unwind: {path: "$academicYear", preserveNullAndEmptyArrays: true}},
            joinWithFeeHead,
            {$unwind: {path: "$feeHead", preserveNullAndEmptyArrays: true}},
            projection,

        ];
        const result = await FeeStructure.aggregate(pipeline);

        if (!result || result.length === 0) {
            return {statusCode: 404, status: false, message: "No Fee Structure records found"};
        }
        return {statusCode: 200, status: true, message: "Request success", data: result[0]};
    } catch (error) {
        return {statusCode: 500, status: false, message: "Something went wrong!", error: error.message.toString()};
    }
};
