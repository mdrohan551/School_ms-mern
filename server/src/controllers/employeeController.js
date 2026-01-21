import {
    createEmployeeService,
    deleteEmployeeService,
    fetchEmployeeListService,
    searchEmployeeService,
    fetchEmployeeService,
    updateEmployeeService
} from "../services/employeeService.js";

// create employee by admin
export const createEmployee = async (req, res) => {
    const result = await createEmployeeService(req)
    return res.status(result.statusCode).json(result)
}

// update employee by admin
export const updateEmployee = async (req, res) => {
    const result = await updateEmployeeService(req)
    return res.status(result.statusCode).json(result)
}

// delete employee by admin
export const deleteEmployee = async (req, res) => {
    const result = await deleteEmployeeService(req)
    return res.status(result.statusCode).json(result)
}

// fetch employeeList by admin
export const fetchEmployeeList = async (req, res) => {
    const result = await fetchEmployeeListService(req)
    return res.status(result.statusCode).json(result)
}

// fetch single employee profile by admin
export const fetchEmployee = async (req, res) => {
    const result = await fetchEmployeeService(req)
    return res.status(result.statusCode).json(result)
}

// search student by admin
export const searchEmployee = async (req, res) => {
    const result = await searchEmployeeService(req)
    return res.status(result.statusCode).json(result)
}