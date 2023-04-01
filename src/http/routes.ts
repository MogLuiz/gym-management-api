import { FastifyInstance } from 'fastify'
import { registerController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
}