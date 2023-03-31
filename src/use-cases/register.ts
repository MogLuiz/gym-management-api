import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { IUsersRepository } from '@/repositories/users-repository'

interface IRegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ email, name, password }: IRegisterUseCaseParams) {
        const password_hash = await hash(password, 6)

        if (await this.usersRepository.findByEmail(email)) {
            throw new Error('E-mail alread exists')
        }

        await this.usersRepository.create({ name, email, password_hash })
    }
}
