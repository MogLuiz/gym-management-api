import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

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

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute(fakeCheckIn)

        expect(checkIn.id).toEqual(expect.any(String))
        expect(checkIn.gym_id).toEqual(fakeCheckIn.gymId)
        expect(checkIn.user_id).toEqual(fakeCheckIn.userId)
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute(fakeCheckIn)

        await expect(() => sut.execute(fakeCheckIn)).rejects.toBeInstanceOf(Error)  
    })
})
