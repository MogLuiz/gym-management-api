import { FastifyInstance } from 'fastify'
import { authenticateController, registerController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController),
    app.post('/sessions', authenticateController)
}