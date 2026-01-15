'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Types
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    disciplineScore: number;
    isPremium: boolean;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setState({ user: null, isLoading: false, isAuthenticated: false });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setState({
                    user: {
                        id: userData.id,
                        email: userData.email,
                        fullName: userData.full_name,
                        role: userData.role || 'user',
                        disciplineScore: userData.discipline_score,
                        isPremium: userData.is_premium,
                    },
                    isLoading: false,
                    isAuthenticated: true,
                });
            } else {
                localStorage.removeItem('token');
                setState({ user: null, isLoading: false, isAuthenticated: false });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setState({ user: null, isLoading: false, isAuthenticated: false });
        }
    };

    const login = async (email: string, password: string) => {
        // TODO: Implement Firebase auth
        // For now, mock login
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user for demo
            const mockUser: User = {
                id: '1',
                email,
                fullName: email.split('@')[0],
                role: email.includes('admin') ? 'admin' : 'user',
                disciplineScore: 72,
                isPremium: false,
            };

            localStorage.setItem('token', 'mock-token-' + Date.now());

            setState({
                user: mockUser,
                isLoading: false,
                isAuthenticated: true,
            });
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    };

    const register = async (email: string, password: string, fullName: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    full_name: fullName,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Registration failed');
            }

            // After registration, login
            await login(email, password);
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
        });
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
