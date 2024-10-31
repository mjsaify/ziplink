import { toast } from "../hooks/use-toast";

// conver date string to readable date format
export const NumberToDate = (dateNumber) => {
    const date = new Date(dateNumber);
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
};

export const FormatDateandTime = (DateandTime) => {
    const dateTime = new Date(DateandTime);
    const month = dateTime.toLocaleString('default', { month: "long"});
    const time = dateTime.toLocaleTimeString()
    const expiresAt = `${month} ${dateTime.getDate()}, ${dateTime.getFullYear()} at ${time}`
    return expiresAt
};


export const handleCopyToClipboard = async (shortUrl) =>{
    try {
        await window.navigator.clipboard.writeText(shortUrl);
        toast({
            title: "Copied"
        })
    } catch (error) {
        console.log(error)
        toast({
            title: "Copy Failed"
        })
    }
}