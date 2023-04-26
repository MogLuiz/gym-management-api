import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create, search, nearby } from '.'

export async function gymsRoutes(app: FastifyInstance) {
    // Add verifyJWT middleware for all requests
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
  
    app.post('/gyms', create)
}