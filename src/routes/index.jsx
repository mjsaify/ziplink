import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />} />
            <Route exact path="/dashboard" element={<PrivateRoutes/>}>
                <Route path="/dashboard" element={Dashboard} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}