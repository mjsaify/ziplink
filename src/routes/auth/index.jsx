import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

export const LoginRoute = {
    path: "login",
    element: <Login />,
    errorElement: <h1 className='text-red-500 text-3xl font-semibold'>404 Page Not Found</h1>,
}

export const SignupRoute = {
    path: "signup",
    element: <Signup />,
    errorElement: <h1 className='text-red-500 text-3xl font-semibold'>404 Page Not Found</h1>,
}