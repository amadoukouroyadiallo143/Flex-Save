import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Politique de Confidentialité
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        Dernière mise à jour : Janvier 2025
                    </p>

                    <h2>1. Collecte des données</h2>
                    <p>
                        Nous collectons les informations suivantes :
                    </p>
                    <ul>
                        <li>Informations d&apos;inscription (email, nom)</li>
                        <li>Données d&apos;utilisation (transactions, coffres créés)</li>
                        <li>Informations techniques (appareil, navigateur)</li>
                    </ul>

                    <h2>2. Utilisation des données</h2>
                    <p>
                        Vos données sont utilisées pour :
                    </p>
                    <ul>
                        <li>Fournir et améliorer nos services</li>
                        <li>Envoyer des notifications importantes</li>
                        <li>Calculer votre score de discipline</li>
                        <li>Assurer la sécurité de votre compte</li>
                    </ul>

                    <h2>3. Protection des données</h2>
                    <p>
                        Nous utilisons des mesures de sécurité avancées pour protéger vos données :
                    </p>
                    <ul>
                        <li>Chiffrement SSL/TLS pour toutes les communications</li>
                        <li>Authentification sécurisée via Firebase</li>
                        <li>Stockage sécurisé sur Google Cloud Platform</li>
                    </ul>

                    <h2>4. Partage des données</h2>
                    <p>
                        Nous ne vendons jamais vos données personnelles. Nous pouvons partager
                        des données avec :
                    </p>
                    <ul>
                        <li>Firebase (authentification)</li>
                        <li>Stripe (paiements, si applicable)</li>
                        <li>Autorités légales si requis par la loi</li>
                    </ul>

                    <h2>5. Vos droits</h2>
                    <p>
                        Conformément au RGPD, vous avez le droit de :
                    </p>
                    <ul>
                        <li>Accéder à vos données</li>
                        <li>Rectifier vos données</li>
                        <li>Supprimer vos données</li>
                        <li>Exporter vos données</li>
                    </ul>

                    <h2>6. Cookies</h2>
                    <p>
                        Nous utilisons des cookies essentiels pour le fonctionnement du service
                        et des cookies analytiques (avec votre consentement) pour améliorer
                        l&apos;expérience utilisateur.
                    </p>

                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question concernant vos données, contactez notre DPO à
                        <a href="mailto:privacy@flexsave.com" className="text-emerald-600"> privacy@flexsave.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
