import { FastifyReply, FastifyRequest } from 'fastify'

import { registerBodySchema } from '@/schemas'


import { makeRegisterUseCase } from '@/use-cases'
import { UserAlreadyExistsError } from '@/use-cases/errors'

export async function registerController(
    request: FastifyRequest,
    response: FastifyReply
) {
    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

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
