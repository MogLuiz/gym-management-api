import { Gym } from '@prisma/client'

import { IGymsRepository } from '@/repositories'

interface ICreateGymUseCaseParams {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
    constructor(private gymsRepository: IGymsRepository) {}

    async execute({
        description,
        latitude,
        longitude,
        phone,
        title,
    }: ICreateGymUseCaseParams): Promise<ICreateGymUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            description,
            latitude,
            longitude,
            phone,
            title,
        })

        return { gym }
    }
}
