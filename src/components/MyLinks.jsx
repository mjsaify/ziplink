/* eslint-disable react/prop-types */
import { Copy, Download, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { FormatDateandTime } from "../utils";

const MyLinks = (props) => {
    const { _id, shortUrl, originalUrl, createdAt, qrCode: { qrCodeImage }, title } = props;


    return (
        <div className="bg-grey p-4 my-4 mb-8 flex text-white border border-grey-lite rounded">
            <img src={qrCodeImage} alt="" />
            <div className="w-full px-8">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-2xl">
                        <Link to={`/links/${_id}`} className="hover:underline">{title}</Link>
                    </h1>
                    <div className="flex gap-x-4">
                        <Copy className="cursor-pointer hover:text-brand-primary-blue" />
                        <Download className="cursor-pointer hover:text-brand-primary-blue" />
                        <Trash className="cursor-pointer hover:text-brand-primary-blue" />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-2xl text-blue-500 hover:underline cursor-pointer">{shortUrl}</p>
                    <p className="my-2 text-sm cursor-pointer hover:underline">{originalUrl}</p>
                    <p className="text-lite text-sm">{FormatDateandTime(createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default MyLinks