import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { ShowUserProfileUseCase } from './show-user-profile'
import { ResourseNotFoundError } from '../errors'

const fakeUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
}

describe('Show User Profile Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: ShowUserProfileUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new ShowUserProfileUseCase(usersRepository)
    })

    it('should be able to show user profile informations', async () => {
        const createdUser = await usersRepository.create({
            name: fakeUser.name,
            email: fakeUser.email,
            password_hash: await hash(fakeUser.password, 6),
        })

        const { user }  = await sut.execute({
            userId:  createdUser.id
        })

        expect(user).toEqual(createdUser)
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual(expect.any(String))
    })

    it('should not be able to show user with wrong id', async () => {
        await expect(() =>
            sut.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourseNotFoundError)
    })
})
