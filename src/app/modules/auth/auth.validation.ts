import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['admin', 'user']).optional(),
  isBlocked: z.boolean().optional(),
});
