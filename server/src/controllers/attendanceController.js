import {
  createAttendanceService,
  deleteAttendanceService,
  fetchAttendanceListService,
  getAttendanceSummaryService,
  getStudentAttendanceStatsService,
  getTodayAttendanceStatsService,
  updateAttendanceService,
} from "../services/attendanceService.js";

// create class by admin
export const createAttendance = async (req, res) => {
  const result = await createAttendanceService(req);
  return res.status(result.statusCode).json(result);
};

// update Attendance by admin
export const updateAttendance = async (req, res) => {
  const result = await updateAttendanceService(req);
  return res.status(result.statusCode).json(result);
};



//Get Attendance Summary (All Classes)
export const getAttendanceSummary = async (req, res) => {
  const result = await getAttendanceSummaryService();
  return res.status(result.statusCode).json(result);
};

//Get Student Attendance Stats (Total Present/Absent)

export const getStudentStats = async (req, res) => {
  const result = await getStudentAttendanceStatsService(req);
  return res.status(result.statusCode).json(result);
};

// delete Attendance by admin
export const deleteAttendance = async (req, res) => {
  const result = await deleteAttendanceService(req);
  return res.status(result.statusCode).json(result);
};
// Today absent prasent Attendance progress
export const getTodayAttendance = async (req, res) => {
  const result = await getTodayAttendanceStatsService();
  return res.status(result.statusCode).json(result);
};

// fetch  AttendanceList by admin
export const fetchAttendanceList = async (req, res) => {
  const result = await fetchAttendanceListService(req);
  return res.status(result.statusCode).json(result);
};
