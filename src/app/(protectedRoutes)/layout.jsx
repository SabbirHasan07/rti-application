'use client';

import AuthGuard from "@/components/AuthGuard";

export default function ProtectedLayout({ children }) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      {children}
    </AuthGuard>
  );
}
