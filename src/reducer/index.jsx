import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [urlData, setUrlData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GenerateShortUri = async (url) => {
        try {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/url/short-url`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ originalUrl: url }),
            });
            const response = await request.json();
            setLoading(false);
            setUrlData([...urlData, response.url]);
            console.log(urlData)
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        async function GetUrlData() {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/url`);
            const response = await request.json();
            if (response.error) {
                setError(response.error);
            }
            setLoading(false);
            setUrlData(response);
        };
        GetUrlData();
    }, []);

    return (
        <AppContext.Provider value={{ GenerateShortUri, urlData, loading, error }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}