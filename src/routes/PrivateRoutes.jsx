/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate, useNavigate } from "react-router-dom";
import { useContextProvider } from "../reducer";
import { useEffect } from "react";


export const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContextProvider();

    useEffect(() => {
        async function CheckAuthSession() {
            try {
                const request = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/check-session`, {
                    credentials: "include", // Include cookies for session check
                });

                const response = await request.json();
                if (response.success) {
                    setIsAuthenticated(true);
                    localStorage.setItem("isAuthenticated", isAuthenticated);
                } else {
                    setIsAuthenticated(false);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setIsAuthenticated(false);
                navigate("/login");
            }
        }

        CheckAuthSession(); // Run this when the component mounts
    }, [isAuthenticated, navigate, setIsAuthenticated]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};
