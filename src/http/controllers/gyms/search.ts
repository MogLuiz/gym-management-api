import { FastifyReply, FastifyRequest } from 'fastify'
import { searchGymsQuerySchema } from '@/schemas'
import { makeSearchGymsUseCase } from '@/use-cases/factories'

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const { query, page } = searchGymsQuerySchema.parse(request.body)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
        query,
        page,
    })

    return reply.status(200).send({
        gyms,
    })
}
