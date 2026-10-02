'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useLogin } from '@/utils/hooks/useLogin'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/utils/hooks/useCurrentUser'

export default function LoginPage(props: any) {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')

  const handleLogin = async () => {
    // ตรวจสอบ Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email) && email.length > 0

    // ตรวจรหัส
    const isPasswordValid = password.length >= 6

    const { login } = useLogin()

    // Set error alerts based on validation results
    if (!isEmailValid || !isPasswordValid) {
      setEmailError(isEmailValid ? '' : 'Email ไม่ถูกต้อง')
      setPasswordError(isPasswordValid ? '' : 'Password ต้องมีตั้งแต่ 6 ตัว')
      return
    }

    // ผ่านหมดทำนี่
    console.log('Data:', {
      email,
      password,
    })

    login(email, password)
      .then(res => router.refresh())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-md bg-base-100"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-600 text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded-md bg-base-100"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>
      <div className="flex justify-center mt-7">
        <button
          type="button"
          className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className=" flex justify-center mt-7 mb-5">
        {successAlert && (
          <p className="text-green-500 text-lg font-bold">{successAlert}</p>
        )}
        {failAlert && (
          <p className="text-red-500 text-lg font-bold">{failAlert}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Link href="/register" className="mr-8">
          ไม่มีรหัส
        </Link>
        <Link href="/forgot-password">ลืมรหัส</Link>
      </div>
    </div>
  )
}
