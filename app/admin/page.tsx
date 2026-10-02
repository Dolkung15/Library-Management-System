import Link from "next/link"
import Image from "next/image"

export default function Page() { 
  return (
    <main>
      <div className="w-full h-[350px] relative">
        <Image src="/admin.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
        <h1 className="text-bold text-6xl">Admin</h1>
      </div>

      <div className="container mx-auto my-8 rounded-2xl space-y-4">
        <Link href='/admin/borrow-book' className="btn btn-block">borrow book</Link>
        <Link href='/admin/return-book' className="btn btn-block">return book</Link>
        <Link href='/admin/crud-book' className="btn btn-block">crud book</Link>
        <Link href='/admin/edit-user' className="btn btn-block">edit user</Link>
      </div>
    </main>
  )
}

