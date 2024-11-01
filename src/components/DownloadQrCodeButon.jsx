/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import fileDownload from "js-file-download";


const DownloadQrCodeButon = ({ DownloadQrCode, id, imageLink }) => {
    const download = async (e, imageLink) => {
        await DownloadQrCode(id);

        const request = await fetch(imageLink);
        const response = await request.blob();
        fileDownload(response, 'qrcode.jpeg')
    };



    return (
        <Button className="mt-2 bg-brand-primary-blue">
            <Download className="h-4 w-4" />
            <a download={true} onClick={(e)=> download(e, imageLink)}>Download QR Code</a>
        </Button>
    )
}

export default DownloadQrCodeButon