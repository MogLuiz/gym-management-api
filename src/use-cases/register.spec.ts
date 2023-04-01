import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors'

const fakeUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
}

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
    
        const { user } = await registerUseCase.execute(fakeUser)

        expect(user.name).toEqual(fakeUser.name)
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const password = '123456'
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
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
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        await registerUseCase.execute(fakeUser)

        await expect(() => registerUseCase.execute(fakeUser)).rejects.toBeInstanceOf(
            UserAlreadyExistsError
        )
    })
})
