import { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateBodySchema } from '@/schemas'

import { AuthenticateUseCase } from '@/use-cases'
import { InvalidCredentialsError } from '@/use-cases/errors'

import { PrismaUsersRepository } from '@/repositories/prisma'

export async function authenticateController(
    request: FastifyRequest,
    response: FastifyReply
) {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await authenticateUseCase.execute({
            email,
            password,
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            response.status(400).send({ message: err.message })
        }

        throw err
    }

    return response.status(200).send()
}
