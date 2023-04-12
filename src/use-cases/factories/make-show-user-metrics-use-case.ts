import { ShowUserMetricsUseCase } from '@/use-cases'
import { PrismaCheckInsRepository } from '@/repositories/prisma'

export function makeShowUserMetricsUseCase(): ShowUserMetricsUseCase {
    const checkInsRepository = new PrismaCheckInsRepository()
    return new ShowUserMetricsUseCase(checkInsRepository)
}
