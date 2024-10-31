import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "../pages/Signup"
import RootLayout from "../pages/RootLayout";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import { PrivateRoutes } from "./PrivateRoutes";
import LinksPage from "../pages/LinksPage";
import SingleUrl from "../pages/SingleUrl";
import Dashboard from "../pages/Dashboard";

export const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <h1 className="text-red-500 text-center my-8 text-4xl">404 Page Not Found</h1>,
            children: [
                {
                    index: true,
                    element: <Landing />
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "dashboard",
                    element: (
                        <PrivateRoutes>
                            <Dashboard />
                        </PrivateRoutes>
                    )
                },
                {
                    path: "settings",
                    element: (
                        <PrivateRoutes>
                            <h1 className="text-white text-2xl">User Settings</h1>
                        </PrivateRoutes>
                    )
                },
                {
                    path: "links",
                    element: (
                        <PrivateRoutes>
                            <LinksPage />
                        </PrivateRoutes>
                    )
                },
                {
                    path: "links/:urlId",
                    errorElement: <h1 className="text-red-500 text-center my-8 text-4xl">404 Page Not Found</h1>,
                    element: (
                        <PrivateRoutes>
                            <SingleUrl />
                        </PrivateRoutes>
                    )
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />

}