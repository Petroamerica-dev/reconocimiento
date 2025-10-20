import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth } from "@/context/AuthProvider";

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
            const errorMessages: Record<string, string> = {
                'no_code': 'No se recibió código de autorización',
                'unauthorized': 'Tu correo no está registrado en el sistema',
                'auth_failed': 'Error en la autenticación'
            };

            alert(errorMessages[error] || 'Error desconocido');
            navigate("/login");
            return;
        }

        if (token) {
            try {
                const authData = JSON.parse(atob(token));

                localStorage.setItem("accessToken", authData.accessToken);
                localStorage.setItem("refreshToken", authData.refreshToken);
                localStorage.setItem("user", JSON.stringify(authData.user));

                const returnUrl = localStorage.getItem("returnUrl") || "/main";
                localStorage.removeItem("returnUrl");

                window.location.href = returnUrl;
            } catch (error) {
                console.error("Error parsing auth data:", error);
                alert("Error al procesar la autenticación");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Completando autenticación...</p>
            </div>
        </div>
    );
};

export default Callback;