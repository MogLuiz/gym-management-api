import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors'

const fakeUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
}

describe('Register Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let sut: RegisterUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute(fakeUser)

        expect(user.name).toEqual(fakeUser.name)
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const password = '123456'
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: password,
        })

        const isPasswordCorrectlyHashed = await compare(
            password,
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        await sut.execute(fakeUser)

        await expect(() => sut.execute(fakeUser)).rejects.toBeInstanceOf(
            UserAlreadyExistsError
        )
    })
})
