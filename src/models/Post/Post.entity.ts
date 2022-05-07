export interface IPost {
    id: number
    title: string
    text: string
    author: string
    createdAt?: Date | string
    updatedAt?: Date | string
}

export type TQPost = {
    id?: number
    page?: number
}
export type TPPost = {
    title?: string
    text?: string
    author?: string
}
