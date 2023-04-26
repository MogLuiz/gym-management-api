import { z } from 'zod'

export const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
    }),
})
