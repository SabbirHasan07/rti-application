'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProtectedLayout({ children }) {
    const router = useRouter();
    
      useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
    
        if (!user) {
          router.push("/login");
        }
      }, []);
  return (
    <>
      {children}
    </>
  );
}
