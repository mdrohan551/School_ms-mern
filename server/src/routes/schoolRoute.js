import { upload } from "../helper/helper.js";
import {
  authenticateUser,
  authorizeRole,
} from "../middlewares/AuthVerification.js";
import express from "express";
const router = express.Router();

// import controller
import * as schoolController from "../controllers/schoolController.js";
import * as studentController from "../controllers/studentController.js";
import * as employeeController from "../controllers/employeeController.js";
import * as classController from "../controllers/classController.js";
import * as academicYearController from "../controllers/academicYearController.js";
import * as announcementController from "../controllers/announcementController.js";
import * as attendanceController from "../controllers/attendanceController.js";
import * as examController from "../controllers/examController.js";
import * as feeHeadController from "../controllers/feeHeadsController.js";
import * as feesController from "../controllers/feePaymentController.js";
import * as feeStructureController from "../controllers/feeStructureController.js";
import * as subjectController from "../controllers/subjectController.js";

router.post(
  "/school-signUp",
  upload.single("logoImage"),
  schoolController.schoolSignUp
);

router.get(
  "/fetch-school",
  authenticateUser,
  authorizeRole("Admin"),
  schoolController.fetchSchoolProfile
);

router.put(
  "/update-school",
  authenticateUser,
  authorizeRole("Admin"),
  upload.single("logoImage"),
  schoolController.updateSchoolProfile
);

// student
router.post(
  "/create-student",
  authenticateUser,
  authorizeRole("Admin"),
  upload.single("image"),
  studentController.createStudent
);

router.get(
  "/fetch-students",
  authenticateUser,
  authorizeRole("Admin"),
  studentController.fetchStudentList
);

router.get(
  "/fetch-student/:studentID",
  authenticateUser,
  authorizeRole("Admin"),
  studentController.fetchStudent
);

router.put(
  "/update-student/:studentID",
  authenticateUser,
  authorizeRole("Admin"),
  upload.single("image"),
  studentController.updateStudent
);

router.delete(
  "/delete-student/:studentID",
  authenticateUser,
  authorizeRole("Admin"),
  studentController.deleteStudent
);

router.get(
  "/search-student",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  studentController.searchStudent
);

// employee
router.post(
  "/create-employee",
  authenticateUser,
  authorizeRole("Admin"),
  upload.single("image"),
  employeeController.createEmployee
);

router.put(
  "/update-employee/:employeeID",
  authenticateUser,
  authorizeRole("Admin"),
  upload.single("image"),
  employeeController.updateEmployee
);

router.delete(
  "/delete-employee/:employeeID",
  authenticateUser,
  authorizeRole("Admin"),
  employeeController.deleteEmployee
);

router.get(
  "/fetch-employees",
  authenticateUser,
  authorizeRole("Admin"),
  employeeController.fetchEmployeeList
);

router.get(
  "/fetch-employee/:employeeID",
  authenticateUser,
  authorizeRole("Admin"),
  employeeController.fetchEmployee
);

router.get(
  "/search-employee",
  authenticateUser,
  authorizeRole("Admin"),
  employeeController.searchEmployee
);

// class
router.post(
  "/create-class",
  authenticateUser,
  authorizeRole("Admin"),
  classController.createClass
);

router.put(
  "/update-class/:classID",
  authenticateUser,
  authorizeRole("Admin"),
  classController.updateClass
);
router.get(
  "/fetch-class/:classID",
  authenticateUser,
  authorizeRole("Admin"),
  classController.fetchSingleClass
);
router.delete(
  "/delete-class/:classID",
  authenticateUser,
  authorizeRole("Admin"),
  classController.deleteClass
);

router.get(
  "/fetch-classes",
  authenticateUser,
  authorizeRole("Admin"),
  classController.fetchClassList
);

// subject
router.post(
  "/assign-subject",
  authenticateUser,
  authorizeRole("Admin"),
  subjectController.assignSubject
);

router.get(
  "/fetch-subject-list-by-class",
  authenticateUser,
  authorizeRole("Admin"),
  subjectController.fetchSubjectListByClass
);

router.put(
  "/update-subject/:classID",
  authenticateUser,
  authorizeRole("Admin"),
  subjectController.updateSubject
);

//Academic Year

router.post(
  "/create-academic-year",
  authenticateUser,
  authorizeRole("Admin"),
  academicYearController.createAcademicYear
);

router.patch(
  "/update-academic-year/:academicYearID",
  authenticateUser,
  authorizeRole("Admin"),
  academicYearController.updateAcademicYear
);

router.delete(
  "/delete-academic-year/:academicYearID",
  authenticateUser,
  authorizeRole("Admin"),
  academicYearController.deleteAcademicYear
);

router.get(
  "/fetch-academic-years",
  authenticateUser,
  authorizeRole("Admin"),
  academicYearController.fetchAcademicYearList
);

// Announcement
router.post(
  "/create-announcement",
  authenticateUser,
  authorizeRole("Admin"),
  announcementController.createAnnouncement
);

router.put(
  "/update-announcement/:announcementID",
  authenticateUser,
  authorizeRole("Admin"),
  announcementController.updateAnnouncement
);

router.delete(
  "/delete-announcement/:announcementID",
  authenticateUser,
  authorizeRole("Admin"),
  announcementController.deleteAnnouncement
);

router.get(
  "/fetch-announcements",
  authenticateUser,
  authorizeRole("Admin"),
  announcementController.fetchAnnouncementList
);

// Attendance
router.post(
  "/create-attendance",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.createAttendance
);
router.put(
  "/update-attendance",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.updateAttendance
);

router.get(
  "/fetch-summary-attendances",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.getAttendanceSummary
);
router.get(
  "/fetch-student-summary-attendances/:classID",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.getStudentStats
);
router.get(
  "/get-Today-Attendance",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.getTodayAttendance
);
router.delete(
  "/delete-attendance/:attendanceID",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.deleteAttendance
);

router.get(
  "/fetch-attendances",
  authenticateUser,
  authorizeRole("Admin", "Teacher"),
  attendanceController.fetchAttendanceList
);

//Exam
router.post(
  "/create-exam",
  authenticateUser,
  authorizeRole("Admin"),
  examController.createExam
);
router.put(
  "/update-exam/:examID",
  authenticateUser,
  authorizeRole("Admin"),
  examController.updateExam
);

router.delete(
  "/delete-exam/:examID",
  authenticateUser,
  authorizeRole("Admin"),
  examController.deleteExam
);

router.get(
  "/fetch-exams",
  authenticateUser,
  authorizeRole("Admin"),
  examController.fetchExamList
);

//Fee Head
router.post(
  "/create-fee-head",
  authenticateUser,
  authorizeRole("Admin"),
  feeHeadController.createFeeHead
);
router.patch(
  "/update-fee-head/:feeHeadID",
  authenticateUser,
  authorizeRole("Admin"),
  feeHeadController.updateFeeHead
);

router.delete(
  "/delete-fee-head/:feeHeadID",
  authenticateUser,
  authorizeRole("Admin"),
  feeHeadController.deleteFeeHead
);

router.get(
  "/fetch-fee-heads",
  authenticateUser,
  authorizeRole("Admin"),
  feeHeadController.fetchFeeHeadList
);

//Fees
router.post(
  "/create-fees-payment",
  authenticateUser,
  authorizeRole("Admin"),
  feesController.createFeesPayment
);
router.put(
  "/update-fees/:feesID",
  authenticateUser,
  authorizeRole("Admin"),
  feesController.updateFees
);

router.delete(
  "/delete-fees/:feesID",
  authenticateUser,
  authorizeRole("Admin"),
  feesController.deleteFees
);

router.get(
  "/fetch-fees",
  authenticateUser,
  authorizeRole("Admin"),
  feesController.fetchFeesList
);

//Fee Structure
router.post(
  "/create-fee-structure",
  authenticateUser,
  authorizeRole("Admin"),
  feeStructureController.createFeeStructure
);
router.put(
  "/update-fee-structure/:feeStructureID",
  authenticateUser,
  authorizeRole("Admin"),
  feeStructureController.updateFeeStructure
);

router.delete(
  "/delete-fee-structure/:feeStructureID",
  authenticateUser,
  authorizeRole("Admin"),
  feeStructureController.deleteFeeStructure
);

router.get(
  "/fetch-fee-structures",
  authenticateUser,
  authorizeRole("Admin"),
  feeStructureController.fetchFeeStructureList
);

export default router;
