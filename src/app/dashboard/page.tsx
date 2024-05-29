import { redirect } from "next/navigation"
import { capitalizeEach } from "@/lib/utils"
import { getSession } from "@/lib/db/helpers/auth"
import SignOutButton from "@/components/signout-button"

export default async function Page() {
  const session = await getSession()

  if (session === null)
    redirect('/')

  const cleansedName = capitalizeEach(session.data.name) as string

  return (
    <div>
      <div className="flex flex-row gap-x-3">
        <h1 className="text-[60px]">Admin Dashboard</h1>
        <div className="grid pb-[50px]">
          <p className="mt-auto">Hello {cleansedName}</p>
        </div>
        <SignOutButton />
      </div>
    </div>
  )
}