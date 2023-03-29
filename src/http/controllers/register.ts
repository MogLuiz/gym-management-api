import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { registerUseCase } from '@/use-cases/register'

export async function register(
    request: FastifyRequest,
    response: FastifyReply
) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        registerUseCase({
            name,
            email,
            password
        })
    } catch (err) {
        response.status(409).send()
    }

    return response.status(201).send()
}
