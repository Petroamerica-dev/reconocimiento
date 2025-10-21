import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/main");
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        await login();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 700"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <path
                        fill="#3b82f6"
                        d="M0,0 L0,600 Q360,800 720,600 T1440,600 L1440,0 Z"
                    ></path>
                    <path
                        fill="#2563eb"
                        fillOpacity="0.9"
                        d="M0,0 L0,500 Q360,700 720,500 T1440,500 L1440,0 Z"
                    ></path>

                </svg>
            </div>

            <div className="flex lg:flex-row flex-col h-full justify-between lg:p-44 md:p-16 p-10 text-white gap-10">
                <div className="flex justify-center lg:w-3/5 w-full flex-col lg:gap-14 gap-8">
                    <div>
                        <h2 className="lg:text-6xl md:text-4xl text-2xl font-bold">¡BIENVENIDO!</h2>
                        <br />
                        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-sky-300">
                            RECONOCIMIENTO LABORAL PETROAMÉRICA
                        </h1>
                    </div>
                    <div className="h-2 w-1/2  bg-sky-400" />
                    <div>
                        <p className="md:text-xl text-lg text-gray-100 font-semibold">
                            Celebramos el talento que nos hace crecer juntos.
                        </p>
                        <p className="md:text-xl text-lg  text-gray-100 font-semibold">
                            Porque cada logro merece ser valorado y cada persona hace la diferencia.
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={handleLogin}
                            className="hover:bg-sky-500 hover:scale-[1.02] bg-sky-400 text-white px-4 py-2 rounded-4xl font-semibold cursor-pointer transition-all duration-200"
                        >
                            <span>Comenzar a reconocer</span>
                        </button>
                        <br />
                        <br />
                        <p className="text-xs md:text-base text-gray-100 italic">
                            Tómate un minuto para reconocer el esfuerzo de alguien más.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-end lg:w-2/5 w-full">
                    <img src="/img/bg-login.png" alt="" className="object-contain w-full h-full" />
                </div>
            </div>
        </div>
    );
}
