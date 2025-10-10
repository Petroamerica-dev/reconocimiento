// import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
    // const { login } = useAuth();
    const navigate = useNavigate();

    const login = () => {
        navigate("/main");
    };

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

            <div className="flex lg:flex-row flex-col h-full justify-between lg:p-44 md:p-16 p-10 text-white">
                <div className="flex justify-center lg:w-1/3 w-full flex-col lg:gap-14 gap-8">
                    <div>
                        <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold">BIENVENIDO!</h1>
                        <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-sky-300">
                            RECONOCIMIENTO LABORAL
                        </h2>
                    </div>
                    <div className="h-2 w-1/2  bg-sky-400" />
                    <p className="text-sm md:text-base text-gray-100 font-semibold">
                        Un espacio donde celebramos tu talento y dedicación. Aquí reconocemos el esfuerzo que nos hace
                        crecer juntos. Porque cada logro merece ser valorado y cada persona hace la diferencia.
                    </p>
                    <button
                        onClick={login}
                        className="hover:bg-sky-500 hover:scale-[1.02] bg-sky-400 text-white px-4 py-2 rounded-4xl lg:w-1/2 w-full font-semibold cursor-pointer transition-all duration-200"
                    >
                        INGRESAR
                    </button>
                </div>
                <div className="flex items-center justify-end lg:w-2/5 w-full">
                    <img src="/img/bg-login.png" alt="" className="object-contain w-full h-full" />
                </div>
            </div>
        </div>
    );
}
