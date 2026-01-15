'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Lock, Unlock } from 'lucide-react';

// Mock data
const vaults = [
    { id: '1', name: 'Vacances 2025', amount: 1500, target: 3000, unlockDate: '2025-07-01', isLocked: true, flexibility: 10 },
    { id: '2', name: 'Fonds d\'urgence', amount: 1200, target: 2000, unlockDate: '2025-12-31', isLocked: true, flexibility: 10 },
    { id: '3', name: 'Nouvelle voiture', amount: 750, target: 5000, unlockDate: '2026-06-01', isLocked: true, flexibility: 5 },
    { id: '4', name: 'Cadeau anniversaire', amount: 200, target: 200, unlockDate: '2025-01-01', isLocked: false, flexibility: 10 },
];

export default function VaultsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVaults = vaults.filter(vault =>
        vault.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Mes Coffres
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Gérez vos coffres d&apos;épargne
                    </p>
                </div>
                <Link href="/dashboard/vaults/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau coffre
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Rechercher un coffre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Vaults Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVaults.map((vault) => {
                    const progress = Math.round((vault.amount / vault.target) * 100);
                    const daysUntilUnlock = Math.max(0, Math.ceil(
                        (new Date(vault.unlockDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    ));

                    return (
                        <Link key={vault.id} href={`/dashboard/vaults/${vault.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg">{vault.name}</CardTitle>
                                    <div className={`p-2 rounded-full ${vault.isLocked ? 'bg-orange-100' : 'bg-green-100'}`}>
                                        {vault.isLocked ? (
                                            <Lock className="h-4 w-4 text-orange-600" />
                                        ) : (
                                            <Unlock className="h-4 w-4 text-green-600" />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-3xl font-bold text-emerald-600">
                                                {vault.amount.toLocaleString('fr-FR')} €
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                sur {vault.target.toLocaleString('fr-FR')} €
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">Progression</span>
                                                <span className="font-medium">{progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                                    style={{ width: `${Math.min(100, progress)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                {vault.isLocked ? `${daysUntilUnlock}j restants` : 'Débloqué'}
                                            </span>
                                            <span className="text-gray-500">
                                                {vault.flexibility}% flexibilité
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {filteredVaults.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Aucun coffre trouvé</p>
                </div>
            )}
        </div>
    );
}
