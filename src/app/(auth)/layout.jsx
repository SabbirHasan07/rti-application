'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userRaw = localStorage.getItem("role");
       
        
        if (userRaw) {
            if(userRaw.role === 'ADMIN'){
                router.push("/adminDashboard");
            }else{
                router.push("/userDashboard");
            }
            setLoading(false)
        }else{
            setLoading(false)
        }
    }, []);
    if(loading) return <div>loading</div>
    return (
        <>
            {children}
        </>
    );
}
