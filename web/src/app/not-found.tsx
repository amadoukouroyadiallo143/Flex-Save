import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="text-center">
                <div className="text-8xl font-bold text-emerald-500 mb-4">404</div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Page introuvable
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button>
                            <Home className="h-4 w-4 mr-2" />
                            Accueil
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                    </Button>
                </div>
            </div>
        </div>
    );
}
