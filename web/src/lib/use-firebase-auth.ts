'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

interface UseFirebaseAuth {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getIdToken: () => Promise<string | null>;
}

export function useFirebaseAuth(): UseFirebaseAuth {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        if (!auth) throw new Error('Firebase not initialized');
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            const message = getErrorMessage(err.code);
            setError(message);
            throw new Error(message);
        }
    }, []);

    const signUp = useCallback(async (email: string, password: string, displayName: string) => {
        if (!auth) throw new Error('Firebase not initialized');
        setError(null);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (result.user) {
                await updateProfile(result.user, { displayName });
            }
        } catch (err: any) {
            const message = getErrorMessage(err.code);
            setError(message);
            throw new Error(message);
        }
    }, []);

    const logout = useCallback(async () => {
        if (!auth) return;
        setError(null);
        try {
            await signOut(auth);
            localStorage.removeItem('token');
        } catch (err: any) {
            setError('Erreur lors de la déconnexion');
        }
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        if (!auth) throw new Error('Firebase not initialized');
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err: any) {
            const message = getErrorMessage(err.code);
            setError(message);
            throw new Error(message);
        }
    }, []);

    const getIdToken = useCallback(async (): Promise<string | null> => {
        if (!auth?.currentUser) return null;
        return auth.currentUser.getIdToken();
    }, []);

    return {
        user,
        loading,
        error,
        signIn,
        signUp,
        logout,
        resetPassword,
        getIdToken,
    };
}

function getErrorMessage(code: string): string {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Cet email est déjà utilisé';
        case 'auth/invalid-email':
            return 'Email invalide';
        case 'auth/operation-not-allowed':
            return 'Opération non autorisée';
        case 'auth/weak-password':
            return 'Le mot de passe doit contenir au moins 6 caractères';
        case 'auth/user-disabled':
            return 'Ce compte a été désactivé';
        case 'auth/user-not-found':
            return 'Aucun compte trouvé avec cet email';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        case 'auth/too-many-requests':
            return 'Trop de tentatives, réessayez plus tard';
        case 'auth/invalid-credential':
            return 'Email ou mot de passe incorrect';
        default:
            return 'Une erreur est survenue';
    }
}
