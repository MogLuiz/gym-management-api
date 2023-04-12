import { CreateGymUseCase } from '@/use-cases'
import { PrismaGymsRepository } from '@/repositories/prisma'
import { InMemoryGymsRepository } from '@/repositories/in-memory'

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    return new CreateGymUseCase(gymsRepository)
}

export function makeCreateGymUseCaseWithInMemoryRepository(): CreateGymUseCase {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    return new CreateGymUseCase(inMemoryGymsRepository)
}
