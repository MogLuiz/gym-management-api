import { ListUserCheckInsHistoryUseCase } from '@/use-cases'
import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'

export function makeListUserCheckInsHistoryUseCase(): ListUserCheckInsHistoryUseCase {
    const checkInsRepository = new PrismaCheckInsRepository()
    return new ListUserCheckInsHistoryUseCase(checkInsRepository)
}

export function makeListUserCheckInsHistoryUseCaseWithInMemoryRepository(): ListUserCheckInsHistoryUseCase {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    return new ListUserCheckInsHistoryUseCase(inMemoryCheckInsRepository)
}
