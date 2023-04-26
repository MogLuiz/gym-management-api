import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticateController, registerController, profileController } from '.'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController),
    app.post('/sessions', authenticateController),

    
    app.get('/me', { onRequest: [verifyJWT] },profileController)
}