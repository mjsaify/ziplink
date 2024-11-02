import { z } from "zod";

export const SignupSchema = z.object({
    fullname: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password must be 6 characters long" }),
});


export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password must be 6 characters long" }),
});


export const UrlSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    originalUrl: z.string().min(1, { message: "Url is required" }).url({ message: "Invalid url" }),
    customLink: z.string().optional(),
});

export const UpdateUserNameAndEmail = z.object({
    fullname: z.string().optional(),
    email: z.string().optional().refine((val) => !val || z.string().email().safeParse(val).success, { message: "Invalid Email"}),
})
// .refine((val) => val.fullname || val.email !== "", {
//     path: ['email'],
//     message: "One of the field is required"
// });

export const UpdateUserPassword = z.object({
    newPassword: z.string().min(6, { message: "Password must be 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be 6 characters long" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});