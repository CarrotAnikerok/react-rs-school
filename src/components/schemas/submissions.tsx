import * as z from "zod";

export const submitFormSchema = z.object({
    name: z.string().regex(/^[A-Z].*/, { message: 'Should start with uppercase' }),
    age: z.coerce.number().positive({ message: 'Should be positive' }),
    gender: z.string({ message: 'Requared' }),
    terms: z.preprocess((val) => val === 'on', z.boolean())
})

export type Submission= z.infer<typeof submitFormSchema>