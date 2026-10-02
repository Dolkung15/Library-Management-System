'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { findClosestFutureDate } from "@/utils/date"
import { themeChange } from "theme-change"
import { useScrollDirection } from "@/utils/hooks/useScrollDirection"
import { useCurrentUser } from "@/utils/hooks/useCurrentUser"
import { useLogout } from "@/utils/hooks/useLogout"
// @ts-ignore
import Cookies from 'js-cookie'

export default function Navbar() {
  const items = [
    { href: '/', title: 'Home' },
    { href: '/res', title: 'Resources' },
    { href: '/news', title: 'News' },
  ]

  const path = usePathname()
  const [date, setDate] = useState('')
  useEffect(() => {
    const timer = setInterval(() => setDate(dayjs().format('MMMM DD, YYYY — HH:mm:ss')), 1000)
    return () => clearInterval(timer)
  }, [])

  const [holidays, setHolidays] = useState([])
  useEffect(() => {
    fetch('/api/holidays', {
      next: { revalidate: 86400 }
    }).then(async res => setHolidays(await res.json()))
  }, [])

  const [nextHoliday, setNextHoliday] = useState<{ [key: string]: any; date: string } | null>()
  useEffect(() => {
    setNextHoliday(findClosestFutureDate(dayjs().format('YYYY-MM-DD'), holidays))
  }, [holidays])

  const [darkTheme, setDarkTheme] = useState(false)
  useEffect(() => {
    themeChange(false)
    if (localStorage.getItem('theme') == 'light') setDarkTheme(false)
    else if (localStorage.getItem('theme') == 'night') setDarkTheme(true)
  }, [])

  // const [extended, setExtended] = useState(false)
  // useEffect(() => console.log(extended), [extended])
  const scrollDirection = useScrollDirection()
  const [user, setUser] = useState(useCurrentUser())
  useEffect(() => {
    const currentUser = Cookies.get('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [path])

  const { logout } = useLogout()

  return (
    <nav
      className={`${
        scrollDirection == 'down' ? '-translate-y-[100%]' : 'translate-y-0'
      } transition z-50 sticky top-0 bg-base-100 group bg-transparent`}
    >
      <nav className="bg-gray-700 text-white">
        <div className="container mx-auto py-1.5 flex flex-row justify-between">
          <div className="flex flex-row space-x-4">
            <p>🕑 {date}</p>
            <p>
              📅 {nextHoliday?.name} ({nextHoliday?.date})
            </p>
          </div>
          <div className="flex space-x-4">
            {user ? (
              <>
                <p className="font-bold">
                  {user.username} ({user.email})
                </p>
                <Link href="/profile">📚 Profile</Link>
                {user?.role == 'admin' ? (
                  <Link href="/admin">⚙️ Admin</Link>
                ) : null}
                <a href="" onClick={logout}>
                  📤 Logout
                </a>
              </>
            ) : (
              <Link href="/login">📥 Login</Link>
            )}
            {darkTheme ? (
              <button
                data-set-theme="light"
                onClick={() => setDarkTheme(false)}
              >
                🌙
              </button>
            ) : (
              <button data-set-theme="night" onClick={() => setDarkTheme(true)}>
                ☀️
              </button>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-base-100">
        <div className="container mx-auto pt-2 text-2xl flex flex-row space-x-6 items-center">
          {items.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              className={`py-2 transition hover:text-primary-500 border-primary-500 border-b-8 border-opacity-0 hover:border-opacity-100 ${
                (href == '/' && path == '/') ||
                (href != '/' && path.startsWith(href))
                  ? 'text-primary-500 border-opacity-50 font-bold'
                  : ''
              }`}
            >
              {title}
            </Link>
          ))}
        </div>
      </nav>
      {/* <nav
        className={`${
          extended ? 'scale-y-100 shadow-xl' : 'scale-y-0 shadow-none'
        } origin-top transition ease-out bg-base-100 w-full h-[400px] absolute top-[100px]`}
      >
        <footer className="footer p-10 bg-base-100 text-base-content">
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </nav> */}
    </nav>
  )
}