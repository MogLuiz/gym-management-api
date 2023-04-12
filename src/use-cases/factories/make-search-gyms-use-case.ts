import { SearchGymsUseCase } from '@/use-cases'
import { PrismaGymsRepository } from '@/repositories/prisma'

export function makeSearchGymsUseCase(): SearchGymsUseCase {
    const gymsRepository = new PrismaGymsRepository()
    return new SearchGymsUseCase(gymsRepository)
}
