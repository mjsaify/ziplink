/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"


const DownloadQrCodeButon = ({ DownloadQrCode, id, imageLink }) => {
    const download = async (e) => {
        e.preventDefault();
        await DownloadQrCode(id);

        const element = document.createElement("a");
        const file = new Blob(
            [
                imageLink
            ],
            { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "qrcode.jpeg";
        element.click();
    };



    return (
        <Button className="mt-2 bg-brand-primary-blue">
            <Download className="h-4 w-4" />
            <a href={imageLink} download={false} onClick={(e)=> download(e)}>Download QR Code</a>
        </Button>
    )
}

export default DownloadQrCodeButon