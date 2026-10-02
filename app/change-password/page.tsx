'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useCurrentUser } from '@/utils/hooks/useCurrentUser'

export default function RegisterPage() {

  const user = useCurrentUser();

  const [oldPassword, setOldPassword] = useState('')
  const [oldPasswordAgain, setOldPasswordAgain] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')

  const [oldPasswordError, setOldPasswordError] = useState('')
  const [oldPasswordAgainError, setOldPasswordAgainError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [newPasswordAgainError, setNewPasswordAgainError] = useState('')

  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')

  const handleReset = async () => {
    // ตรวจรหัส old
    const isOldPasswordValid = oldPassword.length >= 6
    // ตรวจ confirm รหัส old
    const isOldPasswordMatch = oldPassword === oldPasswordAgain

    // ตรวจรหัส old
    const isNewPasswordValid = newPassword.length >= 6
    // ตรวจ confirm รหัส old
    const isNewPasswordMatch = newPassword === newPasswordAgain

    // Set error alerts based on validation results
    if (
      !isOldPasswordValid ||
      !isOldPasswordMatch ||
      !isNewPasswordValid ||
      !isNewPasswordMatch
    ) {
      setOldPasswordError(
        isOldPasswordValid ? '' : 'Password ต้องมีตั้งแต่ 6 ตัว'
      )
      setOldPasswordAgainError(isOldPasswordMatch ? '' : 'Password ไม่ตรงกัน')
      setNewPasswordError(
        isNewPasswordValid ? '' : 'Password ต้องมีตั้งแต่ 6 ตัว'
      )
      setNewPasswordAgainError(isNewPasswordMatch ? '' : 'Password ไม่ตรงกัน')

      setFailAlert('')
      setSuccessAlert('')
      return
    }

    // ผ่านหมดทำนี่
    console.log('Data:', {
      // email หรือ id การ login นั้น
      newPassword,
    })

    try {
      // ส่ง api
      const response = await axios.put(
        'http://localhost:8005/updatePassword',
        {
          email: user?.email,
          oldPassword: oldPassword,
          newPassword: newPassword,
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

        setOldPasswordError('')
        setOldPasswordAgainError('')
        setNewPasswordError('')
        setNewPasswordAgainError('')
        return
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setSuccessAlert('')
      setFailAlert('Error')

      setOldPasswordError('')
      setOldPasswordAgainError('')
      setNewPasswordError('')
      setNewPasswordAgainError('')
      return
    }

    setOldPassword('')
    setOldPasswordAgain('')
    setNewPassword('')
    setNewPasswordAgain('')
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
              Old Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            {oldPasswordError && (
              <p className="text-red-500 text-sm">{oldPasswordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordAgain"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm Old Password
            </label>
            <input
              type="password"
              id="passwordAgain"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={oldPasswordAgain}
              onChange={e => setOldPasswordAgain(e.target.value)}
            />
            {oldPasswordAgainError && (
              <p className="text-red-500 text-sm">{oldPasswordAgainError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            {newPasswordError && (
              <p className="text-red-500 text-sm">{newPasswordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordAgain"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="passwordAgain"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={newPasswordAgain}
              onChange={e => setNewPasswordAgain(e.target.value)}
            />
            {newPasswordAgainError && (
              <p className="text-red-500 text-sm">{newPasswordAgainError}</p>
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
            <Link href="/profile">กลับหน้า Profile</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
