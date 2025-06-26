import { z } from 'zod';

export const signUpSchema = z.object({

    email: z.string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' })
        .default(""),

    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .default(""),

    confirmPassword: z.string()
        .min(8, { message: 'Confrim password must be matched and at least 8 characters' })
        .default(""),

    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username must be at most 20 characters' }).default("")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type SignUpSchemaFormValues = z.infer<typeof signUpSchema>;
