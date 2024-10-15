import Navbar from "../components/Navbar"
import UrlInput from "../components/UrlInput"

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="px-6">
        <div className="container">
          <div className="my-12 text-center">
            <h1 className="gradient-heading text-5xl font-bold">Shorten Your Loooong URLs :)</h1>
            <p className="text-lite text-lg mt-12">ZipLink is an efficient, intuitive URL shortening service designed to simplify link management, enhancing your online experience..</p>
            <UrlInput />
          </div>
        </div>
      </main>
    </>
  )
}

export default RootLayout