"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
