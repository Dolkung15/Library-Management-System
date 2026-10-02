import LoadingPage from "@/components/LoadingPage"
import { User } from "@/types/user"
import { Suspense } from "react"
import { UserCard } from "./UserCard"
import BackButton from "@/components/BackButton"
import Image from "next/image"

export default function Page() {
  return (
    <main>
      <div className="w-full h-[350px] relative">
        <Image src="/admin.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="container mx-auto my-8 space-y-4">
        <BackButton />
        <h1 className="text-bold text-6xl text-primary-500">User Management</h1>
      </div>
      <Suspense fallback={<LoadingPage />}>
        <UserList />
      </Suspense>
    </main>
  )
}

async function UserList() {
  var res
  var users: User[]

  try {
    res = await fetch('http://localhost:8084/users', {
      cache: 'no-store'
    })
    users = await res.json()
  } catch (err) {
    console.log(err)
    return (
      <p>Error</p>
    )
  }

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map(user => <UserCard key={user._id} {...user} />)}
    </div>
  )
}
