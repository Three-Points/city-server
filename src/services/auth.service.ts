import AuthController from '@controllers/Auth.controller'

const authController = new AuthController()

/**
 * @description Authenticate user.
 * @param {string} email
 * @param {string} password */
export const login = async (email: string, password: string) => {
    return await authController.authentication({ email, password })
}

/**
 * @description Verify user token.
 * @param {string} token*/
export const verify = async (token: string) => {
    return await authController.verification(token)
}

/**
 * @description Authorization a user's role.
 * @param {string} token */
export const authorizationByRole = async (token: string) => {
    return await authController.authorizationByRole(token)
}

/**
 * @description Authorization by introspect id given.
 * @param {string} token
 * @param {number} id */
export const authorizationById = async (token: string, id: number) => {
    return await authController.authorizationById(token, id)
}
