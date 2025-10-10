// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthProvider";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // const { account } = useAuth();

    // if (!account) {
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;
