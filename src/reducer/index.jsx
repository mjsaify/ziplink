/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_SERVER_URI;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true" ? true : false
    );
    const [urlData, setUrlData] = useState([]);
    const [singleUrlData, setSingleUrlData] = useState({})
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const GenerateShortUri = async (url) => {
        setLoading(true)
        try {
            const request = await fetch(`${BASE_URL}/api/url/short-url`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(url),
            });
            const response = await request.json();
            if (!response.success) {
                toast({
                    title: response.message
                });
            }
            setRefetch(!refetch);
            toast({
                title: response.message
            });
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const SignupUser = async (formData) => {
        try {
            const request = await fetch(`${BASE_URL}/api/signup`, {
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
            const request = await fetch(`${BASE_URL}/api/login`, {
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


    const LogoutUser = async () => {
        try {
            const request = await fetch(`${BASE_URL}/api/user/logout`, {
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
    };

    const GetSingleUrl = async (_id) =>{
        try {
            const request = await fetch(`${BASE_URL}/api/url/links/${_id}`);
            const response = await request.json();
            if(!response.success){
                toast({
                    title: response.error,
                })
            };
            setSingleUrlData(response.url);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        setLoading(true)
        async function GetUrlData() {
            const request = await fetch(`${BASE_URL}/api/url`);
            const response = await request.json();
            if (response.error) {
                setError(response.error);
            } else {
                setUrlData(response);
            }
            setLoading(false);
        };
        GetUrlData();
    }, [refetch]);

    return (
        <AppContext.Provider value={{ GenerateShortUri, SignupUser, LoginUser, LogoutUser, GetSingleUrl, singleUrlData, isAuthenticated, setIsAuthenticated, urlData, loading, error }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}