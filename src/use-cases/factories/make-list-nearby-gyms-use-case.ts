import { ListNearbyGymsUseCase } from '@/use-cases'
import { PrismaGymsRepository } from '@/repositories/prisma'

export function makeListNearbyGymsUseCase(): ListNearbyGymsUseCase {
    const gymsRepository = new PrismaGymsRepository()
    return new ListNearbyGymsUseCase(gymsRepository)
}
