import { IUser, TQUser, TPUser } from './User.entity'
import Model from '@models/Model'

/**
 * @class User
 * @extends Model
 * @description User Model Class. */
export default class User extends Model<IUser, TQUser, TPUser> {
    /**
     * @constructor
     * @description Generate link to Prisma model. */
    constructor() {
        super('user')
    }

    /**
     * @description Find pool of users.
     * @param {TQUser} query Query to find users.
     * @returns User array. */
    async findMany(query?: TQUser) {
        return [
            await this.client.findMany({
                ...this.pagination(query?.page || 1),
            }),
            await this.client.count(),
        ]
    }

    /**
     * @description Find a user.
     * @param {TQUser} query Query to find user.
     * @returns User. */
    async findUnique(query: TQUser) {
        return await this.client.findUnique({ where: query })
    }

    /**
     * @description Create a user.
     * @param {TPUser} payload Payload to create a user.
     * @returns User. */
    async create(payload: TPUser) {
        return await this.client.create({ data: payload })
    }

    /**
     * @description Update a user.
     * @param {TQUser} query Query to find user.
     * @param {TPUser} payload Payload to create a user.
     * @returns User. */
    async update(query: TQUser, payload: TPUser) {
        return await this.client.update({ where: query, data: payload })
    }

    /**
     * @description Delete a user.
     * @param {TQUser} query Query to find user.
     * @returns User. */
    async delete({ id }: TQUser) {
        return await this.client.delete({ where: { id } })
    }
}
