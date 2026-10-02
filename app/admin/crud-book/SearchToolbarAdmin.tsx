'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'

export default function SearchToolbarAdmin() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  return (
    <section className="min-w-[350px] w-1/4 bg-base-100 p-4 rounded-xl space-y-4">
      <div className="flex flex-col space-y-2">
        <BackButton />
        <span className="font-bold text-lg">Keyword</span>
        <input
          type="text"
          placeholder="Type here"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
          className="input input-bordered input-sm w-full"
        />
        <button
          className="btn bg-primary-500 hover:bg-primary-400 text-white"
          onClick={() => router.replace(`/admin/crud-book?keyword=${keyword}`)}
        >
          Search
        </button>
        <button
          className="btn"
          onClick={() => router.replace(`/admin/crud-book`)}
        >
          Reset
        </button>
        <hr className='margin' />
        <Link className="btn btn-info" href="/admin/crud-book/add-book">
          Add New
        </Link>
      </div>
    </section>
  )
}

function ToolbarItem({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="collapse collapse-plus bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  )
}
