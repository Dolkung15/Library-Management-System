'use client'

import { User } from "@/types/user"
import { DeleteButton, SetAdminButton, SetUserButton } from './Buttons'
import { useCurrentUser } from "@/utils/hooks/useCurrentUser"

export function UserCard(props: User) {
  const user = useCurrentUser()

  return (
    <div className="bg-base-200 rounded-xl p-8 flex">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold">{props.username}</h1>
        <div className="space-x-1">
          {props.role == 'admin' ? <AdminBadge /> : <UserBadge />}
          {user ? props._id == user.userId ? <YouBadge /> : null : null}
        </div>
        <p className="text-sm">id: {props._id}</p>
        <p>email: {props.email}</p>
      </div>
      {user ? (
        props._id != user.userId ? (
          <div className="w-1/3 flex flex-col justify-center items-end space-y-2">
            {props.role == 'admin' ? (
              <SetUserButton userId={props._id} />
            ) : (
              <SetAdminButton userId={props._id} />
            )}
            <DeleteButton userId={props._id} />
          </div>
        ) : null
      ) : null}
    </div>
  )
}

const AdminBadge = () => <div className="badge badge-warning">Admin</div>
const UserBadge = () => <div className="badge badge-success">User</div>
const YouBadge = () => <div className="badge bg-primary-500 text-white">You</div>
