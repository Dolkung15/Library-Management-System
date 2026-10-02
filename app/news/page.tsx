import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { NewsData } from "@/types/news";
import NewsContainer from "./NewsContainer";

export const metadata: Metadata = {
  title: 'News | Library Website',
}

export default async function Page() {
  var data
  var news: NewsData[]

  try {
    data = await fetch('http://localhost:8080/Allnews', {
      cache: 'no-store'
    })
    news = await data.json()
  } catch (err) {
    return (
      <main>
        <div className="w-full h-[350px] relative">
          <Image src="/news.jpg" alt="" fill className="object-cover" />
        </div>

        <div className="container mx-auto my-8 bg-base-200 p-8 rounded-2xl">
          <h1 className="text-bold text-6xl mb-8">Error</h1>
          <p>{JSON.stringify(err)}</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className='w-full h-[350px] relative'>
        <Image src='/news.jpg' alt='' fill  className='object-cover'/>
      </div>

      <div className="container mx-auto my-8">
        <h1 className="text-bold text-6xl text-primary-500">News</h1>
        {/* <div className='flex flex-row space-x-2 text-2xl'>
          <input type="text" placeholder="search news..." className="input w-full max-w-xs" />
          <button className="btn bg-primary-500 hover:bg-primary-300 text-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-[24px]" /> <span>Search</span>
          </button>
        </div> */}
      </div>

      <NewsContainer news={news} />
    </main>
  )
}
