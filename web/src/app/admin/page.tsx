'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SavingsAreaChart, UsersBarChart, DistributionPieChart } from '@/components/charts';
import {
    Users,
    Wallet,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    Activity,
} from 'lucide-react';

// Mock data
const stats = {
    totalUsers: 1234,
    activeUsers: 987,
    premiumUsers: 156,
    totalVaults: 3456,
    activeVaults: 2890,
    totalSaved: 1234567.89,
    totalWithdrawn: 45678.90,
    avgDiscipline: 68.5,
};

const monthlyData = [
    { month: 'Jan', amount: 45000, users: 120 },
    { month: 'Fév', amount: 52000, users: 145 },
    { month: 'Mar', amount: 61000, users: 168 },
    { month: 'Avr', amount: 72000, users: 195 },
    { month: 'Mai', amount: 85000, users: 234 },
    { month: 'Juin', amount: 98000, users: 278 },
];

const distributionData = [
    { name: 'Vacances', value: 350000 },
    { name: 'Épargne', value: 420000 },
    { name: 'Projets', value: 280000 },
    { name: 'Retraite', value: 180000 },
];

const recentActivity = [
    { id: '1', type: 'signup', user: 'Jean D.', time: 'Il y a 5 min' },
    { id: '2', type: 'deposit', user: 'Marie L.', amount: 200, time: 'Il y a 15 min' },
    { id: '3', type: 'withdrawal', user: 'Paul M.', amount: 50, time: 'Il y a 30 min' },
    { id: '4', type: 'vault_created', user: 'Sophie B.', time: 'Il y a 1h' },
    { id: '5', type: 'deposit', user: 'Lucas R.', amount: 500, time: 'Il y a 2h' },
];

const topSavers = [
    { id: '1', name: 'Marie Lambert', email: 'marie@example.com', amount: 12500 },
    { id: '2', name: 'Jean Dupont', email: 'jean@example.com', amount: 9800 },
    { id: '3', name: 'Sophie Martin', email: 'sophie@example.com', amount: 8200 },
    { id: '4', name: 'Paul Durand', email: 'paul@example.com', amount: 7500 },
    { id: '5', name: 'Emma Bernard', email: 'emma@example.com', amount: 6800 },
];

export default function AdminDashboard() {
    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Tableau de bord Admin
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Vue d&apos;ensemble de la plateforme
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total utilisateurs</p>
                                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    +12% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Coffres actifs</p>
                                <p className="text-2xl font-bold">{stats.activeVaults.toLocaleString()}</p>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    +8% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                                <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Épargne totale</p>
                                <p className="text-2xl font-bold">{(stats.totalSaved / 1000).toFixed(0)}k €</p>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    +15% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Score moyen</p>
                                <p className="text-2xl font-bold">{stats.avgDiscipline}%</p>
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="h-3 w-3" />
                                    +3% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution de l&apos;épargne</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SavingsAreaChart data={monthlyData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Nouveaux utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UsersBarChart data={monthlyData} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition des coffres</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DistributionPieChart data={distributionData} />
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Activité récente
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${activity.type === 'signup' ? 'bg-blue-500' :
                                                activity.type === 'deposit' ? 'bg-green-500' :
                                                    activity.type === 'withdrawal' ? 'bg-orange-500' :
                                                        'bg-purple-500'
                                            }`} />
                                        <div>
                                            <p className="font-medium text-sm text-gray-900 dark:text-white">{activity.user}</p>
                                            <p className="text-xs text-gray-500">
                                                {activity.type === 'signup' && 'Inscription'}
                                                {activity.type === 'deposit' && `+${activity.amount} €`}
                                                {activity.type === 'withdrawal' && `-${activity.amount} €`}
                                                {activity.type === 'vault_created' && 'Nouveau coffre'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Savers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top épargnants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topSavers.map((saver, index) => (
                                <div key={saver.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                                            index === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' :
                                                index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400' :
                                                    'bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-500'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate text-sm">{saver.name}</p>
                                    </div>
                                    <p className="font-medium text-emerald-600 dark:text-emerald-400 text-sm">
                                        {saver.amount.toLocaleString()} €
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
