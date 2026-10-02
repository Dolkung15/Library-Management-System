import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";

import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingPage from "@/components/LoadingPage";
import { NewsData } from "@/types/news";

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { newsId } = params
    const res = await fetch(`http://localhost:8080/getDetail/${newsId}`)
    const { topic } = await res.json()

    return {
      title: `${topic} | Library Website`
    }
  } catch (err) {
    return {
      title: 'Error | Library Website'
    }
  }
}

export default function Page({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NewsInfo newsId={params.newsId} />
    </Suspense>
  )
}

async function NewsInfo({
  newsId,
}: {
  newsId: string
}) {
  var res
  var newsData: NewsData

  try {
    res = await fetch(`http://localhost:8080/getDetail/${newsId}`, {
      next: { revalidate: 60 },
    })
    newsData = await res.json()
  } catch (err) {
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
            <h1 className="text-bold text-6xl">
              Error
            </h1>
            <div className="flex space-x-4">
              <span className="flex">
                {JSON.stringify(err)}
              </span>
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
          items={[{ title: 'News List' }, { title: 'Details #' + newsId }]}
        />
        {/* <hr className="my-6 border-2 border-black/10" /> */}
        <div className="h-[500px] relative rounded-xl overflow-hidden mt-4">
          <Image src="/home.jpg" alt="" fill className="object-contain" />
        </div>
        <div className="my-8 space-y-4">
          <h1 className="text-bold text-6xl text-primary-500">
            {newsData.topic}
          </h1>
          <div className="flex space-x-4">
            <span className="text-primary-400 flex">
              <FontAwesomeIcon icon={faCalendar} className="w-[18px] mr-2" />{' '}
              {newsData.publish_date}
            </span>
          </div>
        </div>
        <p>{newsData.content}</p>
      </div>
    </main>
  )
}
