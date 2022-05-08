import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_TOKEN } from '@config/env'
import UserController from '@controllers/User.controller'
import ErrorServer from '@controllers/ErrorServer.controller'
import { IUser, TPUser } from '@models/User/User.entity'

export default class AuthController {
    private userController = new UserController()

    /**
     * @description Authenticate an account.
     * @param {TPUser} payload
     * @throws ErrorServer - UNAUTHORIZED
     * @returns JWT Token */
    async authentication({ email, password }: TPUser) {
        const user = await this.userController.findUser({
            email,
        })
        if (!user.active)
            throw new ErrorServer('UNAUTHORIZED', 'User is not active')
        const isMatchPassword = await bcrypt.compare(
            password as string,
            user.password
        )
        if (!isMatchPassword) throw new ErrorServer('UNAUTHORIZED')
        const { id, name } = user
        return { token: jwt.sign({ id, email, name }, JWT_TOKEN as string) }
    }

    /**
     * @description Verify an account.
     * @param {string} token
     * @throws ErrorServer - UNAUTHORIZED
     * @returns User */
    async verification(token: string) {
        if (!token) throw new ErrorServer('UNAUTHORIZED')
        const verified = jwt.verify(token, JWT_TOKEN as string) as IUser
        if (!verified) throw new ErrorServer('UNAUTHORIZED')
        const user = await this.userController.findUser({ id: verified.id })
        if (!user.active) throw new ErrorServer('UNAUTHORIZED')
        return user
    }

    /**
     * @description Authorization an account by id given.
     * @param {string} token
     * @param {number} id
     * @throws ErrorServer - UNAUTHORIZED */
    async authorizationById(token: string, id: number) {
        const verified = jwt.verify(token, JWT_TOKEN as string) as IUser
        if (!verified || verified.id !== id)
            throw new ErrorServer('UNAUTHORIZED')
    }

    /**
     * @description Authorization an account by its role.
     * @param {string} token
     * @throws ErrorServer - UNAUTHORIZED */
    async authorizationByRole(token: string) {
        const verified = jwt.verify(token, JWT_TOKEN as string) as IUser
        if (!verified) throw new ErrorServer('UNAUTHORIZED')
        const user = await this.userController.findUser({ id: verified.id })
        if (user.role !== 'ADMIN') throw new ErrorServer('UNAUTHORIZED')
    }
}
