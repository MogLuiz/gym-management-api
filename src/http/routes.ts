import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'
import { authenticateController, registerController, profileController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController),
    app.post('/sessions', authenticateController),

    
    app.get('/me', { onRequest: [verifyJWT] },profileController)
}