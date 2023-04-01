import { AuthenticateUseCase } from '@/use-cases'
import { PrismaUsersRepository } from '@/repositories/prisma'

export const makeAuthenticateUseCase = (): AuthenticateUseCase => {
    const usersRepository = new PrismaUsersRepository()
    return new AuthenticateUseCase(usersRepository)
}