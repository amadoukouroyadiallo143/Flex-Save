'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebaseAuth } from '@/lib/use-firebase-auth';

export default function RegisterPage() {
    const router = useRouter();
    const { signUp, loading: authLoading, error: authError } = useFirebaseAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!acceptTerms) {
            setError('Veuillez accepter les conditions d\'utilisation');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signUp(email, password, fullName);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">💰</span>
                    </div>
                    <CardTitle className="text-2xl">Créer un compte</CardTitle>
                    <CardDescription>
                        Commencez à épargner intelligemment
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {(error || authError) && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                {error || authError}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Jean Dupont"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimum 6 caractères"
                                minLength={6}
                                required
                            />
                        </div>
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                                J&apos;accepte les{' '}
                                <Link href="/terms" className="text-emerald-600 hover:underline">
                                    conditions d&apos;utilisation
                                </Link>{' '}
                                et la{' '}
                                <Link href="/privacy" className="text-emerald-600 hover:underline">
                                    politique de confidentialité
                                </Link>
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || authLoading || !acceptTerms}
                        >
                            {isLoading ? 'Création...' : 'Créer mon compte'}
                        </Button>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Déjà un compte ?{' '}
                            <Link href="/login" className="text-emerald-600 hover:underline font-medium">
                                Se connecter
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
