import { Suspense } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCalendar, faBook } from '@fortawesome/free-solid-svg-icons'

import BackButton from '@/components/BackButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import BookBorrowingModal from './BookBorrowingModal'
import LoadingPage from '@/components/LoadingPage'
import { Book } from '@/types/book'

export default function Page({
  params,
  searchParams,
}: {
  params: { bookId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BookContent {...params} />
    </Suspense>
  )
}

async function BookContent(props: { bookId: string }) {
  var res
  var bookData: Book

  try {
    res = await fetch(`http://localhost:8081/bookById/${props.bookId}`, {
      next: { revalidate: 60 },
    })
    bookData = await res.json()
  } catch (err) {
    console.log(err)
    return (
      <main>
        <div className="container mx-auto my-8">
          <BackButton
            children={
              <span className="font-bold text-2xl cursor-pointer flex link link-hover">
                <FontAwesomeIcon icon={faBackspace} className="w-[26px] mr-2" />
                Go Back
              </span>
            }
          />
        </div>
        <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
          <div className="my-8 space-y-4">
            <h1 className="text-bold text-6xl">Error</h1>
            <div className="flex space-x-4">
              <span className="flex">{JSON.stringify(err)}</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="container mx-auto my-8">
        <BackButton
          children={
            <span className="font-bold text-2xl cursor-pointer flex link link-hover">
              <FontAwesomeIcon icon={faBackspace} className="w-[26px] mr-2" />
              Go Back
            </span>
          }
        />
      </div>
      <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
        <Breadcrumbs
          items={[{ title: 'Resources List' }, { title: 'Details #' + props.bookId }]}
        />
        {/* <hr className="my-6 border-2 border-black/10" /> */}
        <div className="flex space-x-8">
          <div className="h-64 w-1/4 relative rounded-xl overflow-hidden mt-4">
            <Image src="/home.jpg" alt="" fill className="object-contain" />
          </div>
          <div className="w-3/4 my-8 space-y-4">
            <h1 className="text-bold text-6xl text-primary-500">{bookData.title}</h1>
            <div className="flex space-x-4">
              <span className="text-primary-400 flex">
                <FontAwesomeIcon icon={faBook} className="w-[18px] mr-2" /> {bookData.category}
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8 border-2 border-black/10" />
        <div className="overflow-x-auto">
          <br />
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Info</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Author</td>
                <td>{bookData.author}</td>
              </tr>
              <tr>
                <td className="font-bold">Details</td>
                <td>{bookData.details}</td>
              </tr>
              <tr>
                <td className="font-bold">Language</td>
                <td>{bookData.language}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
        <h2 className="font-bold text-2xl mb-4">Book Borrowing</h2>
        <div>
          <div className="flex space-x-2 items-center">
            <h3 className="badge badge-info text-white">Status</h3>{' '}
            <p>{bookData.status}</p>
          </div>
          <BookBorrowingModal />
        </div>
      </div>
    </main>
  )
}
