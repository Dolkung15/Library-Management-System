import { useState, useEffect } from "react";
// import { cookies } from 'next/headers'
// @ts-ignore
import Cookies from 'js-cookie'
import { UserAuth } from "@/types/user";

export const  useCurrentUser = () => {
  const [user, setUser] = useState<UserAuth | null>(null)

  useEffect(() => {
    // const currentUser = cookies().get('currentUser')
    const currentUser: string = Cookies.get('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  return user
}
