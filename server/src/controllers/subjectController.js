

// assign subject  by admin
import {
    assignSubjectService,
    updateSubjectService,
    fetchSubjectListByClassService
} from "../services/subjectServices.js";

export const assignSubject = async (req, res) => {
    const result = await assignSubjectService(req)
    return res.status(result.statusCode).json(result)
}

// fetch subject list class wise by admin
export const fetchSubjectListByClass = async (req, res) => {
    const result = await fetchSubjectListByClassService(req)
    return res.status(result.statusCode).json(result)
}


// update subject by admin
export const updateSubject = async (req, res) => {
    const result = await updateSubjectService(req)
    return res.status(result.statusCode).json(result)
}