import { IFilters } from '@libs/prisma/Prisma.entity'

/**
 * @abstract
 * @class Model
 * @description Base class for all models. */
export default abstract class Model<TModel, TQuery, TPayload> {
    /**
     * @abstract
     * @description Abstract method to find registers in model.
     * @param {TQuery} query Query to find registers.
     * @returns Array of register of model. */
    abstract findMany(query?: TQuery, filters?: IFilters): Promise<TModel[]>
    /**
     * @abstract
     * @description Abstract method to find register in model.
     * @param {TQuery} query Query to find registers.
     * @returns Register in model. */
    abstract findUnique(query?: TQuery): Promise<TModel>
    /**
     * @abstract
     * @description Abstract method to find register in model.
     * @param {TPayload} payload Payload to create register.
     * @returns Register in model as result set. */
    abstract create(payload: TPayload): void
}
