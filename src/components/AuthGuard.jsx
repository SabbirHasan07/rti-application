'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children, requireAuth = true, redirectTo }) {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.replace(redirectTo || '/login');
      } else if (!requireAuth && user) {
        if (user.role === "ADMIN") {
          router.replace(redirectTo || '/adminDashboard');
        } else {
          router.replace(redirectTo || '/userDashboard');
        }
      }
    }
  }, [loading, user, requireAuth, redirectTo, router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <div className="w-10 h-10 border-4 border-[#008037] border-dashed rounded-full animate-spin"></div>
  </div>;
  if ((requireAuth && !user) || (!requireAuth && user)) return null;

  return <>{children}</>;
}
