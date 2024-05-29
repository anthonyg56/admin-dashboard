import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Input must be a valid email",
      })
      .email({ message: "Please enter a valid email address" })
      .min(1, "Please fill out the email field"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Input must be a string",
      })
      .min(8, { message: "Passwords must be 8 or more characters" })
      .regex(/[A-Z]/, { message: "Passwords must contain one uppercase character" })
      .regex(/\d/, { message: "Passwords must contain one number" })
      .regex(/[ -/:-@[-`{-~]/, { message: "Passwords must contain one special character" })
      .regex(/(?=.*[a-z])/, { message: "Passwords must contain one lowercase character" })
  })

export type LoginSchema = z.infer<typeof loginSchema>