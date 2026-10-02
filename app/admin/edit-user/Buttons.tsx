'use client'

import { useRouter } from "next/navigation"
import axios from "axios"

export const SetAdminButton = ({ userId }: { userId: string }) => {
  const router = useRouter()

  return (
    <button
      className="btn btn-info"
      onClick={() => {
        axios
          .put(`http://localhost:8084/addAdmin/${userId}`)
          .then(res => router.refresh())
          .catch(err => console.log(err))
      }}
    >
      Set Admin
    </button>
  )
}

export const SetUserButton = ({ userId }: { userId: string }) => {
  const router = useRouter()

  return (
    <button
      className="btn btn-info"
      onClick={() => {
        axios
          .put(`http://localhost:8084/delAdmin/${userId}`)
          .then(res => router.refresh())
          .catch(err => console.log(err))
      }}
    >
      Set User
    </button>
  )
}

export const DeleteButton = ({ userId }: { userId: string }) => {
  const router = useRouter()

  return (
    <button
      className="btn btn-error"
      onClick={() => {
        if (confirm('Do you want to delete user?')) {
          axios
            .delete(`http://localhost:8084/deleteUser/${userId}`)
            .then(res => router.refresh())
            .catch(err => console.log(err))
        }
      }}
    >
      Delete
    </button>
  )
}