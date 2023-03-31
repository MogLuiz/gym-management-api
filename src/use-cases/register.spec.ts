import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const password = '123456'
        const registerUseCase = new RegisterUseCase({
            async findByEmail() {
                return null
            },

            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            },
        })

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: password,
        })

        const isPasswordCorrectlyHashed = await compare(
            password,
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})