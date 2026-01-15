'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users,
    Wallet,
    TrendingUp,
    DollarSign,
    Calendar,
} from 'lucide-react';

// Mock data
const monthlyData = [
    { month: 'Jan', users: 120, deposits: 45000, withdrawals: 12000 },
    { month: 'Fév', users: 145, deposits: 52000, withdrawals: 15000 },
    { month: 'Mar', users: 168, deposits: 61000, withdrawals: 18000 },
    { month: 'Avr', users: 195, deposits: 72000, withdrawals: 21000 },
    { month: 'Mai', users: 234, deposits: 85000, withdrawals: 24000 },
    { month: 'Juin', users: 278, deposits: 95000, withdrawals: 28000 },
];

const overview = {
    totalDeposits: 1234567,
    totalWithdrawals: 456789,
    totalFees: 4567.89,
    netFlow: 777778,
    avgVaultSize: 1245,
    avgDaysToUnlock: 87,
    premiumConversion: 12.5,
    churnRate: 3.2,
};

export default function AdminStatisticsPage() {
    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Statistiques
                </h1>
                <p className="text-gray-600 mt-1">
                    Analyses détaillées de la plateforme
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total dépôts</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {(overview.totalDeposits / 1000).toFixed(0)}k €
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <DollarSign className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total retraits</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {(overview.totalWithdrawals / 1000).toFixed(0)}k €
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Wallet className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Frais collectés</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {overview.totalFees.toLocaleString()} €
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Durée moy. coffre</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {overview.avgDaysToUnlock} jours
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Growth */}
                <Card>
                    <CardHeader>
                        <CardTitle>Croissance mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {monthlyData.map((data) => (
                                <div key={data.month} className="flex items-center gap-4">
                                    <span className="w-12 text-sm text-gray-500">{data.month}</span>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${(data.deposits / 100000) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium w-20 text-right">
                                            {(data.deposits / 1000).toFixed(0)}k €
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* User Growth */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nouveaux utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {monthlyData.map((data) => (
                                <div key={data.month} className="flex items-center gap-4">
                                    <span className="w-12 text-sm text-gray-500">{data.month}</span>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${(data.users / 300) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium w-12 text-right">
                                            +{data.users}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Business Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Métriques business</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-3xl font-bold text-emerald-600">
                                {overview.premiumConversion}%
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Conversion Premium</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-3xl font-bold text-blue-600">
                                {overview.avgVaultSize} €
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Taille moyenne coffre</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-3xl font-bold text-purple-600">
                                {(overview.netFlow / 1000).toFixed(0)}k €
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Flux net</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-3xl font-bold text-orange-600">
                                {overview.churnRate}%
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Taux d&apos;attrition</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
