import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

import { UserAlreadyExistsError } from '@/use-cases/errors'

import { IUsersRepository } from '@/repositories/users-repository'

interface IRegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ email, name, password }: IRegisterUseCaseParams): Promise<IRegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        if (await this.usersRepository.findByEmail(email)) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return { user }
    }
}
