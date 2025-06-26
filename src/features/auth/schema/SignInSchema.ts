import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).default(""),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).default(""),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
