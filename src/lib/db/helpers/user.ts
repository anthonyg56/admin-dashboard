import { sql } from "@vercel/postgres"
import bcrypt from "bcrypt"
import { seedUser } from "../seeds"

export type User = {
  id: number,
  name: string,
  email: string,
  hashedpass: string,
  createdOn: string,
}

// Attempts to fetch a user if the table exist, if it doesnt seed the db and recursively try again
export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const query = await sql<User>`SELECT * FROM users WHERE email = ${email};`
    const { rows, rowCount } = query

    // Return undefined if theres more than one user or if somehow there is an index with undefined
    if (rowCount !== 1 || rows[0] === undefined)
      return undefined
    else
      return rows[0]
  } catch (error: any) {
    if (error.message.includes('relation "users" does not exist')) {
      await seedUser()
      return fetchUser(email)
    } else {
      throw new Error(error.message)
    }
  }
}

/**
 * Hashes the password for a user upon creation
 * @param unhashedPass - Your .env user password
 * @returns 
 */
export async function hashPassword(unhashedPass: string) {
  return bcrypt.hash(unhashedPass, 10).then(function (hash: string) {
    return hash
  })
}

/**
 * Compares a validated password to the hashed version saved in postgres
 * @param unhashedPass - Unhashed password
 * @param hashPass - Hashed password in the DB
 * @returns 
 */
export async function comparePasswords(unhashedPass: string, hashPass?: string): Promise<boolean> {
  if (hashPass === undefined)
    return false

  const isSame = bcrypt
    .compare(unhashedPass, hashPass)
    .then(function (results: boolean) {
      return results
    })

  return isSame
}