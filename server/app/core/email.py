import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

def send_reset_code_email(email: str, code: str, nom_prenom: str = ""):
    """
    Envoyer un email avec le code de réinitialisation
    """
    try:
        # Créer le message
        message = MIMEMultipart("alternative")
        message["Subject"] = "Code de réinitialisation - WestAf E-Commerce"
        message["From"] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL}>"
        message["To"] = email

        # Contenu HTML de l'email
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #f59e0b;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background-color: white;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }}
                .code-box {{
                    background-color: #f3f4f6;
                    border: 2px solid #f59e0b;
                    padding: 20px;
                    text-align: center;
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    margin: 20px 0;
                    border-radius: 5px;
                    color: #1f2937;
                }}
                .footer {{
                    text-align: center;
                    padding: 20px;
                    color: #6b7280;
                    font-size: 12px;
                }}
                .warning {{
                    background-color: #fef3c7;
                    border-left: 4px solid #f59e0b;
                    padding: 10px;
                    margin: 20px 0;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>WestAf E-Commerce</h1>
                </div>
                <div class="content">
                    <h2>Réinitialisation de mot de passe</h2>
                    <p>Bonjour{' ' + nom_prenom if nom_prenom else ''},</p>
                    <p>Vous avez demandé à réinitialiser votre mot de passe. Voici votre code de vérification :</p>
                    
                    <div class="code-box">
                        {code}
                    </div>
                    
                    <p>Ce code est valide pendant <strong>15 minutes</strong>.</p>
                    
                    <div class="warning">
                        <strong>⚠️ Sécurité :</strong> Si vous n'avez pas demandé cette réinitialisation, 
                        ignorez cet email et votre mot de passe restera inchangé.
                    </div>
                    
                    <p>Pour des raisons de sécurité, ne partagez jamais ce code avec qui que ce soit.</p>
                    
                    <p>Cordialement,<br>
                    L'équipe WestAf E-Commerce</p>
                </div>
                <div class="footer">
                    <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                    <p>&copy; 2025 WestAf E-Commerce. Tous droits réservés.</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Ajouter le contenu HTML
        html_part = MIMEText(html_content, "html")
        message.attach(html_part)

        # Connexion au serveur SMTP et envoi
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()  # Activer le cryptage TLS
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        return True
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email : {e}")
        return False
