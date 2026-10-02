"use client";
import { useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';

export default function RegisterPage() {
    const [userKey, setUserKey] = useState('');
    const [bookID, setBookID] = useState('');

    const [userKeyError, setUserKeyError] = useState('');
    const [bookIDError, setBookIDError] = useState('');

    const [successAlert, setSuccessAlert] = useState('');
    const [failAlert, setFailAlert] = useState('');

    const handleLogin = async () => {

        // ตรวจสอบ userKey
        const isuserKeyValid = userKey.trim().length > 0;

        // ตรวจ Book ID
        const isbookIDValid = bookID.trim().length > 0;

        // Set error alerts based on validation results
        if (!isuserKeyValid || !isbookIDValid) {
            setUserKeyError(isuserKeyValid ? '' : 'โปรดกรอกรหัสบัตรประชาชนผู้ใช้');
            setBookIDError(isbookIDValid ? '' : 'โปรดกรอกรหัสหนังสือ');
            return
        }

        // ผ่านหมดทำนี่
        console.log('Data:', {
            userKey,
            bookID,
        });

        try {
            // ส่ง api
            const response = await axios.post('', {
                userKey: userKey,
                bookID: bookID,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.message) {
                // Registration successful
                setSuccessAlert('คืนหนังสือสำเร็จ');
                setFailAlert('');
                // Optionally, you can reset the form fields here
            } else if (response.data && response.data.error) {
                // Registration failed
                setSuccessAlert('');
                setFailAlert(response.data.error);

                setUserKeyError('');
                setBookIDError('');
                return;
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setSuccessAlert('');
            setFailAlert('Error');
            return;
        }

        setUserKey('');
        setBookID('');

        setUserKeyError('');
        setBookIDError('');
        return;
    };

    return (
      <main className="flex items-center justify-center mt-10 mb-20">
        <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
          <BackButton />
          <br />
          <hr />
          <br />
          <h1 className="text-2xl font-semibold mb-3 text-center">
            Return Book
          </h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="userKey"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                National ID
              </label>
              <input
                type="userKey"
                id="userKey"
                className="bg-base-100 w-full px-3 py-2 border rounded-md"
                value={userKey}
                onChange={e => setUserKey(e.target.value)}
              />
              {userKeyError && (
                <p className="text-red-500 text-sm">{userKeyError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="bookID"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                BookID
              </label>
              <input
                type="bookID"
                id="bookID"
                className="bg-base-100 w-full px-3 py-2 border rounded-md"
                value={bookID}
                onChange={e => setBookID(e.target.value)}
              />
              {bookIDError && (
                <p className="text-red-500 text-sm">{bookIDError}</p>
              )}
            </div>
            <div className="flex justify-center mt-7">
              <button
                type="button"
                className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
                onClick={handleLogin}
              >
                Return
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
          </form>
        </div>
      </main>
    )
}
