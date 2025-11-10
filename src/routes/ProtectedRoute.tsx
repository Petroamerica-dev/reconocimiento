import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // if (!user) {
    //     localStorage.setItem("returnUrl", location.pathname);
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;
