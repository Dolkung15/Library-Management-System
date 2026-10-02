'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Searchbar() {
  const router = useRouter()
  const [text, setText] = useState('')

  const handle = () => {
    if (text) router.push(`/res?keyword=${text}`)
  }

  return (
    <div className="container mx-auto w-full space-y-8">
      <h1 className="text-6xl fomt-bold">Welcome to the Library.</h1>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="search for resources..."
          className="input input-bordered input-lg w-full text-2xl max-w-[50%] bg-transparent backdrop-blur-lg"
        />
        <button
          onClick={handle}
          disabled={!text}
          className="btn btn-lg bg-primary-500 hover:bg-primary-400 text-white"
        >
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </div>
    </div>
  )
}
