'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Wallet,
    TrendingUp,
    Target,
    Award,
    Plus,
    ArrowRight,
} from 'lucide-react';

// Mock data - will be replaced with API calls
const stats = {
    totalSaved: 3450.00,
    activeVaults: 3,
    disciplineScore: 72,
    progressToGoal: 68,
};

const recentVaults = [
    { id: '1', name: 'Vacances 2025', amount: 1500, target: 3000, progress: 50 },
    { id: '2', name: 'Fonds d\'urgence', amount: 1200, target: 2000, progress: 60 },
    { id: '3', name: 'Nouvelle voiture', amount: 750, target: 5000, progress: 15 },
];

export default function DashboardPage() {
    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Bonjour ! 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Voici un aperçu de votre épargne
                    </p>
                </div>
                <Link href="/dashboard/vaults/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau coffre
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <Wallet className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Épargne totale</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalSaved.toLocaleString('fr-FR')} €
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Coffres actifs</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.activeVaults}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Award className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Score discipline</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.disciplineScore}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Progression</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.progressToGoal}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Vaults */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Mes coffres</CardTitle>
                    <Link href="/dashboard/vaults">
                        <Button variant="ghost" size="sm">
                            Voir tout
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentVaults.map((vault) => (
                            <Link
                                key={vault.id}
                                href={`/dashboard/vaults/${vault.id}`}
                                className="block"
                            >
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{vault.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {vault.amount.toLocaleString('fr-FR')} € sur {vault.target.toLocaleString('fr-FR')} €
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-emerald-600">
                                                {vault.progress}%
                                            </span>
                                        </div>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${vault.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {recentVaults.length === 0 && (
                        <div className="text-center py-12">
                            <Wallet className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Aucun coffre
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Créez votre premier coffre d&apos;épargne
                            </p>
                            <Link href="/dashboard/vaults/new">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Créer un coffre
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
