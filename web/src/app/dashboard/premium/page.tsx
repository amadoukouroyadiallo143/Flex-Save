'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Shield, Clock, Users } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Frais réduits',
        description: '0.5% au lieu de 1% sur les retraits anticipés',
        free: '1%',
        premium: '0.5%',
    },
    {
        icon: Users,
        title: 'Épargne en groupe',
        description: 'Créez des tontines modernes avec vos proches',
        free: false,
        premium: true,
    },
    {
        icon: Shield,
        title: 'Assurance épargne',
        description: 'Protection de votre épargne jusqu\'à 10 000 €',
        free: false,
        premium: true,
    },
    {
        icon: Clock,
        title: 'Support prioritaire',
        description: 'Réponse en moins de 2h, 7j/7',
        free: '48h',
        premium: '2h',
    },
];

export default function PremiumPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        setIsLoading(true);
        // In production, this would redirect to Stripe Checkout
        // const response = await fetch('/api/create-checkout-session', { method: 'POST' });
        // const { url } = await response.json();
        // window.location.href = url;

        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Redirection vers Stripe... (simulation)');
        setIsLoading(false);
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 mb-4">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Passez à FlexSave Premium
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Débloquez toutes les fonctionnalités et économisez plus avec des frais réduits
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Free Plan */}
                <Card className="relative">
                    <CardHeader>
                        <CardTitle>Gratuit</CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">0€</span>
                            <span className="text-gray-500">/mois</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Coffres illimités</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>10% de flexibilité</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Score de discipline</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <span className="h-5 w-5 flex items-center justify-center">—</span>
                                <span>Épargne en groupe</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <span className="h-5 w-5 flex items-center justify-center">—</span>
                                <span>Support prioritaire</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full mt-6" disabled>
                            Plan actuel
                        </Button>
                    </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="relative border-emerald-500 border-2">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-emerald-500 text-white">Recommandé</Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Crown className="h-5 w-5 text-amber-500" />
                            Premium
                        </CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">4,99€</span>
                            <span className="text-gray-500">/mois</span>
                        </div>
                        <p className="text-sm text-gray-500">ou 49,99€/an (2 mois offerts)</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Tout du plan Gratuit</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span className="font-medium">0.5% frais retrait (au lieu de 1%)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Épargne en groupe (tontine)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Analytics avancés</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-500" />
                                <span>Support prioritaire 24/7</span>
                            </li>
                        </ul>
                        <Button
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-emerald-500"
                            onClick={handleSubscribe}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Chargement...' : 'Passer à Premium'}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Feature Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle>Comparaison détaillée</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-0 last:pb-0">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                                    <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Gratuit</p>
                                        <p className="font-medium">
                                            {typeof feature.free === 'boolean'
                                                ? (feature.free ? '✓' : '—')
                                                : feature.free
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-amber-500 mb-1">Premium</p>
                                        <p className="font-medium text-emerald-600">
                                            {typeof feature.premium === 'boolean'
                                                ? (feature.premium ? '✓' : '—')
                                                : feature.premium
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* FAQ */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Des questions ?{' '}
                    <a href="mailto:support@flexsave.com" className="text-emerald-600 hover:underline">
                        Contactez-nous
                    </a>
                </p>
                <p className="text-sm text-gray-500">
                    Annulez à tout moment. Remboursement sous 14 jours.
                </p>
            </div>
        </div>
    );
}
