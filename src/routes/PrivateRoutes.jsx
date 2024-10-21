/* eslint-disable react/prop-types */
import { Route, Navigate } from "react-router-dom"
import { useContextProvider } from "../reducer"

const PrivateRoutes = (props) => {
    const { component: Component, ...rest } = props;
    const { isAuthenticated } = useContextProvider();

    return (
        <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
        }
      />
    )
}

export default PrivateRoutes