import {
  createExamService,
  deleteExamService,
  fetchExamListService,
  updateExamService,
} from "../services/examService.js";

// create Exam by admin
export const createExam = async (req, res) => {
  const result = await createExamService(req);
  return res.status(result.statusCode).json(result);
};

// update Exam by admin
export const updateExam = async (req, res) => {
  const result = await updateExamService(req);
  return res.status(result.statusCode).json(result);
};

// delete Exam by admin
export const deleteExam = async (req, res) => {
  const result = await deleteExamService(req);
  return res.status(result.statusCode).json(result);
};

// fetch  ExamList by admin
export const fetchExamList = async (req, res) => {
  const result = await fetchExamListService(req);
  return res.status(result.statusCode).json(result);
};
