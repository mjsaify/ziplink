/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContextProvider } from "../reducer";


export const PrivateRoutes = ({ children }) => {
    const { isAuthenticated } = useContextProvider();
    return isAuthenticated ? children : <Navigate to="/login" />;
};
