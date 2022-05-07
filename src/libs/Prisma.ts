import { PrismaClient } from '@prisma/client'
import ErrorServer from '@controllers/ErrorServer.controller'

/**
 * @type IParams
 * @description Prisma parameters. */
interface IParams {
    skip?: number
    take?: number
    where?: {
        AND?: Array<{
            [key: string]: any
        }>
        OR?: Array<{
            [key: string]: any
        }>
        [key: string]: any
    }
    orderBy?: Array<{
        [key: string]: any
    }>
    data?: {
        [key: string]: any
    }
}

/**
 * @class
 * @description Prisma ORM definition handler library */
export default class Prisma {
    /**
     * @private
     * @description Prisma model name. */
    private readonly resource: string
    /**
     * @private
     * @description Prisma client reference. */
    private readonly client: PrismaClient = new PrismaClient()

    /**
     * @constructor
     * @param {string} resource Model name. */
    constructor(resource: string) {
        this.resource = resource
    }

    /**
     * @description Singleton pattern for pool connection.
     * @returns Connection to model. */
    private connect() {
        const model = Object.entries(this.client).find(
            ([key]) => key === this.resource
        )
        if (!model)
            throw new ErrorServer('SERVER', `Model ${this.resource} not found`)
        return model[1]
    }

    /**
     * @description Find a register in model.
     * @returns Result. */
    findUnique(params: IParams) {
        return this.connect().findUnique(params)
    }

    /**
     * @description Find all registers in model.
     * @returns Result. */
    findMany(params: IParams) {
        return this.connect().findMany(params)
    }

    /**
     * @description Get a count of registers in model.
     * @returns Result. */
    count() {
        return this.connect().count()
    }

    /**
     * @description Create a registers in model.
     * @returns Result. */
    create(params: IParams) {
        return this.connect().create(params)
    }

    /**
     * @description Update a register in model.
     * @returns Result. */
    update(params: IParams) {
        return this.connect().update(params)
    }

    /**
     * @description Delete a register in model.
     * @returns Result. */
    delete(params: IParams) {
        return this.connect().delete(params)
    }
}
