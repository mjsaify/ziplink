import { IoIosLink } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const UrlInput = () => {
  return (
    <div className="mt-12 relative">
      <div className="absolute top-1/2 left-2 -translate-y-[50%]">
        <IoIosLink className="w-full text-white h-full rounded-full p-2 text-lg" />
      </div>
      <input type="text" className="w-full p-4 pl-10 outline-none border-4 border-grey-lite bg-grey text-white rounded-full" placeholder="Enter the url here"/>
      <button className="absolute right-2 top-1/2 -translate-y-[50%]">
        <FaArrowRightLong className="w-full text-white bg-blue-600 h-full rounded-full p-4 text-lg " />
      </button>
    </div>
  )
}

export default UrlInput