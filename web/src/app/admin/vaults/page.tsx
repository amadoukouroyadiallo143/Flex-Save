'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Lock, Unlock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Mock data
const vaults = [
    { id: '1', user: 'jean@example.com', name: 'Vacances 2025', amount: 1500, target: 3000, unlockDate: '2025-07-01', isActive: true },
    { id: '2', user: 'marie@example.com', name: 'Maison', amount: 45000, target: 100000, unlockDate: '2027-01-01', isActive: true },
    { id: '3', user: 'paul@example.com', name: 'Études enfants', amount: 12500, target: 50000, unlockDate: '2030-09-01', isActive: true },
    { id: '4', user: 'sophie@example.com', name: 'Retraite', amount: 8200, target: 30000, unlockDate: '2040-01-01', isActive: true },
    { id: '5', user: 'lucas@example.com', name: 'Voyage', amount: 500, target: 2000, unlockDate: '2025-03-15', isActive: false },
];

export default function AdminVaultsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVaults = vaults.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = vaults.reduce((sum, v) => sum + v.amount, 0);
    const activeVaults = vaults.filter(v => v.isActive).length;

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Coffres
                </h1>
                <p className="text-gray-600 mt-1">
                    {vaults.length} coffres • {totalAmount.toLocaleString()} € épargné
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{vaults.length}</p>
                        <p className="text-sm text-gray-500">Total coffres</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-600">{activeVaults}</p>
                        <p className="text-sm text-gray-500">Actifs</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{(totalAmount / 1000).toFixed(0)}k €</p>
                        <p className="text-sm text-gray-500">Épargne totale</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600">
                            {(totalAmount / vaults.length).toFixed(0)} €
                        </p>
                        <p className="text-sm text-gray-500">Moyenne/coffre</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Rechercher par nom de coffre ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Vaults Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Coffre</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Utilisateur</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Montant</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Progression</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Déblocage</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredVaults.map((vault) => {
                                    const progress = Math.round((vault.amount / vault.target) * 100);
                                    const isLocked = new Date(vault.unlockDate) > new Date();

                                    return (
                                        <tr key={vault.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {isLocked ? (
                                                        <Lock className="h-4 w-4 text-orange-500" />
                                                    ) : (
                                                        <Unlock className="h-4 w-4 text-green-500" />
                                                    )}
                                                    <span className="font-medium text-gray-900">{vault.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{vault.user}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{vault.amount.toLocaleString()} €</p>
                                                <p className="text-xs text-gray-500">sur {vault.target.toLocaleString()} €</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full"
                                                            style={{ width: `${Math.min(100, progress)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(vault.unlockDate).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {vault.isActive ? (
                                                    <Badge className="bg-green-100 text-green-700">Actif</Badge>
                                                ) : (
                                                    <Badge className="bg-gray-100 text-gray-700">Fermé</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredVaults.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Aucun coffre trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
