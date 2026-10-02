'use client'
import { useState } from 'react'
import axios from 'axios'
import BackButton from '@/components/BackButton'

export default function RegisterPage() {
  const [userId, setUserKey] = useState('')
  const [bookId, setbookId] = useState('')

  const [userKeyError, setUserKeyError] = useState('')
  const [bookIdError, setbookIdError] = useState('')

  const [successAlert, setSuccessAlert] = useState('')
  const [failAlert, setFailAlert] = useState('')

  const handleLogin = async () => {
    // ตรวจสอบ userKey
    const isuserKeyValid = userId.trim().length > 0

    // ตรวจ Book ID
    const isbookIdValid = bookId.trim().length > 0

    // Set error alerts based on validation results
    if (!isuserKeyValid || !isbookIdValid) {
      setUserKeyError(isuserKeyValid ? '' : 'โปรดกรอกรหัสบัตรประชาชนผู้ใช้')
      setbookIdError(isbookIdValid ? '' : 'โปรดกรอกรหัสหนังสือ')
      return
    }

    // ผ่านหมดทำนี่
    console.log('Data:', {
      userId,
      bookId,
    })

    try {
      // ส่ง api
      const response = await axios.put(
        'http://localhost:6009/borrow',
        {
          userId,
          bookId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data && response.data.message) {
        // Registration successful
        alert('Borrow succesful.')
        setSuccessAlert('ยืมหนังสือสำเร็จ')
        setFailAlert('')
        // Optionally, you can reset the form fields here
      } else if (response.data && response.data.error) {
        // Registration failed
        setSuccessAlert('')
        setFailAlert(response.data.error)

        setUserKeyError('')
        setbookIdError('')
        return
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setSuccessAlert('')
      setFailAlert('Error')
      return
    }

    setUserKey('')
    setbookId('')
    return
  }

  return (
    <main className="flex items-center justify-center mt-10 mb-20">
      <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
        <BackButton />
        <br />
        <hr />
        <br />
        <h1 className="text-2xl font-semibold mb-3 text-center">Borrow Book</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="userKey"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              User ID
            </label>
            <input
              type="userKey"
              id="userKey"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={userId}
              onChange={e => setUserKey(e.target.value)}
            />
            {userKeyError && (
              <p className="text-red-500 text-sm">{userKeyError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="bookId"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Book ID
            </label>
            <input
              type="bookId"
              id="bookId"
              className="bg-base-100 w-full px-3 py-2 border rounded-md"
              value={bookId}
              onChange={e => setbookId(e.target.value)}
            />
            {bookIdError && (
              <p className="text-red-500 text-sm">{bookIdError}</p>
            )}
          </div>
          <div className="flex justify-center mt-7">
            <button
              type="button"
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
              onClick={handleLogin}
            >
              Borrow
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
        </form>
      </div>
    </main>
  )
}
