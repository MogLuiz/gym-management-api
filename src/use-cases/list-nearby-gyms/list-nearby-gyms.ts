import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface ListNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface ListNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class ListNearbyGymsUseCase {
    constructor(private gymsRepository: IGymsRepository) {}

    async execute({
        userLatitude,
        userLongitude,
    }: ListNearbyGymsUseCaseRequest): Promise<ListNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude,
        })

        return {
            gyms,
        }
    }
}