import { FastifyReply, FastifyRequest } from 'fastify'
import { createGymBodySchema } from '@/schemas'
import { makeCreateGymUseCase } from '@/use-cases/factories'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    })

    return reply.status(201).send()
}
