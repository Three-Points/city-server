import { IFilters } from '@libs/prisma/Prisma.entity'
import Employee from '@models/Employee/Employee.model'
import { TQEmployee, TPEmployee } from '@models/Employee/Employee.entity'

export default class EmployeeController {
    private model = new Employee()

    /**
     * @description Find all employees.
     * @param {TQEmployee} query Query to find employees.
     * @param {IFilters} filters Optional filters to find employees.
     * @returns Account */
    async findEmployees(query: TQEmployee, filters?: IFilters) {
        return await this.model.findMany(query, filters)
    }

    /**
     * @description Find the oldest employee by age.
     * @returns Account */
    async findOldestEmployee() {
        return await this.model.findUnique()
    }

    /**
     * @description Create an employee.
     * @param {TPEmployee} payload Payload to create an employee.
     * @returns Account */
    async createEmployee(payload: TPEmployee) {
        return await this.model.create(payload)
    }
}
