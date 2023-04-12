import { ValidateCheckInUseCase } from '@/use-cases'
import { PrismaCheckInsRepository } from '@/repositories/prisma'

export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    return new ValidateCheckInUseCase(checkInsRepository)
}
