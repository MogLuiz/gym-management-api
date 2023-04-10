import { CheckIn } from '@prisma/client'
import { ICheckInsRepository, IGymsRepository } from '@/repositories'
import { ResourceNotFoundError, MaxNumberOfCheckInsError, MaxDistanceError } from '../errors'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'


interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

const MAX_DISTANCE_IN_METERS = 100

export class CheckInUseCase {
    constructor(
    private gymsRepository: IGymsRepository,
    private checkInsRepository: ICheckInsRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        if (distance > MAX_DISTANCE_IN_METERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameData = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if (checkInOnSameData) {
            throw new MaxNumberOfCheckInsError()
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
