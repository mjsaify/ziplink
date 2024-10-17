import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaCopy } from "react-icons/fa6";
import { useContextProvider } from "../reducer"


const UrlTable = () => {
    const { urlData, loading, error } = useContextProvider();

    const NumberToDate = (dateNumber) => {
        const date = new Date(dateNumber);
        const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        return formattedDate;
    }

    if (error) {
        return <h1 className="text-4xl text-red-500 text-center">{error}</h1>
    }
    if (loading) {
        return <h1 className="text-4xl text-red-500">Loading...</h1>
    }

    return (
        <Table className="w-full mx-auto mb-24 text-white border-separate border-spacing-y-6">
            <TableHeader className="bg-grey">
                <TableRow>
                    <TableHead className="p-4 font-semibold tracking-wide text-left">Short Url&apos;s</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-left">Original Link</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-left">QR Code</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center">Clicks</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center">Status</TableHead>
                    <TableHead className="p-4 font-semibold tracking-wide text-center">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    urlData && urlData.data.map((data) => {
                        const { _id, userId, originalUrl, shortUrl, clicks, date } = data;
                        return (
                            <TableRow key={_id}>
                                <TableCell className="w-full p-4 text-sm flex justify-between items-center relative">
                                    {shortUrl}
                                    <FaCopy className="cursor-pointer bg-grey-lite w-[30px] h-[30px] p-2 rounded-full absolute right-12" />
                                </TableCell>
                                <TableCell className="p-4 text-sm">{originalUrl.slice(0, 50)}</TableCell>
                                <TableCell className="p-4 text-sm">scanner</TableCell>
                                <TableCell className="p-4 text-sm text-center">{clicks}</TableCell>
                                <TableCell className="p-4 text-sm text-center">Active</TableCell>
                                <TableCell className="p-4 text-sm text-right">{NumberToDate(date)}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default UrlTable


