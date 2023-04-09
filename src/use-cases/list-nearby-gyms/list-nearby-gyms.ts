import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IListNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IListNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class ListNearbyGymsUseCase {
    constructor(private gymsRepository: IGymsRepository) {}

    async execute({
        userLatitude,
        userLongitude,
    }: IListNearbyGymsUseCaseRequest): Promise<IListNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude,
        })

        return {
            gyms,
        }
    }
}