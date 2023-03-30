import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface IRegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
    email,
    name,
    password,
}: IRegisterUseCaseParams) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        console.log('entrei no thwow')
        throw new Error('E-mail alread exists')
    }

    console.log('Sai do theos')

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({ name, email, password_hash })
}
