export interface IUser {
    id: number
    name: string
    email: string
    password: string
    bio: string
    active: boolean
    role: string | 'ADMIN' | 'USER'
    createdAt?: Date | string
    updatedAt?: Date | string
}

export type TQUser = {
    id?: number
    email?: string
    page?: number
}
export type TPUser = {
    name?: string
    email?: string
    password?: string
    bio?: string
    active?: boolean
    role?: string | 'ADMIN' | 'USER'
}
