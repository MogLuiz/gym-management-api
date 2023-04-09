import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-error'
import { CheckIn } from '@prisma/client'

interface IValidateCheckInUseCaseRequest {
  checkInId: string
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: ICheckInsRepository) {}

    async execute({
        checkInId,
    }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn,
        }
    }
}