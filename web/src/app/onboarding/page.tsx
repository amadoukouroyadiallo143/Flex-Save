'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Wallet, Target, TrendingUp, Bell } from 'lucide-react';

const steps = [
    {
        icon: Wallet,
        title: 'Bienvenue sur FlexSave ! 💰',
        description: 'L\'application d\'épargne qui vous donne le contrôle. Bloquez votre argent avec 10% de flexibilité pour les imprévus.',
        image: '🏦',
    },
    {
        icon: Target,
        title: 'Créez vos coffres',
        description: 'Définissez un objectif, une date de déblocage, et commencez à épargner. Vous pouvez créer autant de coffres que vous voulez.',
        image: '🎯',
    },
    {
        icon: TrendingUp,
        title: 'Gardez de la flexibilité',
        description: 'Besoin urgent ? Retirez jusqu\'à 10% de votre épargne avec seulement 1% de frais. Votre discipline est récompensée !',
        image: '📈',
    },
    {
        icon: Bell,
        title: 'Restez motivé',
        description: 'Recevez des notifications encourageantes et suivez votre score de discipline pour atteindre vos objectifs.',
        image: '🔔',
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Complete onboarding
            localStorage.setItem('onboarding-complete', 'true');
            router.push('/dashboard');
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const skip = () => {
        localStorage.setItem('onboarding-complete', 'true');
        router.push('/dashboard');
    };

    const step = steps[currentStep];
    const StepIcon = step.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                {/* Skip button */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={skip}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                    >
                        Passer
                    </button>
                </div>

                {/* Step content */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8">
                        {step.image}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {step.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mb-8">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                                        ? 'w-8 bg-emerald-500'
                                        : index < currentStep
                                            ? 'bg-emerald-300'
                                            : 'bg-gray-200 dark:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        {currentStep > 0 && (
                            <Button variant="outline" onClick={prevStep} className="flex-1">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Button>
                        )}
                        <Button onClick={nextStep} className="flex-1">
                            {currentStep === steps.length - 1 ? (
                                'Commencer'
                            ) : (
                                <>
                                    Suivant
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
                    © 2025 FlexSave par Diallo Amadou
                </p>
            </div>
        </div>
    );
}
