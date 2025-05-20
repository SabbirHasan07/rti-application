'use client';
import AuthGuard from "@/components/AuthGuard";

export default function AuthLayout({ children }) {

    return <AuthGuard requireAuth={false}>
        {children}
    </AuthGuard>;
}
