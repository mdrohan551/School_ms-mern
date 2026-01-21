import {
  createAnnouncementService,
  updateAnnouncementService,
  fetchAnnouncementListService,
  deleteAnnouncementService,
} from "../services/announcementService.js";

// create Announcement by admin
export const createAnnouncement = async (req, res) => {
  const result = await createAnnouncementService(req);
  return res.status(result.statusCode).json(result);
};

// update class by admin
export const updateAnnouncement = async (req, res) => {
  const result = await updateAnnouncementService(req);
  return res.status(result.statusCode).json(result);
};

// delete Announcement by admin
export const deleteAnnouncement = async (req, res) => {
  const result = await deleteAnnouncementService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  AnnouncementList by admin
export const fetchAnnouncementList = async (req, res) => {
  const result = await fetchAnnouncementListService(req);
  return res.status(result.statusCode).json(result);
};
