import { Filter } from "lucide-react"
import { Input } from "../components/ui/input"
import MyLinks from "../components/MyLinks"
import { useContextProvider } from "../reducer"
import NewLinkDialog from "../components/NewLinkDialog"
import { useEffect, useState } from "react"


const LinksPage = () => {
  const { urlData, refetch } = useContextProvider();
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
          Array.isArray(filteredUrlData) && filteredUrlData.length > 0
            ? filteredUrlData.map((item) => (
              <MyLinks key={item._id} {...item} />
            ))
            : <h1 className="text-center text-expired-link text-2xl my-8">
              {filteredUrlData.message || "...Oops No URLs Found"}
            </h1>
        }
      </div>
    </main>
  )
}

export default LinksPage