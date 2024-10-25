import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaCopy } from "react-icons/fa6";
import { TiArrowUnsorted } from "react-icons/ti";
// import { useContextProvider } from "../reducer"
import UrlStatus from "./UrlStatus";
import { NumberToDate } from "../utils";
import { useEffect, useState } from "react";


const UrlTable = () => {
    // const { urlData, loading, error } = useContextProvider();
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
        <Table className="w-full mx-auto mb-24 text-white border-separate border-spacing-y-6">
            <TableHeader className="bg-grey">
                <TableRow className="hover:bg-transparent">
                    <TableHead className="p-4 font-semibold tracking-wide text-left text-white">Short Url&apos;s</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-left text-white">Original Link</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-left text-white">QR Code</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center text-white">Clicks</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center text-white">Status</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center text-white relative">
                        Date
                        <TiArrowUnsorted className="cursor-pointer text-base absolute right-6 top-[53%] -translate-x-1/2 -translate-y-1/2"/>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    urlData && urlData.map((data) => {
                        const { _id, originalUrl, shortUrl, clicks, urlStatus, date, qrCode } = data;
                        return (
                            <TableRow key={_id} className="hover:bg-grey">
                                <TableCell className="w-full p-4 text-sm flex justify-between items-center relative text-lite">
                                    {shortUrl}
                                    <FaCopy className="cursor-pointer bg-grey-lite w-[30px] h-[30px] p-2 rounded-full absolute right-12" />
                                </TableCell>
                                <TableCell className="p-4 text-sm text-lite">{originalUrl.slice(0, 50)}</TableCell>
                                <TableCell className="text-sm text-lite mx">
                                    <img src={qrCode.qrCodeImage} alt="" className="w-12 h-12 ml-2" />
                                </TableCell>
                                <TableCell className="p-4 text-sm text-lite text-center">{clicks}</TableCell>
                                <TableCell className="p-4 text-sm text-center flex justify-between items-center relative">
                                    <UrlStatus urlStatus={urlStatus}/>
                                </TableCell>
                                <TableCell className="p-4 text-sm text-right text-lite">{NumberToDate(date)}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default UrlTable