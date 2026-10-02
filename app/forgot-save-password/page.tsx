'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function RegisterPage() {
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [keyReset, setKeyReset] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [passwordAgainError, setPasswordAgainError] = useState('')
  const [keyResetError, setKeyResetError] = useState('')

  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')

  const handleReset = async () => {
    // ตรวจรหัส
    const isPasswordValid = password.length >= 6

    // ตรวจ confirm รหัส
    const isPasswordMatch = password === passwordAgain

    // ตรวจ Reset Key
    const isKeyResetValid = keyReset.trim() !== ''

    // Set error alerts based on validation results
    if (!isPasswordValid || !isPasswordMatch || !isKeyResetValid) {
      setPasswordError(isPasswordValid ? '' : 'Password ต้องมีตั้งแต่ 6 ตัว')
      setPasswordAgainError(isPasswordMatch ? '' : 'Password ไม่ตรงกัน')
      setKeyResetError(isKeyResetValid ? '' : 'กรุณากรอก Key Change Password')

      setFailAlert('')
      setSuccessAlert('')
      return
    }

    // ผ่านหมดทำนี่
    console.log('Data:', {
      password,
      passwordAgain,
      keyReset,
    })

    try {
      // ส่ง api
      const response = await axios.put(
        'http://localhost:5000/ForgotSaveProcess',
        {
          password: password,
          token: keyReset,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data && response.data.message) {
        // Registration successful
        setSuccessAlert(response.data.message)
        setFailAlert('')
        // Optionally, you can reset the form fields here
      } else if (response.data && response.data.error) {
        // Registration failed
        setSuccessAlert('')
        setFailAlert(response.data.error)

        setPasswordError('')
        setPasswordAgainError('')
        setKeyResetError('')
        return
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setSuccessAlert('')
      setFailAlert('Error')
      return
    }

    setPassword('')
    setPasswordAgain('')
    setKeyReset('')
    return
  }

  return (
    <main className="flex items-center justify-center mt-10 mb-20">
      <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
        <h1 className="text-2xl font-semibold mb-3 text-center">
          Change Password
        </h1>
        <form>
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
              htmlFor="keyReset"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Key Change Password
            </label>
            <input
              type="text"
              id="keyReset"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={keyReset}
              onChange={e => setKeyReset(e.target.value)}
            />
            {keyResetError && (
              <p className="text-red-500 text-sm">{keyResetError}</p>
            )}
          </div>
          <div className="flex justify-center mt-7">
            <button
              type="button"
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
              onClick={handleReset}
            >
              Change Password
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
            <Link href="/login">หน้า Login</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
