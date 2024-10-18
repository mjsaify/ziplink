import UrlInput from "../components/UrlInput"
import UrlTable from "../components/UrlTable"


const Landing = () => {
    return (
        <div className="container mx-auto">
            <div className="my-20 text-center">
                <h1 className="gradient-heading text-5xl font-bold lg:text-6xl">Shorten Your Loooong URLs :)</h1>
                <div className="flex justify-center flex-col">
                    <p className="text-lite text-lg mt-12 lg:text-lg lg:px-56">ZipLink is an efficient, intuitive URL shortening service designed to simplify link management, enhancing your online experience..</p>
                    <UrlInput />
                </div>
            </div>
            <div className="overflow-x-auto">
                <UrlTable />
            </div>
        </div>
    )
}

export default Landing