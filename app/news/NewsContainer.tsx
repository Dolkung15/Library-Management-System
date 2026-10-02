import { NewsData } from "@/types/news"
import Link from "next/link"

export default function NewsContainer({
  news
}: {
  news: NewsData[]
}) {
  return (
    <div className="container mx-auto my-8">
      <p className="text-xl mb-4">found {news.length} news</p>
      <div className="grid grid-cols-3 gap-8">
        {news.map((item: NewsData) => (
          <NewsCard key={item._id} content={item} />
        ))}
      </div>
    </div>
  )
}

function NewsCard({ content }: { content: NewsData }) {
  return (
    <Link href={`/news/${content._id}`} className="card bg-base-200 hover:opacity-90 active:opacity-80 active:scale-95 transition">
      <figure className="h-48"><img src="/home.jpg" alt="" className="object-cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{content.topic}</h2>
        <p>{content.content.length > 150 ? content.content.substring(0, 200) + '...' : content.content}</p>
        <p className="opacity-70 text-sm">{content.publish_date}</p>
      </div>
    </Link>
  )
}
