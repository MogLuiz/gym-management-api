import { ICheckInsRepository } from '@/repositories'
import { CheckIn } from '@prisma/client'

interface IListUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface IListUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: ICheckInsRepository) {}

    async execute({
        userId,
        page,
    }: IListUserCheckInsHistoryUseCaseRequest): Promise<IListUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(
            userId,
            page,
        )

        return {
            checkIns,
        }
    }
}