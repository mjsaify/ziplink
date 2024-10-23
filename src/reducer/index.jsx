/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true" ? true : false
    );
    const [urlData, setUrlData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

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
        } catch (error) {
            console.log(error)
        }
    };

    const SignupUser = async (formData) => {
        try {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/signup`, {
                method: "post",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const response = await request.json();
            if (!response.success) {
                toast({
                    title: response.message,
                });
            };
            toast({
                title: response.message,
            });
        } catch (error) {
            console.log(error)
            toast({
                title: "ERR: While signup",
                variant: "destructive"
            })
        }
    };

    const LoginUser = async (formData) => {
        try {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/login`, {
                method: "post",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const response = await request.json();
            return response;
        } catch (error) {
            console.log(error)
            toast({
                title: "ERR: While login",
                variant: "destructive"
            })
        }
    };


    const LogoutUser = async () =>{
        try {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/user/logout`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include'
            });
            const response = await request.json();
            return response;
        } catch (error) {
            console.log(error)
            toast({
                title: "ERR: While logging you out",
                variant: "destructive"
            })
        }
    }

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
        <AppContext.Provider value={{ GenerateShortUri, SignupUser, LoginUser, LogoutUser, isAuthenticated, setIsAuthenticated, urlData, loading, error }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}