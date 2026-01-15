'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Shield, Database, Globe, Mail } from 'lucide-react';

export default function AdminSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Paramètres Admin
                </h1>
                <p className="text-gray-600 mt-1">
                    Configuration de la plateforme
                </p>
            </div>

            <div className="space-y-6 max-w-3xl">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Paramètres généraux
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Flexibilité max (%)</Label>
                                <Input type="number" defaultValue="10" min="0" max="100" />
                            </div>
                            <div className="space-y-2">
                                <Label>Frais retrait anticipé (%)</Label>
                                <Input type="number" defaultValue="1" min="0" max="10" step="0.1" />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Prix Premium (€/mois)</Label>
                                <Input type="number" defaultValue="4.99" min="0" step="0.01" />
                            </div>
                            <div className="space-y-2">
                                <Label>Frais Premium (%)</Label>
                                <Input type="number" defaultValue="0.5" min="0" max="5" step="0.1" />
                            </div>
                        </div>
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
                                <p className="text-sm text-gray-500">Envoyer des notifications aux utilisateurs</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Emails automatiques</p>
                                <p className="text-sm text-gray-500">Emails de bienvenue et rappels</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                        <div className="space-y-2">
                            <Label>Email support</Label>
                            <Input type="email" defaultValue="support@flexsave.com" />
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
                                <p className="font-medium">Mode maintenance</p>
                                <p className="text-sm text-gray-500">Désactiver l&apos;accès utilisateur</p>
                            </div>
                            <Button variant="outline" size="sm">Activer</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">2FA obligatoire (admins)</p>
                                <p className="text-sm text-gray-500">Exiger la double authentification</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* API & Integrations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            API & Intégrations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Firebase</p>
                                <p className="text-sm text-gray-500">Auth & Firestore</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Connecté</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Stripe</p>
                                <p className="text-sm text-gray-500">Paiements & Treasury</p>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-700">Mode test</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">SendGrid</p>
                                <p className="text-sm text-gray-500">Emails transactionnels</p>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700">Non configuré</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Database */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            Base de données
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-2xl font-bold text-gray-900">1,234</p>
                                <p className="text-sm text-gray-500">Documents users</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-2xl font-bold text-gray-900">3,456</p>
                                <p className="text-sm text-gray-500">Documents vaults</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-2xl font-bold text-gray-900">12,890</p>
                                <p className="text-sm text-gray-500">Documents transactions</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline">Exporter données</Button>
                            <Button variant="outline">Backup maintenant</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
