import {
  createAcademicYearService,
  updateAcademicYearService,
  fetchAcademicYearListService,
  deleteAcademicYearService,
} from "../services/academicYearService.js";

// create AcademicYear by admin
export const createAcademicYear = async (req, res) => {
  const result = await createAcademicYearService(req);
  return res.status(result.statusCode).json(result);
};

// update class by admin
export const updateAcademicYear = async (req, res) => {
  const result = await updateAcademicYearService(req);
  return res.status(result.statusCode).json(result);
};

// delete AcademicYear by admin
export const deleteAcademicYear = async (req, res) => {
  const result = await deleteAcademicYearService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  AcademicYearList by admin
export const fetchAcademicYearList = async (req, res) => {
  const result = await fetchAcademicYearListService(req);
  return res.status(result.statusCode).json(result);
};
