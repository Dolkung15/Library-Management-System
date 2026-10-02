'use client'

import { BorrowDetail } from "@/types/borrow"
import { UserAuth } from "@/types/user"
import { useCurrentUser } from "@/utils/hooks/useCurrentUser"

// const mock: BorrowDetail[] = [
//   {
//     borrowId: 'string',
//     bookId: 'string',
//     userId: 'string',
//     borrowTime: 'string',
//     returnTime: 'string',
//   },
//   {
//     borrowId: 'string',
//     bookId: 'string',
//     userId: 'string',
//     borrowTime: 'string',
//     returnTime: 'string',
//   },
//   {
//     borrowId: 'string',
//     bookId: 'string',
//     userId: 'string',
//     borrowTime: 'string',
//     returnTime: 'string',
//   },
// ]

export default function ProfileSection() {
  const user: UserAuth | null = useCurrentUser()

  return (
    <div>
      <h1 className="text-bold text-6xl mb-8">Your Profile</h1>
      <div className="flex space-x-8 items-center my-8">
        <div className="avatar">
          <div className="w-24 mask mask-squircle">
            <img src="/placeholder.jpg" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-4xl">{user?.username}</h1>
          <h2>id: {user?.userId}</h2>
        </div>
      </div>
      <div className="flex mb-5 justify-center">
        <a href="/change-password" className="bg-orange-400 flex p-2 rounded">แก้ไขรหัส</a>
      </div>

      <hr />
      {/* <div className="my-8">
        <h2 className="text-bold text-4xl mb-8">Borrowing History</h2>
        <BorrowTable />
      </div> */}
    </div>
  )
}

// function BorrowTable() {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr>
//             <th>
//               <label>
//                 <input type="checkbox" className="checkbox" />
//               </label>
//             </th>
//             <th>Name</th>
//             <th>Job</th>
//             <th>Favorite Color</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {mock.map(item => (
//             <BorrowTableRow key={item.borrowId} {...item} />
//           ))}
//         </tbody>
//         {/* foot */}
//         <tfoot>
//           <tr>
//             <th></th>
//             <th>Name</th>
//             <th>Job</th>
//             <th>Favorite Color</th>
//             <th></th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   )
// }

// function BorrowTableRow(item: BorrowDetail) {
//   return (
//     <tr>
//       <th>
//         <label>
//           <input type="checkbox" className="checkbox" />
//         </label>
//       </th>
//       <td>
//         <div className="flex items-center space-x-3">
//           <div className="avatar">
//             <div className="mask mask-squircle w-12 h-12">
//               <img src="/placeholder.jpg" alt="Avatar Tailwind CSS Component" />
//             </div>
//           </div>
//           <div>
//             <div className="font-bold">{item.borrowId}</div>
//             <div className="text-sm opacity-50">United States</div>
//           </div>
//         </div>
//       </td>
//       <td>
//         {item.bookId}
//         <br />
//         <span className="badge badge-ghost badge-sm">{item.userId}</span>
//       </td>
//       <td>
//         {item.returnTime}
//         <br />
//         <span className="badge badge-ghost badge-sm">{item.borrowTime}</span>
//       </td>
//       <th>
//         <button className="btn btn-ghost btn-xs">details</button>
//       </th>
//     </tr>
//   )
// }
