import { Gym, Prisma } from '@prisma/client'

import { IFindManyNearbyParams, IGymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements IGymsRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            created_at: new Date(),
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.items.push(gym)

        return gym
    }

    async findManyNearby(params: IFindManyNearbyParams) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber(),
                },
            )
            
    
            return distance < 10000
        })
    }

    async searchMany(query: string, page: number) {
        return this.items
            .filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }
}
