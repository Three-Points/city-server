import EmployeeController from '@controllers/Employee.controller'
import { IFilters } from '@libs/prisma/Prisma.entity'
import { TQEmployee, TPEmployee } from '@models/Employee/Employee.entity'

const employeeController = new EmployeeController()

/**
 * @description Find pool of employees by query.
 * @param {TQEmployee} query Query to find employees.
 * @param {IFilters} filter Optional filters to find employees.
 * @returns Array of employees. */
export const getEmployees = (query: TQEmployee, filter?: IFilters) => {
    return employeeController.findEmployees(query, filter)
}

/**
 * @description Find an employee.
 * @returns Employee. */
export const getEmployee = () => {
    return employeeController.findOldestEmployee()
}

/**
 * @description Create an employee.
 * @param {TPEmployee} payload Payload to create an employee.
 * @returns Employee. */
export const createEmployee = (payload: TPEmployee) => {
    return employeeController.createEmployee(payload)
}
