import { CheckInUseCase } from '@/use-cases'
import { PrismaGymsRepository, PrismaCheckInsRepository } from '@/repositories/prisma'

import { InMemoryGymsRepository, InMemoryCheckInsRepository  } from '@/repositories/in-memory'

export function makeCheckInUseCase(): CheckInUseCase {
    const gymsRepository = new PrismaGymsRepository()
    const checkInsRepository = new PrismaCheckInsRepository()

    return new CheckInUseCase(gymsRepository, checkInsRepository)
}

export function makeCheckInUseCaseWithInMemoryRepository(): CheckInUseCase {
    const gymsRepository = new InMemoryGymsRepository()
    const checkInsRepository = new InMemoryCheckInsRepository()

    return new CheckInUseCase(gymsRepository, checkInsRepository)
}

