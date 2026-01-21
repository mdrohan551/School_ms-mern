import {
    createClassService,
    deleteClassService,
    fetchClassListService,
    updateClassService,
    fetchClassServices
} from "../services/classService.js";

// create class by admin
export const createClass = async (req, res) => {
    const result = await createClassService(req)
    return res.status(result.statusCode).json(result)
}

// update class by admin
export const updateClass = async (req, res) => {
    const result = await updateClassService(req)
    return res.status(result.statusCode).json(result)
}

// delete class by admin
export const deleteClass = async (req, res) => {
    const result = await deleteClassService(req)
    return res.status(result.statusCode).json(result)
}

// fetch  classList by admin
export const fetchClassList = async (req, res) => {
    const result = await fetchClassListService(req)
    return res.status(result.statusCode).json(result)
}
// fetch  class by admin
export const fetchSingleClass = async (req, res) => {
    const result = await fetchClassServices(req)
    return res.status(result.statusCode).json(result)
}