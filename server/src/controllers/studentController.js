
import {
    createStudentService,
    deleteStudentService,
    fetchStudentListService,
    fetchStudentService,
    searchStudentService,
    updateStudentService
} from "../services/studentService.js";

// create student
export const createStudent = async (req, res) => {
    const result = await createStudentService(req)
    return res.status(result.statusCode).json(result)
}

// update student
export const updateStudent = async (req, res) => {
    const result = await updateStudentService(req)
    return res.status(result.statusCode).json(result)
}

// delete student
export const deleteStudent = async (req, res) => {
    const result = await deleteStudentService(req)
    return res.status(result.statusCode).json(result)
}

// fetch studentList
export const fetchStudentList = async (req, res) => {
    const result = await fetchStudentListService(req)
    return res.status(result.statusCode).json(result)
}

// fetch single student profile by admin
export const fetchStudent = async (req, res) => {
    const result = await fetchStudentService(req)
    return res.status(result.statusCode).json(result)
}

// search student by admin
export const searchStudent = async (req, res) => {
    const result = await searchStudentService(req)
    return res.status(result.statusCode).json(result)
}