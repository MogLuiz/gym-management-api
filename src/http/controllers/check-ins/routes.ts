import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create, history, metrics, validate } from '.'

export async function checkInsRoutes(app: FastifyInstance) {
    // Add verifyJWT middleware for all requests
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', validate)
}
