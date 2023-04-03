import { User } from '@prisma/client'
import { IUsersRepository } from '@/repositories/users-repository'
import { ResourseNotFoundError } from '@/use-cases/errors'

interface IShowUserProfileUseCaseRequest {
  userId: string;
}

interface IShowUserProfileUseCaseResponse {
  user: User;
}

export class ShowUserProfileUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        userId,
    }: IShowUserProfileUseCaseRequest): Promise<IShowUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourseNotFoundError()
        }

        return { 
            user
        }
    }
}
