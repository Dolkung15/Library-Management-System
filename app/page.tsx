import Image from 'next/image'
import Searchbar from './Searchbar'

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen bg-gradient-to-b from-base-100 to-base-100/20 relative">
        <Image src="/home.jpg" alt="" fill className="object-cover -z-50" />
        <div className="absolute top-16 w-full">
          <Searchbar />
        </div>
      </div>
    </main>
  )
}
