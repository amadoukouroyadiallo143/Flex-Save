import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Épargnez avec{' '}
                        <span className="text-primary-600">discipline</span>,{' '}
                        gardez votre{' '}
                        <span className="text-accent-600">liberté</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        Bloquez votre argent jusqu&apos;à une date, tout en conservant
                        jusqu&apos;à 10% de flexibilité pour les imprévus.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold 
                       hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
                        >
                            Commencer gratuitement
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold 
                       hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="🏦"
                        title="Coffres Multiples"
                        description="Créez plusieurs coffres pour différents objectifs : vacances, voiture, urgences..."
                    />
                    <FeatureCard
                        icon="🔓"
                        title="10% de Flexibilité"
                        description="Accédez à jusqu'à 10% de votre épargne en cas de besoin, sans tout casser."
                    />
                    <FeatureCard
                        icon="📊"
                        title="Score de Discipline"
                        description="Suivez vos progrès et améliorez votre discipline d'épargne au fil du temps."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
                <p>© 2025 FlexSave par Diallo Amadou. Tous droits réservés.</p>
            </footer>
        </main>
    );
}

function FeatureCard({
    icon,
    title,
    description
}: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-100 hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
