export interface IEmployee {
    name: string
    age: number
    phone: {
        personal: string
        work: string
        ext: string
    }
    privileges: 'admin' | 'user'
    favorites: {
        artist: string
        food: string
    }
    finished: Array<number>
    badges: Array<'blue' | 'black' | 'green' | 'orange'>
    points: Array<{
        points: number
        bonus: number
    }>
}

export type TQEmployee = Partial<IEmployee> & {
    oldest?: boolean
}
export type TPEmployee = IEmployee
