import { IUser } from '@models/User/User.entity'

const users: IUser[] = [
    {
        id: 1,
        name: 'Gratiana Cluley',
        email: 'gcluley0@cafepress.com',
        password: 'dj61lZ',
        bio: 'cursus urna ut tellus nulla',
        active: true,
        role: 'ADMIN',
    },
    {
        id: 2,
        name: 'Carrie Paddy',
        email: 'cpaddy1@icio.us',
        password: 'nUIUZ0',
        bio: 'est phasellus sit amet erat nulla tempus vivamus in felis',
        active: true,
        role: 'ADMIN',
    },
    {
        id: 3,
        name: 'Griffie Fadian',
        email: 'gfadian2@blog.com',
        password: '1cMd6MqbZQZ',
        bio: 'et commodo vulputate justo in',
        active: false,
        role: 'USER',
    },
    {
        id: 4,
        name: 'Court Saladino',
        email: 'csaladino3@wikispaces.com',
        password: 'aijDM4H',
        bio: 'massa donec dapibus duis at velit eu est congue elementum',
        active: false,
        role: 'USER',
    },
    {
        id: 5,
        name: 'Lona Blann',
        email: 'lblann4@weebly.com',
        password: 'k9IZKrlbYaQ',
        bio: 'sit amet erat nulla tempus vivamus in felis eu sapien',
        active: true,
        role: 'USER',
    },
]

export default users
