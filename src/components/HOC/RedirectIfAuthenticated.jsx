"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectIfAuthenticated({ children }) {
    const router = useRouter();

    useEffect(() => {
        const userRaw = localStorage.getItem("loggedInUser");
        const user = JSON.parse(userRaw)
        if (user) {
            if (user.role === 'user') {
                router.push('/userDashboard')
            }
        }
    }, []);

    return <>{children}</>;
}
