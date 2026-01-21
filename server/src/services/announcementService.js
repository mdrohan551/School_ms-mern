import Announcement from "../models/announcementModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

// Create Announcement by Admin
export const createAnnouncementService = async (req) => {
  try {
    const reqBody = req.body;
    const schoolID = new objID(req.headers.id);
    reqBody.schoolID = schoolID;

    const result = await Announcement.create(reqBody);
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 201,
      status: true,
      message: "Announcement created successfully",
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

// Update Announcement by Admin
export const updateAnnouncementService = async (req) => {
  try {
    const reqBody = req.body;
    const announcementID = new objID(req.params.announcementID);

    // Check if Announcement exists
    const existingAnnouncement = await Announcement.findOne({
      _id: announcementID,
    });
    if (!existingAnnouncement) {
      return {
        statusCode: 404,
        status: false,
        message: "Announcement not found",
      };
    }

    const result = await Announcement.updateOne(
      { _id: announcementID },
      { $set: reqBody },
      { new: true }
    );
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Announcement updated successfully",
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

// Delete Announcement by Admin
export const deleteAnnouncementService = async (req) => {
  try {
    const announcementID = new objID(req.params.announcementID);

    // Check if Announcement exists
    const existingAnnouncement = await Announcement.findOne({
      _id: announcementID,
    });
    if (!existingAnnouncement) {
      return {
        statusCode: 404,
        status: false,
        message: "Announcement not found",
      };
    }

    const result = await Announcement.deleteOne({ _id: announcementID });
    if (!result) {
      return { statusCode: 400, status: false, message: "Request failed" };
    }
    return {
      statusCode: 200,
      status: true,
      message: "Announcement deleted successfully",
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

// Fetch Announcement List by Admin
export const fetchAnnouncementListService = async (req) => {
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
    const result = await Announcement.aggregate(pipeline);

    if (!result.length) {
      return {
        statusCode: 404,
        status: false,
        message: "No Announcement found",
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
