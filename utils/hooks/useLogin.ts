import { AuthService } from "../authService";
// import { cookies } from 'next/headers'
// @ts-ignore
import Cookies from 'js-cookie'
import { useCurrentUser } from "./useCurrentUser";
import { UserAuth } from "@/types/user";

const authService = new AuthService('http://localhost:5000')

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    const user: UserAuth = await authService.login(email, password)
    if (user) {
      // cookies().set('currentUser', JSON.stringify(user))
      Cookies.set('currentUser', JSON.stringify(user))
    }
    return user
  }

  return { login }
}
