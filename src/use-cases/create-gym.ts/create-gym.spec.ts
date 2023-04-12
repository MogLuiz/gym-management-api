import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from '.'
import { makeCreateGymUseCaseWithInMemoryRepository } from '@/use-cases/factories'

const fakeGym = {
    title: 'Go academy',
    description: null,
    phone: null,
    latitude: -19.9405733,
    longitude: -44.0058067,
}

describe('Create Gym Use Case', () => {
    let sut: CreateGymUseCase

    beforeEach(() => {
        sut = makeCreateGymUseCaseWithInMemoryRepository()
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute(fakeGym)

        expect(gym.title).toEqual(fakeGym.title)
        expect(gym.id).toEqual(expect.any(String))
    })
})
