import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContextProvider } from "../reducer";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { BarChart2, Copy, Download, QrCode, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import EditUrl from "../components/EditUrl";
import { FormatDateandTime, handleCopyToClipboard } from "../utils";
import UrlStatus from "../components/UrlStatus";
import DownloadQrCodeButon from "../components/DownloadQrCodeButon";
import { toast } from "../hooks/use-toast";

const SingleUrl = () => {
    const { GetSingleUrl, singleUrlData, setRefetch, refetch, DeleteUri, DownloadQrCode } = useContextProvider();
    const { urlId } = useParams();
    const navigate = useNavigate();

    const handleDeleteUrl = async () =>{
        const response = await DeleteUri(singleUrlData._id);
        if(response.success){
            toast({
                title: response.message,
            });
            setRefetch(!refetch);
            return navigate("/dashboard");
        }
    }

    useEffect(() => {
        GetSingleUrl(urlId)
    }, [refetch]);

    return (
        <main className="my-8">
            <div className="mb-6">
                <Label className="text-white font-normal text-base">URL Name</Label>
                <Input placeholder="Custom Url Name" className="text-white border-grey-lite bg-grey mt-2" value={singleUrlData.title || ""} readOnly />
            </div>
            <div className="mb-6">
                <Label className="text-white font-normal text-base">Short Url</Label>
                <div className="flex items-center gap-x-4">
                    <Input placeholder="Custom Url Name" className="text-white border-grey-lite bg-grey mt-2" value={singleUrlData.shortUrl || ""} readOnly />
                    <Button className="text-white flex items-center bg-brand-primary-blue mt-2" onClick={()=> handleCopyToClipboard(singleUrlData.shortUrl)}>
                        <span className="max-sm:hidden">Copy</span>
                        <Copy className="w-4 " />
                    </Button>
                </div>
            </div>
            <div className="mb-6">
                <Label className="text-white font-normal text-base">Original Url</Label>
                <Input placeholder="Custom Url Name" className="text-white border-grey-lite bg-grey mt-2" value={singleUrlData.originalUrl || ""} readOnly />
            </div>
            <div className="my-12 flex justify-between items-center max-md:flex-col max-md:items-start">
                <div className="text-white flex flex-col">
                    <span className="text-xl mb-4">Created At</span>
                    <span>{FormatDateandTime(singleUrlData.createdAt)}</span>
                </div>
                <div className="max-sm:my-8 flex flex-col">
                    <span className="text-white text-xl mb-4">Expires At</span>
                    <span className="text-white">{FormatDateandTime(singleUrlData.expiresAt)}</span>
                </div>
                <div className="max-sm:mb-8 flex flex-col">
                    <span className="text-white text-xl mb-4">URL Status</span>
                    <div className="relative">
                        <UrlStatus urlStatus={singleUrlData.urlStatus} />
                    </div>
                </div>
            </div>

            <div>
                <span className="text-white text-2xl font-normal">QR Code</span>
                <div className="mt-2 bg-grey border border-grey-lite p-4 rounded-lg flex items-center justify-center">
                    <div className="w-32 h-32 bg-white flex items-center justify-center border">
                        <img src={singleUrlData.qrCode?.qrCodeImage} alt="qr code" className="my-4" />
                    </div>
                </div>
                <DownloadQrCodeButon DownloadQrCode={DownloadQrCode} id={singleUrlData._id} imageLink={singleUrlData?.qrCode?.qrCodeImage} />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-grey text-white border-grey-lite">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                            <BarChart2 className="h-4 w-4 text-muted-foreground text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{singleUrlData.clicks}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-grey text-white border-grey-lite">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Clicks</CardTitle>
                            <BarChart2 className="h-4 w-4 text-muted-foreground text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{singleUrlData.uniqueClicks}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-grey text-white border-grey-lite">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
                            <QrCode className="h-4 w-4 text-muted-foreground text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{singleUrlData.qrCode?.scans}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-grey text-white border-grey-lite">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{singleUrlData.qrCode?.downloads}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="my-8">
                <h1 className="text-2xl text-white">Analytics Over Time</h1>
                <p className="text-white">Show Graph here</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {/* <Card className="bg-grey text-white border-grey-lite">
                    <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span>Google</span>
                                <span className="text-sm text-white">40%</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card> */}
                {/* <Card className="bg-grey text-white border-grey-lite">
                    <CardHeader>
                        <CardTitle>Most Scanned Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span>Homepage</span>
                                <span className="text-sm text-white">150 scans</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card> */}
                <Card className="bg-grey text-white border-grey-lite">
                    <CardHeader>
                        <CardTitle>Clicks by Country</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span>United States</span>
                                <span className="text-sm text-white">800 clicks</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-grey text-white border-grey-lite">
                    <CardHeader>
                        <CardTitle>QR Code Scans by Platform</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span>Android</span>
                                <span className="text-sm text-white">200 scans</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="pt-6 flex justify-between">
                <EditUrl urlStatus={singleUrlData.urlStatus} expiresAt={singleUrlData.expiresAt} urlId={urlId} />
                <Button variant="destructive" onClick={handleDeleteUrl}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete URL
                </Button>
            </div>
        </main>
    )
}

export default SingleUrl