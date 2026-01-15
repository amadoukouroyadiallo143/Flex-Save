import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FlexSave - Épargne intelligente',
    description: 'Bloquez votre argent avec 10% de flexibilité pour les imprévus',
    keywords: ['épargne', 'savings', 'fintech', 'finance'],
    authors: [{ name: 'Diallo Amadou' }],
    openGraph: {
        title: 'FlexSave - Épargne intelligente',
        description: 'Bloquez votre argent avec 10% de flexibilité pour les imprévus',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
