import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { User, fetchUser, comparePasswords } from "./user"

const secretKey = process.env.JWT_SECRET || ""
const key = new TextEncoder().encode(secretKey)

// Use to encrypt a token during either reauthentication in the middleware or signing in
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key)
}

// Use to decrypt a jwt token & read its data in the middleware or logout
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })

  return payload
}

// Use to check if a session exists for any protected functionality or page access
export async function getSession() {
  const session = cookies().get("session")?.value

  if (!session)
    return null

  return await decrypt(session)
}

// Use to create a session on sucessfull authentication
export async function createSession(user: User) {
  // Create and encrept the session data
  const expires = new Date(Date.now() + 10 * 1000)
  const session = await encrypt({ user, expires })

  // Save it in an http only cookie
  cookies().set("session", session, { expires, httpOnly: true })
}

export async function signIn(email: string) {
  const user = await fetchUser(email)
  const isSame = await comparePasswords(email, user?.hashedpass)

  return isSame ? user : undefined
}