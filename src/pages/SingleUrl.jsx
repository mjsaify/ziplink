import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextProvider } from "../reducer";

const SingleUrl = () => {
    const { GetSingleUrl, singleUrlData } = useContextProvider();
    const { userId } = useParams();

    useEffect(() => {
        GetSingleUrl(userId)
    }, []);


    console.log(singleUrlData)
    return (
        <div>SingleUrl</div>
    )
}

export default SingleUrl