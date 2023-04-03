import { CheckIn } from '@prisma/client'
import { ICheckInsRepository, IGymsRepository } from '@/repositories'
import { ResourseNotFoundError } from './errors'

interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
    private gymsRepository: IGymsRepository,
    private checkInsRepository: ICheckInsRepository
    ) {}

    async execute({
        userId,
        gymId,
    }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourseNotFoundError()
        }

        // calculate distance between user and gym

        const checkInOnSameData = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameData) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}
