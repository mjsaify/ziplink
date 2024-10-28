/* eslint-disable react/prop-types */
import { FaLink, FaLinkSlash } from "react-icons/fa6"

const UrlStatus = (props) => {
    const { urlStatus } = props;

    if (urlStatus === "active") {
        return (
            <>
                <span className="text-active-link">Active</span>
                <FaLink className="bg-grey-lite text-active-link w-[30px] h-[30px] p-2 rounded-full absolute top-0 right-2" />
            </>
        )
    } else if (urlStatus === "inactive") {
        return (
            <>
                <span className="text-inactive-link">Inactive</span>
                <FaLinkSlash className="bg-grey-lite w-[30px] h-[30px] p-2 rounded-full text-inactive-link absolute top-0 right-2" />
            </>
        )
    } else {
        return (
            <>
                <span className="text-expired-link">Expired</span>
                <FaLinkSlash className="bg-grey-lite w-[30px] h-[30px] p-2 rounded-full text-expired-link absolute top-0 right-2" />
            </>
        )
    }
}

export default UrlStatus