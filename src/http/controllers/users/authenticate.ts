import { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateBodySchema } from '@/schemas'

import { makeAuthenticateUseCase } from '@/use-cases/factories'
import { InvalidCredentialsError } from '@/use-cases/errors'

export async function authenticateController(
    request: FastifyRequest,
    response: FastifyReply
) {
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await response.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            }
        )

        const refreshToken = await response.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d',
                },
            }
        )

        return response
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({ token })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            response.status(400).send({ message: err.message })
        }

        throw err
    }
}
