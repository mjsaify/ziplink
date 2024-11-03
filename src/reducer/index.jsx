/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "../utils/_constants";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true" ? true : false);
    const [user, setUser] = useState({});
    const [urlData, setUrlData] = useState([]);
    const [singleUrlData, setSingleUrlData] = useState({})
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(false );
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
                credentials: 'include'
            });
            const response = await request.json();
            if (!response.success) {
                setLoading(false)
                return toast({
                    title: response.error,
                });
            }
            setRefetch(!refetch);
            setLoading(true)
            toast({
                title: response.message
            });
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const UpdateShortUrl = async (url, urlId) => {
        try {
            setLoading(true)
            const request = await fetch(`${BASE_URL}/api/url/links/${urlId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(url),
                credentials: "include",
            });
            const response = await request.json();
            if (!response.success) {
                setLoading(false)
                return toast({
                    title: response.message
                });
            };
            setRefetch(!refetch);
            setLoading(false)
            toast({
                title: response.message
            });
        } catch (error) {
            console.log(error)
            toast({
                title: "ERR: While updating url",
                variant: "destructive"
            })
        }
    };

    const DeleteUri = async (id) => {
        try {
            const request = await fetch(`${BASE_URL}/api/url/links/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'
            });

            const response = await request.json();
            if (!response.success) {
                toast({
                    title: response.message,
                })
            };
            return response;
        } catch (err) {
            console.log(err);
            toast({
                title: "ERR: While deleting",
                variant: "destructive"
            })
        }
    }


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
                return toast({
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
        setLoading(true)
        try {
            const request = await fetch(`${BASE_URL}/api/login`, {
                method: "post",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const response = await request.json();
            setLoading(false)
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

    const GetUserDetails = async () => {
        try {
            const request = await fetch(`${BASE_URL}/api/user`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            });
            const response = await request.json();
            if (!response.success) {
                return toast({
                    title: "Failed to fetch user"
                });
            };
            setUser(response.user);
        } catch (error) {
            console.log(error)
        }
    };

    const UpdateUserDetails = async (formData, id) => {
        try {
            setLoading(true)
            const request = await fetch(`${BASE_URL}/api/user/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const response = await request.json();
            setLoading(false)
            return response;
        } catch (error) {
            console.log(error);
            toast({
                title: "Could Not update profile"
            })
        }
    }


    const UpdatePassword = async (formData, id) => {
        setLoading(true)
        try {
            const request = await fetch(`${BASE_URL}/api/user/update/password/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const response = await request.json();
            setLoading(false)
            return response;
        } catch (error) {
            console.log(error);
            toast({
                title: "Could Not update profile"
            })
        }
    }


    const GetSingleUrl = async (_id) => {
        try {
            setLoading(true)
            const request = await fetch(`${BASE_URL}/api/url/links/${_id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            });
            const response = await request.json();
            if (!response.success) {
                setLoading(false)
                return toast({
                    title: response.error,
                })
            };
            setLoading(false)
            setSingleUrlData(response.url);
        } catch (error) {
            setError(error.message);
        }
    };

    const DownloadQrCode = async (_id) => {
        try {
            const request = await fetch(`${BASE_URL}/api/url/links/download/${_id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            });
            const response = await request.json();
            if (!response.success) {
                return toast({
                    title: response.error,
                })
            };
            return response;
        } catch (error) {
            setError(error.message);
        }
    };

    const DeleteUserAccount = async (id) => {
        try {
            setLoading(true)
            const request = await fetch(`${BASE_URL}/api/user/delete/${id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            });
            const response = await request.json();
            if (!response.success) {
                setLoading(true)
                return toast({
                    title: response.message,
                })
            };
            setLoading(false)
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }



    return (
        <AppContext.Provider value={{ GenerateShortUri, SignupUser, LoginUser, LogoutUser, UpdateUserDetails, UpdatePassword, DeleteUserAccount, GetUserDetails, GetSingleUrl, UpdateShortUrl, DeleteUri, DownloadQrCode, location, user, singleUrlData, isAuthenticated, setIsAuthenticated, setRefetch, refetch, setUrlData, urlData, setLoading, loading, error }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;


export const useContextProvider = () => {
    return useContext(AppContext);
}
