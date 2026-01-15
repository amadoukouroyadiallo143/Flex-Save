'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Bell, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        console.log('Save profile:', Object.fromEntries(formData));

        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Paramètres
                </h1>
                <p className="text-gray-600 mt-1">
                    Gérez votre compte et vos préférences
                </p>
            </div>

            <div className="space-y-6 max-w-2xl">
                {/* Profile */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profil
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Nom complet</Label>
                                <Input id="fullName" name="fullName" defaultValue="Jean Dupont" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="jean@example.com" disabled />
                                <p className="text-xs text-gray-500">L&apos;email ne peut pas être modifié</p>
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Notifications push</p>
                                <p className="text-sm text-gray-500">Recevoir des rappels et mises à jour</p>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-emerald-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'
                                    }`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Emails marketing</p>
                                <p className="text-sm text-gray-500">Nouveautés et offres spéciales</p>
                            </div>
                            <button
                                className="w-12 h-6 rounded-full bg-gray-300"
                            >
                                <div className="w-5 h-5 bg-white rounded-full shadow translate-x-0.5" />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Sécurité
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Changer le mot de passe</p>
                                <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                            </div>
                            <Button variant="outline">Modifier</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Authentification à deux facteurs</p>
                                <p className="text-sm text-gray-500">Non activée</p>
                            </div>
                            <Button variant="outline">Activer</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium */}
                <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-700">
                            <CreditCard className="h-5 w-5" />
                            FlexSave Premium
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-4">
                            Passez à Premium pour bénéficier de frais réduits (0.5%), d&apos;analytics avancés et de l&apos;épargne en groupe !
                        </p>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            Passer à Premium - 4,99€/mois
                        </Button>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">Zone de danger</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-red-600">Supprimer mon compte</p>
                                <p className="text-sm text-gray-500">Cette action est irréversible</p>
                            </div>
                            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                                Supprimer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
