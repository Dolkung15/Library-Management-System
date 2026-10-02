import { Metadata } from 'next'
import LoginPage from './LoginPage'

export const metadata: Metadata = {
  title: 'Login | Library Website',
}

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center mt-10 mb-20">
      <div className="max-w-md w-full p-8 bg-white-300 rounded-md shadow-lg border-2 border-slate-100">
        <h1 className="text-2xl font-semibold mb-3 text-center">Login</h1>
        <LoginPage />
      </div>
    </main>
  )
}
