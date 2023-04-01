import { RegisterUseCase } from '@/use-cases'
import { PrismaUsersRepository } from '@/repositories/prisma'

export function makeRegisterUseCase(): RegisterUseCase {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterUseCase(usersRepository)
}