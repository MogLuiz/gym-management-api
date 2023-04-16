import { FastifyReply, FastifyRequest } from 'fastify'
import { makeShowUserProfileUseCase } from '@/use-cases/factories'

export async function profileController(
    request: FastifyRequest,
    response: FastifyReply
) {
    await request.jwtVerify()

    const showUserProfile = makeShowUserProfileUseCase()

    const { user } = await showUserProfile.execute({
        userId: request.user.sub,
    })

    return response.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        },
    })
}
