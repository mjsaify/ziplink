import { IoIosLink } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { useContextProvider } from "../reducer";

const initialValue = {
  originalUrl: '',
}

const UrlInput = () => {
  const [formData, setFormData] = useState(initialValue);
  const { GenerateShortUri } = useContextProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make api call and send data to backend
    await GenerateShortUri(formData.originalUrl);
  }


  return (
    <div className="mt-12 relative lg:w-1/2 mx-auto">
      <div className="absolute top-1/2 left-2 -translate-y-[50%]">
        <IoIosLink className="w-full text-white h-full rounded-full p-2 text-2xl" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="originalUrl" id="originalUrl" value={formData.url} onChange={handleChange} className="w-full p-3 pl-14 outline-none border-4 border-grey-lite bg-grey text-white rounded-full text-lg" placeholder="Enter the url here" />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-[50%]">
          <div className="w-full text-white bg-blue-600 h-full rounded-full p-3 text-lg ">
            <FaArrowRightLong />
          </div>
        </button>
      </form>
    </div>
  )
}

export default UrlInput