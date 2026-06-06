import * as z from "zod";

export const submitFormSchema = z.object({
    name: z.string().min(1, {message: 'Field required'}).regex(/^[A-Z].*/, { message: 'Should start with uppercase' }),
    age: z.coerce.number().positive({ message: 'Should be positive' }),
    email: z.string().min(1, { message: 'Field required' }),
    gender: z.string({ message: 'Field required' }),
    terms: z.literal('yes', {message: 'Should be checked'}),
})

export type Submission= z.infer<typeof submitFormSchema>