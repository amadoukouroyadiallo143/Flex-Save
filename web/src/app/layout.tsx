import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FlexSave - Épargne Intelligente',
    description: 'Bloquez votre argent, gardez jusqu\'à 10% de flexibilité. L\'épargne intelligente pour tous.',
    keywords: ['épargne', 'savings', 'fintech', 'coffre', 'flexibilité'],
    authors: [{ name: 'Diallo Amadou' }],
    openGraph: {
        title: 'FlexSave - Épargne Intelligente',
        description: 'L\'épargne intelligente avec liberté contrôlée',
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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
