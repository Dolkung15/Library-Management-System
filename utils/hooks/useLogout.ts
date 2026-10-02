import { cookies } from 'next/headers'
// @ts-ignore
import Cookies from 'js-cookie'

export const useLogout = () => {
  const logout = () => {
    // cookies().delete('currentUser')
    Cookies.remove('currentUser')
  }

  return { logout }
}
