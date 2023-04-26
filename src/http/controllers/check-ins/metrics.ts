import { FastifyReply, FastifyRequest } from 'fastify'
import { makeShowUserMetricsUseCase } from '@/use-cases/factories'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsUseCase = makeShowUserMetricsUseCase()

    const { checkInsCount } = await getUserMetricsUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        checkInsCount,
    })
}