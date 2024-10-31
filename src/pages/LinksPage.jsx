import { BarChart, Filter, Link, MousePointerClick, QrCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import MyLinks from "../components/MyLinks"
import { useContextProvider } from "../reducer"
import NewLinkDialog from "../components/NewLinkDialog"
import { useEffect, useState } from "react"


const LinksPage = () => {
  const { urlData, refetch, } = useContextProvider();
  const [filteredUrlData, setFilteredUrlData] = useState(urlData);

  const handleChange = (e) => {
    const filterdItems = urlData.filter((item) => {
      if (item.title.toLowerCase().includes(e.target.value.toLowerCase())) return item;
    });

    setFilteredUrlData(filterdItems);
  };

  useEffect(() => {
    setFilteredUrlData(urlData)
  }, [urlData, refetch]);

  return (
    <main>
      {/* Show these cards on user dashboard */}
      {/* <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total URL Created</CardTitle>
            <BarChart className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">253</div>
            <p className="text-xs text-lite">Total short URLs created</p>
          </CardContent>
        </Card>
        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Links</CardTitle>
            <Link className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">56</div>
            <p className="text-xs text-lite">All your short active links</p>
          </CardContent>
        </Card>
        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">All Time Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">54213</div>
            <p className="text-xs text-lite">Across all your short URLs</p>
          </CardContent>
        </Card>

        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">QR Code Scans</CardTitle>
            <QrCode className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4534</div>
            <p className="text-xs text-lite">Across all your short URLs</p>
          </CardContent>
        </Card>
      </div> */}
      <div className="my-12 flex justify-between">
        <h1 className="text-white text-4xl font-semibold">My Links</h1>
        <NewLinkDialog />
      </div>
      <div className="relative">
        <Input className="px-3 py-6 border-2 border-grey-lite text-white outline-none focus-within:border-lite" placeholder="Filter links..." onChange={(e) => handleChange(e)} />
        <Filter className="text-white absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="mt-12">
        {
          filteredUrlData.length < 1 ? <h1 className="text-center text-expired-link text-2xl my-8">Not Found</h1> : filteredUrlData.map((item) => (
            <MyLinks key={item._id} {...item} />
          ))
        }
      </div>
    </main>
  )
}

export default LinksPage