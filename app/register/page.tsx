'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [username, setUsername] = useState('')
  const [nationID, setNationID] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordAgainError, setPasswordAgainError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [nationIDError, setNationIDError] = useState('')
  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')

  const handleRegister = async () => {
    // ตรวจสอบ Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email) && email.length > 0

    // ตรวจรหัส
    const isPasswordValid = password.length >= 6

    // ตรวจ confirm รหัส
    const isPasswordMatch = password === passwordAgain

    // ตรวจชื่อ
    const isUsernameValid = /^[a-zA-Z]+$/.test(username) && username.length > 0

    // ตรวจรหัสบัตร
    const isNationalIDValid = /^\d{13}$/.test(nationID) && nationID.length > 0

    // Set error alerts based on validation results
    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isPasswordMatch ||
      !isUsernameValid ||
      !isNationalIDValid
    ) {
      setEmailError(isEmailValid ? '' : 'Email ไม่ถูกต้อง')
      setPasswordError(isPasswordValid ? '' : 'Password ต้องมีตั้งแต่ 6 ตัว')
      setPasswordAgainError(isPasswordMatch ? '' : 'Password ไม่ตรงกัน')
      setUsernameError(
        isUsernameValid ? '' : 'Username ต้องประกอบด้วยตัวอักษรเท่านั้น'
      )
      setNationIDError(
        isNationalIDValid ? '' : 'National ID ต้องมีทั้งหมด 13 หลัก'
      )

      setFailAlert('')
      setSuccessAlert('')
      return
    }

    // ผ่านหมดทำนี่
    console.log('Data:', {
      email,
      password,
      passwordAgain,
      username,
      nationID,
    })

    try {
      // ส่ง api
      const response = await axios.post(
        'http://localhost:5000/RegisterProcess',
        {
          email: email,
          password: password,
          username: username,
          nationID: nationID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data && response.data.message) {
        // Registration successful
        setSuccessAlert('สมัครสมาชิกสำเร็จ')
        setFailAlert('')
        // Optionally, you can reset the form fields here
      } else if (response.data && response.data.error) {
        // Registration failed
        setSuccessAlert('')
        setFailAlert(response.data.error)

        setEmailError('')
        setPasswordError('')
        setPasswordAgainError('')
        setUsernameError('')
        setNationIDError('')
        return
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setSuccessAlert('')
      setFailAlert('Error')
      return
    }

    setEmail('')
    setPassword('')
    setPasswordAgain('')
    setUsername('')
    setNationID('')
    return
  }

  return (
    <main className="flex items-center justify-center mt-10 mb-20">
      <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
        <h1 className="text-2xl font-semibold mb-3 text-center">Register</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
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
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordAgain"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordAgain"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={passwordAgain}
              onChange={e => setPasswordAgain(e.target.value)}
            />
            {passwordAgainError && (
              <p className="text-red-500 text-sm">{passwordAgainError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-red-500 text-sm">{usernameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="nationID"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              National ID
            </label>
            <input
              type="text"
              id="nationID"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={nationID}
              onChange={e => setNationID(e.target.value)}
            />
            {nationIDError && (
              <p className="text-red-500 text-sm">{nationIDError}</p>
            )}
          </div>
          <div className="flex justify-center mt-7">
            <button
              type="button"
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
              onClick={handleRegister}
            >
              Register
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
            <Link href="/login" className="mr-8">
              มีรหัสอยู่แล้ว
            </Link>
            <Link href="/forgot-password">ลืมรหัส</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
