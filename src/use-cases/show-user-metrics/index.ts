import { ICheckInsRepository } from '@/repositories'

interface IShowUserMetricsUseCaseRequest {
  userId: string;
}

interface IShowUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class ShowUserMetricsUseCase {
    constructor(private checkInsRepository: ICheckInsRepository) {}

    async execute({
        userId,
    }: IShowUserMetricsUseCaseRequest): Promise<IShowUserMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}
