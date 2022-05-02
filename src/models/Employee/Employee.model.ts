import { IEmployee, TQEmployee, TPEmployee } from './Employee.entity'
import { IFilters } from '@libs/prisma/Prisma.entity'
import Model from '@models/Model'

import employees from '@db/mocks/employee.mock'

/**
 * @class Employee
 * @extends Model
 * @description Employee Model Class. */
export default class Employee extends Model<IEmployee, TQEmployee, TPEmployee> {
    /**
     * @description Find pool of employees.
     * @param {TQEmployee} query Query to find employees.
     * @param {IFilters} filters Optional filters to find employees.
     * @returns Array of employees. */
    async findMany(
        { privileges, badges, name }: TQEmployee,
        filters?: IFilters
    ): Promise<IEmployee[]> {
        if (filters?.page) {
            return employees.slice(filters?.page - 1, filters?.page + 1)
        }
        if (privileges) {
            return employees.filter(
                (employee) => employee.privileges === privileges
            )
        }
        if (badges?.length) {
            return employees.filter((employee) => {
                return employee.badges.some((badge) => badges.includes(badge))
            })
        }
        if (name) {
            return employees.filter((employee) => {
                return employee.name.toLowerCase().includes(name.toLowerCase())
            })
        }
        return employees
    }

    /**
     * @description Find an employee.
     * @returns Employee. */
    async findUnique() {
        return employees.reduce((previous, current) =>
            previous.age > current.age ? previous : current
        )
    }

    /**
     * @description Create an employee.
     * @param {TPEmployee} payload Payload to create an employee.
     * @returns Employee. */
    async create(payload: IEmployee) {
        employees.push(payload)
    }
}
