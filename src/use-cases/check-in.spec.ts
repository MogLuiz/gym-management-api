import { expect, describe, it, beforeEach } from 'vitest'

import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'

const fakeCheckIn = {
    gymId: 'gym-01',
    userId: 'user-01',
}

describe('Check-in Use Case', () => {
    let checkInsRepository: InMemoryCheckInsRepository
    let sut: CheckInUseCase

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute(fakeCheckIn)

        expect(checkIn.id).toEqual(expect.any(String))
        expect(checkIn.gym_id).toEqual(fakeCheckIn.gymId)
        expect(checkIn.user_id).toEqual(fakeCheckIn.userId)
    })
})
