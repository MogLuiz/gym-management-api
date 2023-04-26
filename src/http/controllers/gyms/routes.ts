import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import {  } from '.'

export async function gymsRoutes(app: FastifyInstance) {
    // Add verifyJWT middleware for all requests
    app.addHook('onRequest', verifyJWT)
}