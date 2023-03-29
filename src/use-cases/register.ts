import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        throw new Error('E-mail alread exists')
    }

    const password_hash = await hash(password, 6)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        },
    })
}
