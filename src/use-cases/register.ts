
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface IRegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: any){}

    async execute({
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
            throw new Error('E-mail alread exists')
        }
    
    
    
        await this.usersRepository.create({ name, email, password_hash })
    }
}

