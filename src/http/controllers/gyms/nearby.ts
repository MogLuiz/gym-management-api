import { FastifyReply, FastifyRequest } from 'fastify'
import { nearbyGymsQuerySchema } from '@/schemas/gyms'
import { makeListNearbyGymsUseCase } from '@/use-cases/factories'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)

    const fetchNearbyGymsUseCase = makeListNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({
        gyms,
    })
}
