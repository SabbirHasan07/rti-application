'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken).then((user) => {
        setUser(user);
        setLoading(false);
      }).catch(() => {
        logout();
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    console.log(token)
    localStorage.setItem('token', token);
    setToken(token);
    const user = await fetchUser(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

async function fetchUser(token) {
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Invalid token');
  return res.json();
}
