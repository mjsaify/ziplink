import { createContext, useContext, useEffect, useState } from "react";
import { SignupSchema } from '../utils/_types';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [urlData, setUrlData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputErrors, setInputErrors] = useState(null)

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
            console.log(response)
            setLoading(false);
            setUrlData([...urlData, response.url]);
        } catch (error) {
            console.log(error)
        }
    };

    const SignupUser = async (formData) => {
        try {
            console.log("Form submitted");

            // const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/user/signup`, {
            //     method: "post",
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });

            // const response = await request.json();
            // console.log(response);
            // return response;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    }, [inputErrors])

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
        <AppContext.Provider value={{ GenerateShortUri, SignupUser, urlData, loading, error, inputErrors }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}