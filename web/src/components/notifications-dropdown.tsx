'use client';

import { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface Notification {
    id: string;
    title: string;
    body: string;
    type: 'success' | 'info' | 'warning' | 'action';
    isRead: boolean;
    createdAt: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Dépôt effectué 💰',
        body: '100 € ajouté à votre coffre Vacances',
        type: 'success',
        isRead: false,
        createdAt: 'Il y a 5 min',
    },
    {
        id: '2',
        title: 'Objectif bientôt atteint ! 🎯',
        body: 'Plus que 200 € pour atteindre votre objectif',
        type: 'info',
        isRead: false,
        createdAt: 'Il y a 1h',
    },
    {
        id: '3',
        title: 'Coffre débloqué 🎉',
        body: 'Votre coffre "Weekend" est maintenant disponible',
        type: 'success',
        isRead: true,
        createdAt: 'Hier',
    },
];

export function NotificationsDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'warning': return 'bg-orange-500';
            case 'action': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-emerald-600 hover:underline"
                        >
                            Tout marquer comme lu
                        </button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            Aucune notification
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`px-4 py-3 cursor-pointer ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex gap-3 w-full">
                                    <div className={`w-2 h-2 rounded-full ${getTypeColor(notification.type)} mt-2 shrink-0`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {notification.body}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {notification.createdAt}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>

                <DropdownMenuSeparator />
                <div className="p-2">
                    <Button variant="ghost" className="w-full text-sm">
                        Voir toutes les notifications
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
