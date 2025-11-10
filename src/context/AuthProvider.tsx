import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
    user_id: number;
    email: string;
    name: string;
    boss_id: number;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = localStorage.getItem("accessToken");
                const storedUser = localStorage.getItem("user");

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));

                    const isValid = await verifyToken(storedToken, JSON.parse(storedUser)?.user_id);
                    if (!isValid) {
                        const refreshed = await refreshToken();
                        if (!refreshed) {
                            logout();
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading stored auth:", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        loadStoredAuth();
    }, []);

    const verifyToken = async (accessToken: string, user_id: number): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/api/users/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.ok;
        } catch {
            return false;
        }
    };

    const login = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/auth/login`);
            const { authUrl } = await response.json();

            localStorage.setItem("returnUrl", window.location.pathname);
            window.location.href = authUrl;
        } catch (err) {
            console.error("Login error:", err);
            setIsLoading(false);
        }
    };

    // const handleCallback = async (code: string) => {
    //     try {
    //         setIsLoading(true);

    //         const response = await fetch(`${API_URL}/auth/callback?code=${code}`);

    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw new Error(error.message || "Error en autenticación");
    //         }

    //         const data = await response.json();

    //         localStorage.setItem("accessToken", data.accessToken);
    //         localStorage.setItem("refreshToken", data.refreshToken);
    //         localStorage.setItem("user", JSON.stringify(data.user));

    //         setToken(data.accessToken);
    //         setUser(data.user);

    //         const returnUrl = localStorage.getItem("returnUrl") || "/dashboard";
    //         localStorage.removeItem("returnUrl");
    //         navigate(returnUrl);
    //     } catch (error: any) {
    //         console.error("Callback error:", error);
    //         alert(error.message || "Error al iniciar sesión");
    //         navigate("/login");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const refreshToken = async (): Promise<boolean> => {
        try {
            const storedRefreshToken = localStorage.getItem("refreshToken");

            if (!storedRefreshToken) {
                return false;
            }

            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: storedRefreshToken }),
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);

            return true;
        } catch (error) {
            console.error("Refresh token error:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                logout,
                refreshToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};

export const useAuthCallback = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthCallback debe usarse dentro de AuthProvider");

    return {
        handleCallback: (context as any).handleCallback,
    };
};