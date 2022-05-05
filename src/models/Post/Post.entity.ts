export interface IPost {
    id: number
    title: string
    text: string
    author: string
    createdAt?: Date | string
    updateAt?: Date | string
}

export type TQuery = Pick<IPost, 'id'>
export type TPayload = {
    title?: string
    text?: string
    author?: string
}
