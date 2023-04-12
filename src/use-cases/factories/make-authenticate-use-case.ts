import { AuthenticateUseCase } from '@/use-cases'
import { PrismaUsersRepository } from '@/repositories/prisma'
import { InMemoryUsersRepository } from '@/repositories/in-memory'

export const makeAuthenticateUseCase = (): AuthenticateUseCase => {
    const usersRepository = new PrismaUsersRepository()
    return new AuthenticateUseCase(usersRepository)
}


export const makeAuthenticateUseCaseWithInMemoryRepository = (): AuthenticateUseCase => {
    const usersRepository = new InMemoryUsersRepository()
    return new AuthenticateUseCase(usersRepository)
}
 