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
     * @description Verify an account identity.
     * @param {string} token
     * @throws ErrorServer - UNAUTHORIZED
     * @returns User */
    async verification(token: string) {
        const verify = jwt.verify(token, JWT_TOKEN as string) as IUser
        return await this.userController.findUser({ id: verify.id })
    }

    /**
     * @description Authorization an account by its role.
     * @param {string} token
     * @throws ErrorServer - UNAUTHORIZED */
    async authorizationByRole(token: string) {
        const { id } = await this.verification(token)
        const user = await this.userController.findUser({ id })
        if (user.role !== 'ADMIN') throw new ErrorServer('UNAUTHORIZED')
    }
}
