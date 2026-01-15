import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';
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
        <html lang="fr" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <AuthProvider>
                        {children}
                        <Toaster />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
