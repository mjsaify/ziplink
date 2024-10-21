/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";



export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [urlData, setUrlData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const navigate = useNavigate()

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
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/user/signup`, {
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
        }
    };

    const LoginUser = async (formData) => {
        try {
            const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/user/login`, {
                method: "post",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const response = await request.json();
            console.log(response)
            if (!response.success) {
                toast({
                    title: response.message,
                });
            };

            setIsAuthenticated(true);
            // navigate("/");
            toast({
                title: response.message,
            });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        async function CheckAuth() {
            try {
                const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/check-session`);
                const response = await request.json();
                console.log(response)
                setIsAuthenticated(response.success);
            } catch (error) {
                console.log(error)
            }
        };
        CheckAuth()
    },[])

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
        <AppContext.Provider value={{ GenerateShortUri, SignupUser, LoginUser, isAuthenticated, urlData, loading, error }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}