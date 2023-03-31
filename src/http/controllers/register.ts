
import { FastifyReply, FastifyRequest } from 'fastify'

import { registerBodySchema } from '@/schemas'

import { RegisterUseCase } from '@/use-cases'
import { UserAlreadyExistsError } from '@/use-cases/errors'

import { PrismaUsersRepository } from '@/repositories/prisma'

export async function register(
    request: FastifyRequest,
    response: FastifyReply
) {
 

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        await registerUseCase.execute({
            name,
            email,
            password,
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            response.status(409).send({ message: err.message })
        }

        throw err
    }

    return response.status(201).send()
}
