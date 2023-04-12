import { CreateGymUseCase } from '.'
import { InMemoryGymsRepository } from '@/repositories/in-memory'

export function makeCreateGymUseCaseWithInMemoryRepository(): CreateGymUseCase {
    const usersRepository = new InMemoryGymsRepository()
    return new CreateGymUseCase(usersRepository)
}
