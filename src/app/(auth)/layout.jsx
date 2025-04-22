'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userRaw = localStorage.getItem("loggedInUser");
        const user = JSON.parse(userRaw)
        if (user) {
            if(user.role === 'admin'){
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
