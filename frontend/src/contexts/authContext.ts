import { createContext } from "react";

type AuthContextType = {
    manager: { name: string; id: string } | null;
    login(email: string, password: string, remember?: boolean): Promise<void>;
}
export const AuthContext = createContext<AuthContextType>(null!);