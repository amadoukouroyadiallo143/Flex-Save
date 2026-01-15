'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft,
    Lock,
    Unlock,
    Plus,
    Minus,
    History,
} from 'lucide-react';

// Mock data
const vault = {
    id: '1',
    name: 'Vacances 2025',
    amount: 1500,
    target: 3000,
    unlockDate: '2025-07-01',
    isLocked: true,
    flexibility: 10,
    flexibilityUsed: 50,
    createdAt: '2025-01-01',
};

const withdrawals = [
    { id: '1', amount: 50, fee: 0.5, date: '2025-01-10', isEarly: true },
];

export default function VaultDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [amount, setAmount] = useState('');

    const progress = Math.round((vault.amount / vault.target) * 100);
    const daysUntilUnlock = Math.max(0, Math.ceil(
        (new Date(vault.unlockDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ));
    const flexibilityAvailable = (vault.amount * vault.flexibility / 100) - vault.flexibilityUsed;

    const handleDeposit = () => {
        console.log('Deposit:', amount);
        setShowDeposit(false);
        setAmount('');
    };

    const handleWithdraw = () => {
        console.log('Withdraw:', amount);
        setShowWithdraw(false);
        setAmount('');
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard/vaults" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Mes coffres
                </Link>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {vault.name}
                </h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Card */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Amount Card */}
                    <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-emerald-100 mb-2">{vault.name}</p>
                                    <p className="text-5xl font-bold">
                                        {vault.amount.toLocaleString('fr-FR')} €
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${vault.isLocked ? 'bg-white/20' : 'bg-white/30'}`}>
                                    {vault.isLocked ? (
                                        <Lock className="h-6 w-6" />
                                    ) : (
                                        <Unlock className="h-6 w-6" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-emerald-100">Progression</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{ width: `${Math.min(100, progress)}%` }}
                                    />
                                </div>
                                <p className="text-sm text-emerald-100">
                                    Objectif: {vault.target.toLocaleString('fr-FR')} €
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowDeposit(true)}>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-4 bg-emerald-100 rounded-xl">
                                    <Plus className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Déposer</h3>
                                    <p className="text-sm text-gray-500">Ajouter de l&apos;argent</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className={`cursor-pointer hover:shadow-lg transition-shadow ${vault.amount <= 0 ? 'opacity-50 pointer-events-none' : ''}`}
                            onClick={() => setShowWithdraw(true)}
                        >
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-4 bg-orange-100 rounded-xl">
                                    <Minus className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Retirer</h3>
                                    <p className="text-sm text-gray-500">
                                        {vault.isLocked ? '1% de frais' : 'Sans frais'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* History */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="h-5 w-5" />
                                Historique des retraits
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {withdrawals.length > 0 ? (
                                <div className="space-y-3">
                                    {withdrawals.map((w) => (
                                        <div key={w.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="font-medium text-gray-900">-{w.amount} €</p>
                                                {w.fee > 0 && (
                                                    <p className="text-sm text-gray-500">Frais: {w.fee} €</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">{w.date}</p>
                                                {w.isEarly && (
                                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                                        Anticipé
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">
                                    Aucun retrait
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Date de déblocage</p>
                                <p className="font-medium">{new Date(vault.unlockDate).toLocaleDateString('fr-FR')}</p>
                                {vault.isLocked && (
                                    <p className="text-sm text-orange-600">{daysUntilUnlock} jours restants</p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Flexibilité disponible</p>
                                <p className="font-medium">{flexibilityAvailable.toFixed(2)} € sur {vault.flexibility}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Créé le</p>
                                <p className="font-medium">{new Date(vault.createdAt).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Deposit Modal */}
            {showDeposit && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Déposer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Montant (€)</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="100"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1" onClick={() => setShowDeposit(false)}>
                                    Annuler
                                </Button>
                                <Button className="flex-1" onClick={handleDeposit}>
                                    Confirmer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdraw && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Retirer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {vault.isLocked && (
                                <div className="p-3 bg-orange-50 text-orange-800 text-sm rounded-lg">
                                    ⚠️ Retrait anticipé : 1% de frais. Max {flexibilityAvailable.toFixed(2)} €
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label>Montant (€)</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max={vault.isLocked ? flexibilityAvailable : vault.amount}
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="50"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1" onClick={() => setShowWithdraw(false)}>
                                    Annuler
                                </Button>
                                <Button className="flex-1" onClick={handleWithdraw}>
                                    Confirmer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
