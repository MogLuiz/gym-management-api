import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '.'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { InvalidCredentialsError } from '../errors'

const fakeUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
}

describe('Authenticate Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: AuthenticateUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        usersRepository.create({
            name: fakeUser.name,
            email: fakeUser.email,
            password_hash: await hash(fakeUser.password, 6),
        })

        const { user } = await sut.execute({
            email: fakeUser.email,
            password: fakeUser.password,
        })

        expect(user.name).toEqual(fakeUser.name)
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            sut.execute({
                email: fakeUser.email,
                password: fakeUser.password,
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        usersRepository.create({
            name: fakeUser.name,
            email: fakeUser.email,
            password_hash: await hash(fakeUser.password, 6),
        })

        await expect(() =>
            sut.execute({
                email: fakeUser.email,
                password: 'invalidPassword',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
