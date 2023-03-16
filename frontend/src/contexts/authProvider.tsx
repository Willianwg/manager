import { useApi } from "@/services/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

type Manager = {
    name: string;
    id: string;
}

export function AuthProvider({ children }: { children: JSX.Element }) {
    const api = useApi();
    const router = useRouter();

    const [manager, setManager] = useState<Manager | null>(null);

    async function authenticate() {
        if(manager) return;
        
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await api.authenticate(token);

        if (response.manager) {
            const { name, id } = response.manager;
            setManager({ name, id });
        }
    }

    async function login(email: string, password: string, remember?: boolean) {
        const { access_token, name, id } = await api.login(email, password);

        if (!access_token) {
            return alert("Email or password invalid.");
        };

        if (remember) {
            setToken(access_token);
        }

        setManager({ name, id });

        router.push("/Dashboard");
    }

    function setToken(token: string) {
        localStorage.setItem("access_token", token);
    }


    useEffect(() => {
        authenticate();
    }, [])

    return (
        <AuthContext.Provider value={{ manager, login }}>
            {children}
        </AuthContext.Provider>
    )
}