import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TiArrowUnsorted } from "react-icons/ti";
import UrlStatus from "./UrlStatus";
import { NumberToDate } from "../utils";
import { useEffect, useState } from "react";


const UrlTable = () => {
    const [urlData, setUrlData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        async function GetUrlData() {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/url`);
            const response = await request.json();
            if (response.error) {
                setError(response.message);
            }
            setLoading(false);
            setUrlData(response);
        };
        GetUrlData();
    }, []);

    if (error) {
        return <h1 className="text-4xl text-red-500 text-center">{error}</h1>
    }
    if (loading) {
        return <h1 className="text-4xl text-red-500">Loading...</h1>
    }

    return (

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
                {!urlData.length < 1 && urlData.slice(0,4).map((data) => {
                    const { _id, originalUrl, shortUrl, clicks, urlStatus, createdAt, qrCode } = data;
                    return (
                        <TableRow key={_id} className="hover:bg-grey transition-colors duration-200">
                            <TableCell className="p-2 md:p-4 text-xs md:text-sm flex justify-between items-center relative text-lite">
                                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200">{shortUrl}</a>
                            </TableCell>
                            <TableCell className="p-2 md:p-4 text-xs md:text-sm text-lite">{originalUrl.slice(0, 30)}...</TableCell>
                            <TableCell className="text-xs md:text-sm text-lite mx-auto">
                                <img src={qrCode.qrCodeImage} alt="QR Code" className="w-8 h-8 md:w-12 md:h-12 mx-auto" />
                            </TableCell>
                            <TableCell className="p-2 md:p-4 text-xs md:text-sm text-lite text-center">{clicks}</TableCell>
                            <TableCell className="p-2 md:p-4 text-xs md:text-sm text-center">
                                <UrlStatus urlStatus={urlStatus} />
                            </TableCell>
                            <TableCell className="p-2 md:p-4 text-xs md:text-sm text-right text-lite">{NumberToDate(createdAt)}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default UrlTable