import { z } from "zod";

export const SignupSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password must be 6 characters long" }),
});


export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password must be 6 characters long" }),
});