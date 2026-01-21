
import {
    fetchSchoolProfileService,
    signUpService,
    updateSchoolProfileService
} from "../services/schoolService.js";

// school signUp
export const schoolSignUp = async (req, res) => {
    const result = await signUpService(req)
    return res.status(result.statusCode).json(result)
}



// fetch school profile
export const fetchSchoolProfile = async (req, res) => {
    const result = await fetchSchoolProfileService(req)
    return res.status(result.statusCode).json(result)
}

// update school Profile
export const updateSchoolProfile = async (req, res) => {
    const result = await updateSchoolProfileService(req)
    return res.status(result.statusCode).json(result)
}

