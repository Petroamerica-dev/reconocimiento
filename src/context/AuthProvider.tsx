import { createContext, useContext, useState } from "react";
// import { PublicClientApplication, type AccountInfo } from "@azure/msal-browser";

// const msalConfig = {
//     auth: {
//         clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
//         authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
//         redirectUri: "http://localhost:5173",
//     },
// };

const msalInstance: any = null;

type AuthContextType = {
    account: null;
    login: () => Promise<void>;
    logout: () => void;
    token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async () => {
        try {
            const resp = await msalInstance.loginPopup({
                scopes: ["User.Read"],
            });
            const acc = resp.account!;
            setAccount(acc);

            const tokenResp = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: acc,
            });

            setToken(tokenResp.accessToken);
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const logout = () => {
        msalInstance.logoutPopup();
        setAccount(null);
        setToken(null);
    };

    // useEffect(() => {
    //     const accounts = msalInstance.getAllAccounts();
    //     if (accounts.length > 0) {
    //         setAccount(accounts[0]);
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{ account, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};
