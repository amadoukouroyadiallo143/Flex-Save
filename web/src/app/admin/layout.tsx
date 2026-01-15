'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Wallet,
    BarChart3,
    Settings,
    ArrowLeft,
    Shield,
} from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Utilisateurs', icon: Users },
    { href: '/admin/vaults', label: 'Coffres', icon: Wallet },
    { href: '/admin/statistics', label: 'Statistiques', icon: BarChart3 },
    { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800">
                {/* Logo */}
                <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-white">FlexSave</span>
                        <span className="block text-xs text-purple-400">Admin</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                                    isActive
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to App */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Retour à l&apos;app</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 min-h-screen bg-gray-100">
                {children}
            </main>
        </div>
    );
}
