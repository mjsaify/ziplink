import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "../pages/Signup"
import RootLayout from "../pages/RootLayout";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import { PrivateRoutes } from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import SingleUrl from "../pages/SingleUrl";


export const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <h1 className="text-red-500 text-center my-8 text-4xl">Page Not Found</h1>,
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
                    path: "links/:userId",
                    element: (
                        <PrivateRoutes>
                            <SingleUrl/>
                        </PrivateRoutes>
                    )
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />

}