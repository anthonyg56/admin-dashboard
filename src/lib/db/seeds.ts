import { sql } from "@vercel/postgres"
import { hashPassword } from "./helpers/user"

const localPassword = process.env.LOCAL_PW || ""

export async function seedUser() {
  const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      passhash VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Create a hash of your env password
  const hashedPass = await hashPassword(localPassword)

  const users = await sql`
    INSERT INTO users (name, email, passhash)
    VALUES (
      'YOUR NAME',
      'YOUR EMAIL',
      ${hashedPass}
    )
  `

  return {
    createUserTable,
    users,
  }
}