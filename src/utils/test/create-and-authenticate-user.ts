import request from 'supertest'
import { FastifyInstance } from 'fastify'

const userMock = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
}

export async function createAndAuthenticateUser(
    app: FastifyInstance,
    userData = userMock
) {
    await request(app.server).post('/users').send(userData)

    const authResponse = await request(app.server).post('/sessions').send({
        email: userData.email,
        password: userData.password,
    })

    const { token } = authResponse.body

    return { token }
}
