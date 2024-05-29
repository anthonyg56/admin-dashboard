"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleClick(e: any) {
    e.preventDefault()

    try {
      setLoading(true)
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        }
      })
        .then(res => {
          router.refresh()
        })
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} aria-disabled={loading === true}>
      Logout
    </button>
  )
}