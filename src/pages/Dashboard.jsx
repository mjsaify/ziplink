import { BarChart, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import MyLinks from "../components/MyLinks"
import { useContextProvider } from "../reducer"


const Dashboard = () => {
  const { urlData } = useContextProvider();
  return (
    <main>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Clicks</CardTitle>
            <BarChart className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">54213</div>
            <p className="text-xs text-lite">Across all your short URLs</p>
          </CardContent>
        </Card>
        <Card className="bg-grey border-2 border-grey-lite">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Links</CardTitle>
            <p className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">56</div>
            <p className="text-xs text-lite">Total short URLs created</p>
          </CardContent>
        </Card>
      </div>
      <div className="my-12 flex justify-between">
        <h1 className="text-white text-4xl font-semibold">My Links</h1>
        <Button className="border-none bg-brand-primary-blue text-white hover:">Create New Link</Button>
      </div>
      <div className="relative">
        <Input className="px-3 py-6 border-2 border-grey-lite text-white outline-none focus-within:border-lite" placeholder="Filter links..." />
        <Filter className="text-white absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="mt-12">
        {
          urlData.map((item) => (
            <MyLinks key={item._id} {...item} />
          ))
        }
      </div>
    </main>
  )
}

export default Dashboard