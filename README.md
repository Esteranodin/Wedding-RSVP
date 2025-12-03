# Application de gestion des invités de mariage

![Bannière application mariage](https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80)

Application web simple pour gérer les confirmations de présence à votre mariage. Permet aux invités de répondre facilement et à vous de suivre les réponses depuis un tableau de bord d'administration.

## ✨ Fonctionnalités

- Formulaire RSVP pour que vos invités confirment leur présence
- Tableau de bord d'administration sécurisé pour suivre les réponses
- Responsive sur tous les appareils (mobile, tablette, desktop)
- Déploiement facile sur Vercel (gratuit)
- Base de données Firebase Firestore (gratuit)

## 🛠️ Technologies utilisées

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) pour le design
- [Firebase](https://firebase.google.com/) pour la base de données et l'authentification
- [Vercel](https://vercel.com/) pour le déploiement

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 18+)
- Compte Firebase
- Compte GitHub (pour le déploiement sur Vercel)

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/wedding-rsvp.git
   cd wedding-rsvp
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Configurer les variables d'environnement**
   - Copiez `.env.example` en `.env.local` et remplissez-le avec vos infos Firebase
   - Ne commitez jamais `.env.local` !
4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
5. **Accéder à l'application**
   - [http://localhost:3000](http://localhost:3000)

### Configuration Firebase

1. Créez un projet sur [console.firebase.google.com](https://console.firebase.google.com/)
2. Activez Firestore Database
3. Activez Authentication (Email/Password)
4. Créez un utilisateur admin dans Authentication
5. Copiez la configuration Firebase dans `.env.local`
6. Définissez vos règles de sécurité Firestore (voir ci-dessous)

## 🔒 Sécurité

- **Variables d'environnement** : toutes les clés sensibles sont dans `.env.local` (jamais commité)
- **Authentification Firebase** : la page admin est protégée par login
- **Règles Firestore** :
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /guests/{document=**} {
        allow read: if request.auth != null;
        allow create: if true;
        allow update, delete: if request.auth != null;
      }
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }
  ```
- **Headers de sécurité** : configurés dans `firebase.json` ou via Vercel
- **Échappement JSX** : React protège automatiquement contre les XSS, même si la règle `react/no-unescaped-entities` est désactivée pour la lisibilité

## 🌐 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez-vous sur [vercel.com](https://vercel.com)
3. Importez votre dépôt GitHub
4. Ajoutez les variables d'environnement de `.env.local` dans les settings Vercel
5. Cliquez sur "Deploy"

## 📁 Structure du projet

```
wedding-rsvp/
  ├── app/                   # Pages Next.js (accueil, rsvp, infos, admin)
  ├── components/            # Composants réutilisables (formulaire, bouton, etc.)
  ├── lib/                   # Utilitaires (firebase.js)
  ├── public/                # Fichiers statiques
  ├── .env.local             # Variables d'environnement (non commité)
  ├── .env.example           # Exemple de variables d'environnement
  ├── firestore.rules        # Règles de sécurité Firestore
  ├── firebase.json          # Config headers de sécurité
  ├── tailwind.config.js     # Config Tailwind
  ├── package.json           # Dépendances
  └── README.md
```

## 📝 Personnalisation

- Modifiez les textes dans `app/page.js`, `app/infos/page.js`, `components\PresenceForm.js`
- Mettez à jour les bonnes localisations des maps, (en attendant c'est Versailles ^^)
- Changez les couleurs dans `tailwind.config.js`
- Ajoutez vos images dans `public/`

## 📧 Contact

Pour toute question ou suggestion, ouvrez une issue ou contactez-moi via GitHub.