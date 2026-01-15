"""
Email templates for FlexSave notifications.
"""

from typing import Optional


def get_welcome_email(user_name: str) -> tuple[str, str]:
    """Welcome email template."""
    subject = "Bienvenue sur FlexSave ! 🎉"
    
    body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #10B981, #059669); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }}
        .header h1 {{ color: white; margin: 0; font-size: 28px; }}
        .content {{ background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; }}
        .content h2 {{ color: #1f2937; }}
        .content p {{ color: #6b7280; line-height: 1.6; }}
        .button {{ display: inline-block; background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }}
        .footer {{ text-align: center; padding: 20px; color: #9ca3af; font-size: 14px; }}
        ul {{ color: #6b7280; }}
        li {{ margin: 10px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 FlexSave</h1>
        </div>
        <div class="content">
            <h2>Bienvenue {user_name} !</h2>
            <p>Nous sommes ravis de vous accueillir sur FlexSave, la plateforme d'épargne qui vous permet de garder le contrôle.</p>
            
            <p><strong>Voici comment ça fonctionne :</strong></p>
            <ul>
                <li>📦 Créez des coffres d'épargne pour vos objectifs</li>
                <li>📅 Choisissez une date de déblocage</li>
                <li>🔓 Gardez 10% de flexibilité pour les imprévus</li>
                <li>📈 Suivez votre score de discipline</li>
            </ul>
            
            <p style="text-align: center; margin-top: 30px;">
                <a href="https://flexsave.com/dashboard" class="button">Créer mon premier coffre</a>
            </p>
        </div>
        <div class="footer">
            <p>© 2025 FlexSave. Tous droits réservés.</p>
            <p>Vous recevez cet email car vous avez créé un compte sur FlexSave.</p>
        </div>
    </div>
</body>
</html>
"""
    return subject, body


def get_deposit_email(user_name: str, vault_name: str, amount: float, new_total: float) -> tuple[str, str]:
    """Deposit confirmation email."""
    subject = f"Dépôt confirmé : {amount:.2f} € 💰"
    
    body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #10B981; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }}
        .header h1 {{ color: white; margin: 0; font-size: 24px; }}
        .content {{ background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; }}
        .amount {{ font-size: 48px; font-weight: bold; color: #10B981; text-align: center; margin: 20px 0; }}
        .info {{ background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        .footer {{ text-align: center; padding: 20px; color: #9ca3af; font-size: 14px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Dépôt effectué</h1>
        </div>
        <div class="content">
            <p>Bonjour {user_name},</p>
            <p class="amount">+{amount:.2f} €</p>
            <div class="info">
                <p><strong>Coffre :</strong> {vault_name}</p>
                <p><strong>Nouveau solde :</strong> {new_total:.2f} €</p>
            </div>
            <p>Bravo ! Chaque dépôt vous rapproche de vos objectifs. 🎯</p>
        </div>
        <div class="footer">
            <p>© 2025 FlexSave</p>
        </div>
    </div>
</body>
</html>
"""
    return subject, body


def get_withdrawal_email(
    user_name: str,
    vault_name: str,
    amount: float,
    fee: float,
    is_early: bool
) -> tuple[str, str]:
    """Withdrawal confirmation email."""
    net_amount = amount - fee
    subject = f"Retrait confirmé : {net_amount:.2f} €"
    
    fee_info = ""
    if is_early and fee > 0:
        fee_info = f"""
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 0; color: #92400e;">
                    ⚠️ Retrait anticipé : frais de {fee:.2f} € appliqués
                </p>
            </div>
        """
    
    body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #3b82f6; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }}
        .header h1 {{ color: white; margin: 0; font-size: 24px; }}
        .content {{ background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; }}
        .amount {{ font-size: 48px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }}
        .info {{ background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        .footer {{ text-align: center; padding: 20px; color: #9ca3af; font-size: 14px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💸 Retrait effectué</h1>
        </div>
        <div class="content">
            <p>Bonjour {user_name},</p>
            <p class="amount">-{net_amount:.2f} €</p>
            <div class="info">
                <p><strong>Coffre :</strong> {vault_name}</p>
                <p><strong>Montant retiré :</strong> {amount:.2f} €</p>
                {f"<p><strong>Frais :</strong> {fee:.2f} €</p>" if fee > 0 else ""}
                <p><strong>Montant net :</strong> {net_amount:.2f} €</p>
            </div>
            {fee_info}
        </div>
        <div class="footer">
            <p>© 2025 FlexSave</p>
        </div>
    </div>
</body>
</html>
"""
    return subject, body


def get_vault_unlocked_email(user_name: str, vault_name: str, amount: float) -> tuple[str, str]:
    """Vault unlocked email."""
    subject = f"🎉 Coffre débloqué : {vault_name}"
    
    body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #8b5cf6, #6366f1); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }}
        .header h1 {{ color: white; margin: 0; font-size: 28px; }}
        .content {{ background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; text-align: center; }}
        .amount {{ font-size: 48px; font-weight: bold; color: #10B981; margin: 20px 0; }}
        .button {{ display: inline-block; background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }}
        .footer {{ text-align: center; padding: 20px; color: #9ca3af; font-size: 14px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Félicitations !</h1>
        </div>
        <div class="content">
            <p style="font-size: 18px; color: #374151;">Bonjour {user_name},</p>
            <p style="font-size: 20px; color: #6b7280;">Votre coffre <strong>{vault_name}</strong> est maintenant débloqué !</p>
            <p class="amount">{amount:.2f} €</p>
            <p style="color: #6b7280;">disponibles sans frais</p>
            <p style="margin-top: 30px;">
                <a href="https://flexsave.com/dashboard/vaults" class="button">Voir mon coffre</a>
            </p>
        </div>
        <div class="footer">
            <p>© 2025 FlexSave</p>
        </div>
    </div>
</body>
</html>
"""
    return subject, body
