import * as z from "zod";

export const submitFormSchema = z.object({
    name: z.string().min(1, {message: 'Field required'}).regex(/^[A-Z].*/, { message: 'Should start with uppercase' }),
    age: z.coerce.number().positive({ message: 'Should be positive' }),
    email: z.string().min(1, { message: 'Field required' }).refine(validateEmail, { message: 'Email is wrong'}),
    gender: z.string({ message: 'Field required' }),
    terms: z.literal('yes', {message: 'Should be checked'}),
})

function validateEmail(email:string) {
    if (email.split('@').length < 2) {
        return false;
    }

    const emailDomain = email.split('@')[1];
    const domainParts = emailDomain.split('.');
    const emailDomainCorrect = domainParts.length > 1 && domainParts[1] !== '';

    if (email.indexOf('@') > 0 && emailDomain.includes('.') && emailDomainCorrect) {
        console.log('domain is ' + emailDomain.split('.'))
        return true
    }

    return false;
}

export type Submission= z.infer<typeof submitFormSchema>