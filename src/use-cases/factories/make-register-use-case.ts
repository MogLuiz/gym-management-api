import { RegisterUseCase } from '@/use-cases'
import { PrismaUsersRepository } from '@/repositories/prisma'
import { InMemoryUsersRepository } from '@/repositories/in-memory'

export function makeRegisterUseCase(): RegisterUseCase {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterUseCase(usersRepository)
}

export function makeRegisterUseCaseWithInMemoryRepository(): RegisterUseCase {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    return new RegisterUseCase(inMemoryUsersRepository)
}