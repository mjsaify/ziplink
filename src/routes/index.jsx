import Landing from "../pages/Landing";
import RootLayout from "../pages/RootLayout";
import { LoginRoute, SignupRoute } from "./auth";

const AppRoutes = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            LoginRoute,
            SignupRoute,
        ]
    },
];

export default AppRoutes;