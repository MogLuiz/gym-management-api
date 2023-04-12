import { RegisterUseCase } from '.'
import { PrismaUsersRepository } from '@/repositories/prisma'
import { InMemoryUsersRepository } from '@/repositories/in-memory'

export function makeRegisterUseCase(): RegisterUseCase {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterUseCase(usersRepository)
}

export function makeRegisterUseCaseWithInMemoryRepository(): RegisterUseCase {
    const usersRepository = new InMemoryUsersRepository()
    return new RegisterUseCase(usersRepository)
}