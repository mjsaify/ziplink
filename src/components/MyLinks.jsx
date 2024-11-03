/* eslint-disable react/prop-types */
import { Copy, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { FormatDateandTime, handleCopyToClipboard } from "../utils";
import fileDownload from "js-file-download";
import { useContextProvider } from "../reducer";

const MyLinks = (props) => {
    const { _id, shortUrl, originalUrl, createdAt, qrCode, title } = props;
    const { DownloadQrCode, loading } = useContextProvider();


    const download = async (imageLink) => {
        await DownloadQrCode(_id);

        const request = await fetch(imageLink);
        const response = await request.blob();
        fileDownload(response, 'qrcode.jpeg');
    };

    if(loading){
        return <h1 className="text-center text-2xl">Loading Urls...</h1>
    }
    
    return (
        <div className="bg-grey p-4 my-4 mb-8 flex text-white border border-grey-lite rounded">
            <img src={qrCode?.qrCodeImage} alt="" />
            <div className="w-full px-8">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-2xl">
                        <Link to={`/links/${_id}`} className="hover:underline">{title}</Link>
                    </h1>
                    <div className="flex gap-x-4">
                        <Copy className="cursor-pointer hover:text-brand-primary-blue" onClick={()=> handleCopyToClipboard(shortUrl)} />
                        <Download className="cursor-pointer hover:text-brand-primary-blue" onClick={()=> download()} />
                    </div>
                </div>
                <div className="mt-4">
                    <a href={shortUrl} target="_blank" className="text-2xl text-blue-500 hover:underline cursor-pointer">{shortUrl}</a>
                    <p className="my-2 text-sm cursor-pointer hover:underline">{originalUrl}</p>
                    <p className="text-lite text-sm">{FormatDateandTime(createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default MyLinks