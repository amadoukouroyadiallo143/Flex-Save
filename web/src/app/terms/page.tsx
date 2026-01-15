import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
                    Conditions Générales d&apos;Utilisation
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        Dernière mise à jour : Janvier 2025
                    </p>

                    <h2>1. Acceptation des conditions</h2>
                    <p>
                        En accédant à FlexSave ou en l&apos;utilisant, vous acceptez d&apos;être lié par ces
                        conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez
                        ne pas utiliser notre service.
                    </p>

                    <h2>2. Description du service</h2>
                    <p>
                        FlexSave est une application d&apos;épargne qui vous permet de créer des
                        &quot;coffres&quot; d&apos;épargne avec une date de déblocage tout en conservant
                        une flexibilité de 10% pour les retraits anticipés.
                    </p>

                    <h2>3. Inscription et compte</h2>
                    <p>
                        Pour utiliser FlexSave, vous devez créer un compte avec des informations
                        exactes et à jour. Vous êtes responsable de la sécurité de votre compte
                        et de toutes les activités qui s&apos;y déroulent.
                    </p>

                    <h2>4. Frais et tarification</h2>
                    <ul>
                        <li>Les dépôts sont gratuits</li>
                        <li>Les retraits après la date de déblocage sont gratuits</li>
                        <li>Les retraits anticipés (dans la limite de 10%) sont soumis à des frais de 1%</li>
                        <li>L&apos;abonnement Premium réduit ces frais à 0.5%</li>
                    </ul>

                    <h2>5. Limitation de responsabilité</h2>
                    <p>
                        FlexSave n&apos;est pas une banque et ne fournit pas de garantie sur les
                        dépôts. Les utilisateurs sont responsables de leurs décisions financières.
                    </p>

                    <h2>6. Modification des conditions</h2>
                    <p>
                        Nous nous réservons le droit de modifier ces conditions à tout moment.
                        Les utilisateurs seront informés des changements importants.
                    </p>

                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question concernant ces conditions, contactez-nous à
                        <a href="mailto:legal@flexsave.com" className="text-emerald-600"> legal@flexsave.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
