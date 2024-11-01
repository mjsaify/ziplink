import { Link } from "react-router-dom"
import About from "../components/About"
import { Button } from "../components/ui/button"
import Testimonials from "../components/Testimonials"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TiArrowUnsorted } from "react-icons/ti"
import qrcode from '../../public/img/qrcode.webp'


const Landing = () => {
    const dummyData = [
        {
            _id: "1",
            shortUrl: "https://ziplink/abc123",
            originalUrl: "https://www.example.com/this-is-the-original-link-that-is-really-long",
            qrCode: {
                qrCodeImage: qrcode
            },
            clicks: 125,
            urlStatus: <span className="text-active-link">Active</span>,
            createdAt: "2024-01-01T00:00:00Z"
        },
        {
            _id: "2",
            shortUrl: "https://ziplink/def456",
            originalUrl: "https://www.sample.com/another-very-long-url-to-be-shortened",
            qrCode: {
                qrCodeImage: qrcode
            },
            clicks: 89,
            urlStatus: <span className="text-inactive-link">Inactive</span>,
            createdAt: "2024-02-15T00:00:00Z"
        },
        {
            _id: "3",
            shortUrl: "https://ziplink/ghi789",
            originalUrl: "https://www.anotherexample.com/yet-another-long-url",
            qrCode: {
                qrCodeImage: qrcode
            },
            clicks: 200,
            urlStatus: <span className="text-active-link">Acitve</span>,
            createdAt: "2024-03-05T00:00:00Z"
        },
        {
            _id: "4",
            shortUrl: "https://ziplink/fas489",
            originalUrl: "https://www.anotherexample.com/yet-another-long-url",
            qrCode: {
                qrCodeImage: qrcode
            },
            clicks: 350,
            urlStatus: <span className="text-expired-link">Expired</span>,
            createdAt: "2024-05-05T00:00:00Z"
        },
    ];
    return (
        <div className="min-h-screen">
            <div className="px-4 py-12">
                <h1 className="gradient-heading text-5xl font-bold text-center lg:text-6xl">Shorten Your Loooong URLs :)</h1>
                <div className="flex justify-center flex-col">
                    <p className="text-lite text-lg mt-12 text-center lg:text-lg lg:px-56">ZipLink is an efficient, intuitive URL shortening service designed to simplify link management, enhancing your online experience..</p>
                    {/* <UrlInput /> */}
                    <div className="text-center">
                        <Link to="/login">
                            <Button className="bg-brand-primary-blue my-12 w-1/4">Get Started Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <Table className="w-full mx-auto mb-24 text-white border-separate border-spacing-y-2 md:border-spacing-y-4">
                    <TableHeader className="bg-grey">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-left text-white text-sm md:text-base">Short URL&apos;s</TableHead>
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-left text-white text-sm md:text-base">Original Link</TableHead>
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-left text-white text-sm md:text-base">QR Code</TableHead>
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-center text-white text-sm md:text-base">Clicks</TableHead>
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-center text-white text-sm md:text-base">Status</TableHead>
                            <TableHead className="p-2 md:p-4 font-semibold tracking-wide text-center text-white text-sm md:text-base relative">
                                Date
                                <TiArrowUnsorted className="cursor-pointer text-base absolute right-2 md:right-6 top-[53%] -translate-y-1/2" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dummyData.map(({ _id, shortUrl, originalUrl, qrCode, clicks, urlStatus, createdAt }) => (
                            <TableRow key={_id} className="hover:bg-grey transition-colors duration-200">
                                <TableCell className="p-2 md:p-4 text-xs md:text-sm flex justify-between items-center relative text-lite">
                                    <a rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">{shortUrl}</a>
                                </TableCell>
                                <TableCell className="p-2 md:p-4 text-xs md:text-sm text-lite">{originalUrl.slice(0, 30)}...</TableCell>
                                <TableCell className="text-xs md:text-sm text-lite mx-auto">
                                    <img src={qrCode.qrCodeImage} alt="QR Code" className="w-8 h-8 md:w-12 md:h-12 mx-auto bg-white" />
                                </TableCell>
                                <TableCell className="p-2 md:p-4 text-xs md:text-sm text-lite text-center">{clicks}</TableCell>
                                <TableCell className="p-2 md:p-4 text-xs md:text-sm text-center">
                                    {urlStatus}
                                </TableCell>
                                <TableCell className="p-2 md:p-4 text-xs md:text-sm text-right text-lite">{new Date(createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <About />
            <Testimonials />
        </div>
    )
}

export default Landing