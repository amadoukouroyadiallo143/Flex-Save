'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="text-center">
                <div className="text-6xl mb-4">😵</div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Oups ! Une erreur est survenue
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    Nous sommes désolés, quelque chose s&apos;est mal passé. Veuillez réessayer.
                </p>
                <Button onClick={reset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer
                </Button>
            </div>
        </div>
    );
}
