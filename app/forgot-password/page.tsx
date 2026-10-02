"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState('');

    const [successAlert, setSuccessAlert] = useState('');
    const [failAlert, setFailAlert] = useState('');

    const handleForgot = async () => {

        // ตรวจสอบ Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email) && email.length > 0;


        // Set error alerts based on validation results
        if (!isEmailValid) {
            setEmailError(isEmailValid ? '' : 'Email ไม่ถูกต้อง');
            setFailAlert('');
            setSuccessAlert('');
            return;
        }

        // ผ่านหมดทำนี่
        console.log('Data:', {
            email,
        });

        try {
            // ส่ง api
            const response = await axios.post('http://localhost:5000/ForgotSendProcess', {
                email: email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.message) {
                // Registration successful
                setSuccessAlert('ส่งอีเมลการรีเซ็ตแล้ว');
                setFailAlert('');
                setEmailError('');
                // Optionally, you can reset the form fields here
            } else if (response.data && response.data.error) {
                // Registration failed
                setSuccessAlert('');
                setFailAlert(response.data.error);
                setEmailError('');
                return;
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setSuccessAlert('');
            setFailAlert('โปรดรอซักครู่และลองใหม่ในภายหลัง');
            setEmailError('');
            return;
        }

        setEmail('');
        return;
    };

    return (
      <main className="flex items-center justify-center mt-10 mb-20">
        <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
          <h1 className="text-2xl font-semibold mb-3 text-center">
            Forgot Password
          </h1>
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
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="flex justify-center mt-7">
              <button
                type="button"
                className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
                onClick={handleForgot}
              >
                Send
              </button>
            </div>
            <div className=" flex justify-center mt-7 mb-5">
              {successAlert && (
                <p className="text-green-500 text-lg font-bold">
                  {successAlert}
                </p>
              )}
              {failAlert && (
                <p className="text-red-500 text-lg font-bold">{failAlert}</p>
              )}
            </div>
            <div className="flex justify-center">
              <Link href="/register" className="mr-8">
                ไม่มีรหัส
              </Link>
              <Link href="/login">มีรหัสอยู่แล้ว</Link>
            </div>
          </form>
        </div>
      </main>
    )
}
