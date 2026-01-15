import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">💰</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">FlexSave</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Fonctionnalités</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">Comment ça marche</a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Tarifs</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-gray-600 hover:text-gray-900 transition hidden sm:block">
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
                        >
                            Commencer
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
                            <span className="animate-pulse">🚀</span>
                            <span>L&apos;épargne intelligente est arrivée</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Épargnez avec{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                                discipline
                            </span>
                            <br />
                            gardez votre{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                liberté
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Bloquez votre argent jusqu&apos;à une date tout en conservant
                            jusqu&apos;à <strong className="text-emerald-600">10% de flexibilité</strong> pour les imprévus.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-semibold 
                         hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-200/50 
                         flex items-center justify-center gap-2"
                            >
                                <span>Créer un compte gratuit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold 
                         hover:bg-gray-50 transition-all border border-gray-200 shadow-lg
                         flex items-center justify-center gap-2"
                            >
                                <span>Voir comment ça marche</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">10%</div>
                                <div className="text-gray-500 text-sm">de flexibilité</div>
                            </div>
                            <div className="w-px bg-gray-200 hidden sm:block"></div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">1%</div>
                                <div className="text-gray-500 text-sm">frais retrait anticipé</div>
                            </div>
                            <div className="w-px bg-gray-200 hidden sm:block"></div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">0€</div>
                                <div className="text-gray-500 text-sm">frais de base</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tout ce dont vous avez besoin pour épargner
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            FlexSave combine discipline et liberté pour une épargne efficace
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🏦"
                            title="Coffres Multiples"
                            description="Créez plusieurs coffres pour différents objectifs : vacances, voiture, urgences, projets..."
                            color="emerald"
                        />
                        <FeatureCard
                            icon="🔓"
                            title="10% de Flexibilité"
                            description="Accédez à jusqu'à 10% de votre épargne en cas d'urgence, avec seulement 1% de frais."
                            color="blue"
                        />
                        <FeatureCard
                            icon="📊"
                            title="Score de Discipline"
                            description="Suivez vos progrès et améliorez votre discipline d'épargne au fil du temps."
                            color="purple"
                        />
                        <FeatureCard
                            icon="📅"
                            title="Date de Déblocage"
                            description="Définissez quand votre argent sera disponible. Vous décidez de la durée."
                            color="orange"
                        />
                        <FeatureCard
                            icon="🔔"
                            title="Notifications Smart"
                            description="Recevez des rappels et encouragements pour atteindre vos objectifs."
                            color="pink"
                        />
                        <FeatureCard
                            icon="👥"
                            title="Épargne en Groupe"
                            description="Bientôt : Épargnez ensemble avec vos proches (tontine moderne)."
                            color="cyan"
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            En 3 étapes simples, commencez à épargner intelligemment
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <StepCard
                            number={1}
                            title="Créez un coffre"
                            description="Choisissez un nom, un objectif et une date de déblocage pour votre épargne."
                        />
                        <StepCard
                            number={2}
                            title="Déposez régulièrement"
                            description="Ajoutez de l'argent à votre rythme. Chaque dépôt améliore votre score."
                        />
                        <StepCard
                            number={3}
                            title="Profitez de la flexibilité"
                            description="Besoin urgent ? Retirez jusqu'à 10% sans casser votre épargne."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple et transparent
                        </h2>
                        <p className="text-gray-600">
                            Commencez gratuitement, payez uniquement quand vous utilisez
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Free Plan */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratuit</h3>
                                <div className="text-4xl font-bold text-gray-900">0€<span className="text-lg text-gray-500">/mois</span></div>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <PricingFeature included>Coffres illimités</PricingFeature>
                                <PricingFeature included>10% de flexibilité</PricingFeature>
                                <PricingFeature included>Score de discipline</PricingFeature>
                                <PricingFeature included>1% frais retrait anticipé</PricingFeature>
                                <PricingFeature>Épargne en groupe</PricingFeature>
                                <PricingFeature>Support prioritaire</PricingFeature>
                            </ul>
                            <Link
                                href="/register"
                                className="block w-full py-4 text-center bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition"
                            >
                                Commencer gratuitement
                            </Link>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                Bientôt
                            </div>
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                                <div className="text-4xl font-bold">4,99€<span className="text-lg opacity-80">/mois</span></div>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <PricingFeature included light>Tout du plan Gratuit</PricingFeature>
                                <PricingFeature included light>Épargne en groupe</PricingFeature>
                                <PricingFeature included light>0,5% frais retrait anticipé</PricingFeature>
                                <PricingFeature included light>Analytics avancés</PricingFeature>
                                <PricingFeature included light>Support prioritaire 24/7</PricingFeature>
                                <PricingFeature included light>Multi-devises</PricingFeature>
                            </ul>
                            <button
                                className="block w-full py-4 text-center bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition"
                                disabled
                            >
                                Bientôt disponible
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Prêt à épargner intelligemment ?
                            </h2>
                            <p className="text-white/80 mb-8 max-w-xl mx-auto">
                                Rejoignez FlexSave et commencez à construire votre avenir financier dès aujourd&apos;hui.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-2xl font-semibold hover:bg-gray-100 transition shadow-xl"
                            >
                                <span>Créer un compte gratuit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white text-xl">💰</span>
                                </div>
                                <span className="text-xl font-bold">FlexSave</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                L&apos;épargne intelligente avec liberté contrôlée.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Produit</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#features" className="hover:text-white transition">Fonctionnalités</a></li>
                                <li><a href="#pricing" className="hover:text-white transition">Tarifs</a></li>
                                <li><a href="#" className="hover:text-white transition">Application mobile</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Légal</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Conditions d&apos;utilisation</a></li>
                                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="mailto:contact@flexsave.app" className="hover:text-white transition">contact@flexsave.app</a></li>
                                <li><a href="#" className="hover:text-white transition">Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                        <p>© 2025 FlexSave par Diallo Amadou. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    color = 'emerald',
}: {
    icon: string;
    title: string;
    description: string;
    color?: string;
}) {
    const colorClasses: Record<string, string> = {
        emerald: 'bg-emerald-100 text-emerald-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
        pink: 'bg-pink-100 text-pink-600',
        cyan: 'bg-cyan-100 text-cyan-600',
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className={`w-14 h-14 ${colorClasses[color]} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function StepCard({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-emerald-200">
                {number}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function PricingFeature({
    children,
    included = false,
    light = false,
}: {
    children: React.ReactNode;
    included?: boolean;
    light?: boolean;
}) {
    return (
        <li className={`flex items-center gap-3 ${light ? 'text-white/90' : included ? 'text-gray-900' : 'text-gray-400'}`}>
            {included ? (
                <svg className={`w-5 h-5 ${light ? 'text-white' : 'text-emerald-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )}
            <span>{children}</span>
        </li>
    );
}
