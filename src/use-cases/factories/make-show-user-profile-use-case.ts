import { ShowUserProfileUseCase } from '@/use-cases'
import { PrismaUsersRepository } from '@/repositories/prisma'

export function makeShowUserProfileUseCase(): ShowUserProfileUseCase {
    const usersRepository = new PrismaUsersRepository()
    return new ShowUserProfileUseCase(usersRepository)
}
