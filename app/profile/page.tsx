"use client"
// import { Metadata } from "next"
import Image from "next/image"

import ProfileSection from "./ProfileSection"
import { BorrowDetail } from "@/types/borrow"

// export const metadata: Metadata = {
//   title: 'Profile | Library Website'
// }

export default function Page() {
  return (
    <main>
      <div className="w-full h-[350px] relative">
        <Image src="/profile.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="container mx-auto my-8 p-8 bg-base-200 rounded-2xl">
        <ProfileSection />
      </div>
    </main>
  )
}
