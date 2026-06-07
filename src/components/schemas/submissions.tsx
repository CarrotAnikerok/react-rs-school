import * as z from 'zod';

export const submitFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Field required' })
      .regex(/^[A-Z].*/, { message: 'Should start with uppercase' }),
    age: z.coerce.number().positive({ message: 'Should be positive' }),
    email: z
      .string()
      .min(1, { message: 'Field required' })
      .refine(validateEmail, { message: 'Email is wrong' }),
    gender: z.string({ message: 'Field required' }),
    country: z.string({ message: 'Field required' }),
    picture: z
      .union([z.instanceof(FileList), z.instanceof(File)])
      .transform((file) => {
        if (file instanceof FileList) return file[0];
        if (file instanceof File) return file;
        return null;
      })
      .refine((file) => !!file, 'File required')
      .refine(validateImgSize, 'File size must be less than 10mb')
      .refine(validateImgType, 'File must be image'),
    terms: z
      .transform((val) => {
        return !!val;
      })
      .refine((val) => val === true, {
        message: 'Should be checked',
      }),
    password: z.string().min(1, { message: 'Field required' }),
    copyPassword: z.string().min(1, { message: 'Field required' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.copyPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password is not the same as password',
        path: ['copyPassword'],
      });
    }
  });

function validateImgSize(file: File) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  if (!file) {
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    return false;
  }

  return true;
}

function validateImgType(file: File) {
  if (!file) {
    return false;
  }

  if (!file.type.startsWith('image/')) {
    return false;
  }

  return true;
}

function validateEmail(email: string) {
  if (email.split('@').length < 2) {
    return false;
  }

  const emailDomain = email.split('@')[1];
  const domainParts = emailDomain.split('.');
  const emailDomainCorrect = domainParts.length > 1 && domainParts[1] !== '';

  if (
    email.indexOf('@') > 0 &&
    emailDomain.includes('.') &&
    emailDomainCorrect
  ) {
    return true;
  }

  return false;
}

export type SubmitForm = z.infer<typeof submitFormSchema>;
