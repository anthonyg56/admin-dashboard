"use server"

import { redirect } from "next/navigation"
import { loginSchema } from "./schema"
import { FormState as PrevFormState } from "@/components/form"
import { signIn } from "./db/helpers/auth"

// Create a new type for better readibility
type NewFormState = PrevFormState

export async function handleLogin(prevState: PrevFormState, formData: FormData): Promise<NewFormState | undefined> {
  const results = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  // If parsing fails, return to the form with an error 
  if (results.success === false)
    return "Invalid credentials"

  // Emails should be saved in the db as lowcase, so we cleanse it before sign in
  const cleansedEmail = results.data.email.toLowerCase()

  const data = await signIn(cleansedEmail).catch(error => {
    throw new Error(error.message)
  })

  // If no data is returned, return to the form with an error 
  if (data === undefined)
    return "Invalid credentials"

  // sign in successful, redirect to dashboard
  redirect('/dashboard')
}