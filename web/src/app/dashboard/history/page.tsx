'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Mock data
const transactions = [
    { id: '1', type: 'deposit', vault: 'Vacances 2025', amount: 200, date: '2025-01-15', status: 'completed' },
    { id: '2', type: 'withdrawal', vault: 'Fonds d\'urgence', amount: 50, fee: 0.5, date: '2025-01-14', status: 'completed', isEarly: true },
    { id: '3', type: 'deposit', vault: 'Nouvelle voiture', amount: 150, date: '2025-01-12', status: 'completed' },
    { id: '4', type: 'deposit', vault: 'Vacances 2025', amount: 300, date: '2025-01-10', status: 'completed' },
    { id: '5', type: 'withdrawal', vault: 'Vacances 2025', amount: 100, date: '2025-01-08', status: 'completed', isEarly: false },
    { id: '6', type: 'vault_created', vault: 'Nouvelle voiture', date: '2025-01-05', status: 'completed' },
    { id: '7', type: 'deposit', vault: 'Fonds d\'urgence', amount: 500, date: '2025-01-01', status: 'completed' },
];

export default function HistoryPage() {
    const [filter, setFilter] = useState<'all' | 'deposits' | 'withdrawals'>('all');

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'deposits') return t.type === 'deposit';
        if (filter === 'withdrawals') return t.type === 'withdrawal';
        return true;
    });

    const totalDeposits = transactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalWithdrawals = transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Historique
                </h1>
                <p className="text-gray-600 mt-1">
                    Toutes vos transactions
                </p>
            </div>

            {/* Summary */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <ArrowDownLeft className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total déposé</p>
                            <p className="text-2xl font-bold text-green-600">
                                +{totalDeposits.toLocaleString()} €
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <ArrowUpRight className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total retiré</p>
                            <p className="text-2xl font-bold text-red-600">
                                -{totalWithdrawals.toLocaleString()} €
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
                {[
                    { value: 'all', label: 'Tout' },
                    { value: 'deposits', label: 'Dépôts' },
                    { value: 'withdrawals', label: 'Retraits' },
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

            {/* Transactions */}
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {filteredTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${tx.type === 'deposit' ? 'bg-green-100' :
                                            tx.type === 'withdrawal' ? 'bg-red-100' :
                                                'bg-purple-100'
                                        }`}>
                                        {tx.type === 'deposit' ? (
                                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                                        ) : tx.type === 'withdrawal' ? (
                                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                                        ) : (
                                            <Filter className="h-5 w-5 text-purple-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {tx.type === 'deposit' && 'Dépôt'}
                                            {tx.type === 'withdrawal' && 'Retrait'}
                                            {tx.type === 'vault_created' && 'Coffre créé'}
                                        </p>
                                        <p className="text-sm text-gray-500">{tx.vault}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    {tx.amount && (
                                        <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {tx.type === 'deposit' ? '+' : '-'}{tx.amount} €
                                        </p>
                                    )}
                                    {tx.fee && (
                                        <p className="text-xs text-gray-500">Frais: {tx.fee} €</p>
                                    )}
                                    <div className="flex items-center gap-2 justify-end mt-1">
                                        <span className="text-sm text-gray-500">
                                            {new Date(tx.date).toLocaleDateString('fr-FR')}
                                        </span>
                                        {tx.isEarly && (
                                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                                                Anticipé
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Aucune transaction</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
