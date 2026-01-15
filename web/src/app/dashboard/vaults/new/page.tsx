'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewVaultPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [flexibility, setFlexibility] = useState(10);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            target_amount: parseFloat(formData.get('targetAmount') as string),
            unlock_date: formData.get('unlockDate'),
            flexibility_percentage: flexibility,
        };

        try {
            // TODO: Call API
            console.log('Creating vault:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/dashboard/vaults');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard/vaults" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                </Link>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Nouveau Coffre
                </h1>
                <p className="text-gray-600 mt-1">
                    Créez un nouveau coffre d&apos;épargne
                </p>
            </div>

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Détails du coffre</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom du coffre</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ex: Vacances, Voiture, Urgences..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAmount">Objectif (€)</Label>
                            <Input
                                id="targetAmount"
                                name="targetAmount"
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="1000"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="unlockDate">Date de déblocage</Label>
                            <Input
                                id="unlockDate"
                                name="unlockDate"
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label>Flexibilité</Label>
                                <span className="text-sm font-medium text-emerald-600">
                                    {flexibility}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={flexibility}
                                onChange={(e) => setFlexibility(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <p className="text-sm text-gray-500">
                                Pourcentage que vous pouvez retirer avant la date de déblocage (1% de frais)
                            </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm text-blue-800">
                                💡 <strong>Conseil :</strong> Choisissez une flexibilité de 10% pour les imprévus tout en gardant votre discipline d&apos;épargne.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/dashboard/vaults" className="flex-1">
                                <Button type="button" variant="outline" className="w-full">
                                    Annuler
                                </Button>
                            </Link>
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? 'Création...' : 'Créer le coffre'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
