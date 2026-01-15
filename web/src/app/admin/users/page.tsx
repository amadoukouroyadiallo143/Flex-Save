'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    MoreVertical,
    UserCheck,
    UserX,
    Shield,
    Filter,
} from 'lucide-react';

// Mock data
const users = [
    { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'user', isActive: true, isPremium: false, score: 72, vaults: 3, saved: 2500, createdAt: '2025-01-01' },
    { id: '2', name: 'Marie Lambert', email: 'marie@example.com', role: 'user', isActive: true, isPremium: true, score: 85, vaults: 5, saved: 12500, createdAt: '2024-12-15' },
    { id: '3', name: 'Admin Principal', email: 'admin@flexsave.com', role: 'admin', isActive: true, isPremium: true, score: 100, vaults: 0, saved: 0, createdAt: '2024-01-01' },
    { id: '4', name: 'Paul Martin', email: 'paul@example.com', role: 'user', isActive: false, isPremium: false, score: 45, vaults: 1, saved: 500, createdAt: '2025-01-10' },
    { id: '5', name: 'Sophie Bernard', email: 'sophie@example.com', role: 'user', isActive: true, isPremium: false, score: 68, vaults: 2, saved: 3200, createdAt: '2024-11-20' },
];

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'premium' | 'admin'>('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        switch (filter) {
            case 'active': return matchesSearch && user.isActive;
            case 'inactive': return matchesSearch && !user.isActive;
            case 'premium': return matchesSearch && user.isPremium;
            case 'admin': return matchesSearch && user.role === 'admin';
            default: return matchesSearch;
        }
    });

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Utilisateurs
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {users.length} utilisateurs inscrits
                    </p>
                </div>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher par nom ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { value: 'all', label: 'Tous' },
                                { value: 'active', label: 'Actifs' },
                                { value: 'inactive', label: 'Inactifs' },
                                { value: 'premium', label: 'Premium' },
                                { value: 'admin', label: 'Admins' },
                            ].map((f) => (
                                <Button
                                    key={f.value}
                                    variant={filter === f.value ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter(f.value as any)}
                                >
                                    {f.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Utilisateur</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Rôle</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Score</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Épargne</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Inscription</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <Badge className="bg-purple-100 text-purple-700">
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    Admin
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Utilisateur</Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.isActive ? (
                                                    <Badge className="bg-green-100 text-green-700">Actif</Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-700">Inactif</Badge>
                                                )}
                                                {user.isPremium && (
                                                    <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${user.score >= 70 ? 'bg-green-500' :
                                                                user.score >= 50 ? 'bg-yellow-500' :
                                                                    'bg-red-500'
                                                            }`}
                                                        style={{ width: `${user.score}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-600">{user.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium">{user.saved.toLocaleString()} €</p>
                                            <p className="text-sm text-gray-500">{user.vaults} coffres</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.isActive ? (
                                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                        <UserX className="h-4 w-4" />
                                                    </Button>
                                                ) : (
                                                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                                        <UserCheck className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Aucun utilisateur trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
