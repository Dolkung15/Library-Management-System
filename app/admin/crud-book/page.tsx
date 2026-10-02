import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import SearchToolbarAdmin from './SearchToolbarAdmin'
import LoadingPage from '@/components/LoadingPage'
import { Book } from '@/types/book'
import BackButton from '@/components/BackButton'

export const metadata: Metadata = {
  title: 'Resources | Library Website',
}

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { keyword: string | undefined }
}) {
  return (
    <main>
      <div className="w-full h-[350px] relative">
        <Image src="/admin.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="flex p-8">
        <SearchToolbarAdmin />
        <Suspense fallback={<LoadingPage />}>
          <ResultSection keyword={searchParams.keyword || ''} />
        </Suspense>
      </div>
    </main>
  )
}

async function ResultSection({ keyword }: { keyword?: string }) {
  var res
  var bookList: Book[]

  try {
    if (keyword)
      res = await fetch(`http://localhost:8081/booksSearch/${keyword}`)
    else res = await fetch(`http://localhost:8081/books`)
    bookList = await res.json()
  } catch (err) {
    console.log(err)
    return (
      <main>
        <div className="w-full h-[350px] relative">
          <Image src="/Resources.jpg" alt="" fill className="object-cover" />
        </div>

        <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
          <h1 className="text-bold text-6xl mb-8">Error</h1>
          <p>{JSON.stringify(err)}</p>
        </div>
      </main>
    )
  }

  return (
    <section className="w-3/4 px-8">
      <div className="mb-8">
        <h1 className="text-bold text-6xl text-primary-500">Resources</h1>
        <p>showing {bookList.length} items</p>
        <div className="py-8 space-y-8">
          {bookList.map(item => (
            <ResultItem key={item._id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ResultItem(props: Book) {
  return (
    <Link
      href={`/res/${props._id}`}
      className="card card-side bg-base-200 hover:opacity-90 active:opacity-80 active:scale-95 transition"
    >
      <div className="card-body flex-row">
        <div className="bg-base-300 rounded-lg relative w-1/4 h-64 overflow-hidden">
          <Image src="/home.jpg" fill alt="" className="object-cover" />
        </div>
        <div className="p-4 w-3/4">
          <h2 className="card-title text-4xl">{props.title}</h2>
          <p>{props.abstract}</p>
          <br />
          <div className="grid grid-cols-2 w-full">
            <div className="space-y-2">
              <div className="flex flex-col">
                <div className="badge badge-info text-white">Author</div>
                <span>{props.author}</span>
              </div>
              <div className="flex flex-col">
                <div className="badge badge-info text-white">Status</div>
                <span>{props.status}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <div className="badge badge-info text-white">Details</div>
                <span>{props.details}</span>
              </div>
              <div className="flex flex-col">
                <div className="badge badge-info text-white">Language</div>
                <span>{props.language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
