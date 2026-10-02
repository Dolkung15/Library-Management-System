'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SearchToolbar() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  return (
    <section className="min-w-[350px] w-1/4 bg-base-100 p-4 rounded-xl space-y-4">
      <div className="flex flex-col space-y-2">
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
          onClick={() => router.replace(`/res?keyword=${keyword}`)}
        >
          Search
        </button>
        <button
          className="btn"
          onClick={() => router.replace(`/res`)}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="font-bold text-lg">Sort by</span>
        <select className="select select-sm input-bordered w-full max-w-xs">
          <option>your</option>
          <option>mom</option>
        </select>
      </div>
      <hr />
      {/* <ToolbarItem title="Group">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Books</span>
            <input type="checkbox" className="checkbox" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Article</span>
            <input type="checkbox" className="checkbox" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Images</span>
            <input type="checkbox" className="checkbox" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Video</span>
            <input type="checkbox" className="checkbox" />
          </label>
        </div>
      </ToolbarItem> */}
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
