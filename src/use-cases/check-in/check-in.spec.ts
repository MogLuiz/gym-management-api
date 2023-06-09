import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime'
import { fakeGym, fakeCheckIn, fakeCheckIn02 } from './mock'

import { CheckInUseCase } from '@/use-cases/check-in'
import {
    InMemoryCheckInsRepository,
    InMemoryGymsRepository,
} from '@/repositories/in-memory'
import { MaxDistanceError, MaxNumberOfCheckInsError } from '../errors'

describe('Check-in Use Case', () => {
    let sut: CheckInUseCase
    let gymsRepository: InMemoryGymsRepository
    let checkInsRepository: InMemoryCheckInsRepository

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(gymsRepository, checkInsRepository)

        await gymsRepository.create(fakeGym)

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

        await expect(() => sut.execute(fakeCheckIn)).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice  but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute(fakeCheckIn)

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.execute(fakeCheckIn02)

        expect(checkIn.id).toEqual(expect.any(String))
        expect(checkIn.gym_id).toEqual(fakeCheckIn02.gymId)
        expect(checkIn.user_id).toEqual(fakeCheckIn02.userId)
    })

    it('should not be able to check in on distant gym', async () => {
        await gymsRepository.create({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672),
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -27.2092052,
                userLongitude: -49.6401091,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
