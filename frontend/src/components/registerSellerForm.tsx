import { SaleProps } from "@/pages/Dashboard";
import { useApi } from "@/services/axios";
import React, { useState } from "react";

export type SellerProps = {
    id: string,
    name: string,
    email: string
    sales: SaleProps[]
}

export function RegisterSellerForm() {
    const api = useApi();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [managerId, setManagerId] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLElement>){
        e.preventDefault();

        if(!name || !email || !password || !confirmPassword){
            return alert("All fields are required");
        }

        if(password !== confirmPassword){
            return alert("Passwords don't match");
        }

        if(password.length < 8){
            return alert("Password must have at least 8 characters");
        }

        const responseStatus = await api.registerSeller({
            name, email, password, managerId
        });

        if(responseStatus !== 201){
            return alert("Something went wrong");
        }
    }

    return (
        <section className="h-min">
            <form className="flex flex-col gap-4 items-center family-mono" onSubmit={handleSubmit}>
                <h2 className="text-blue-600 font-serif text-xl">Managerr</h2>
                <input type="text" className="border border-slate-400 rounded-md p-2" placeholder="Digit your name" onChange={e=> setName(e.target.value)}/>
                <input type="text" className="border border-slate-400 rounded-md p-2" placeholder="Digit your email address" onChange={e=> setEmail(e.target.value)}/>
                <input type="password" className="border border-slate-400 rounded-md p-2" placeholder="Create a password" onChange={e=> setPassword(e.target.value)}/>
                <input type="password" className="border border-slate-400 rounded-md p-2" placeholder="Confirm the password" onChange={e=> setConfirmPassword(e.target.value)}/>
               <button className="submit-btn" type="submit"><p className="active:text-base">Register</p></button>
            </form>
        </section>
    )
}