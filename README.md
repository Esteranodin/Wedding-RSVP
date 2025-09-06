# Application de gestion des invités de mariage

![Bannière application mariage](https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80)

Application web simple pour gérer les confirmations de présence à votre mariage. Permet aux invités de répondre facilement et à vous de suivre les réponses depuis un tableau de bord d'administration.

## ✨ Fonctionnalités

- **Page d'accueil** présentant votre mariage
- **Formulaire RSVP** pour que vos invités confirment leur présence
- **Tableau de bord d'administration** sécurisé pour suivre les réponses
- **Responsive** sur tous les appareils (mobile, tablette, desktop)
- **Déploiement facile** sur Vercel (gratuit)
- **Base de données** Firebase Firestore (gratuit)

## 🛠️ Technologies utilisées

- **[Next.js](https://nextjs.org/)** avec App Router
- **[Tailwind CSS](https://tailwindcss.com/)** pour le design
- **[Firebase](https://firebase.google.com/)** pour la base de données et l'authentification
- **[Vercel](https://vercel.com/)** pour le déploiement

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 18+)
- Compte Firebase
- Compte GitHub (pour le déploiement sur Vercel)

### Installation

1. Clonez ce dépôt
   ```bash
   git clone https://github.com/votre-username/wedding-site.git
   cd wedding-site
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement
   - Copiez le fichier `.env.example` en `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Remplissez les variables dans `.env.local` avec vos informations Firebase

4. Lancez le serveur de développement
   ```bash
   npm run dev
   ```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

### Configuration Firebase

1. Créez un projet dans [Firebase Console](https://console.firebase.google.com/)
2. Activez Firestore Database
3. Activez Authentication avec email/mot de passe
4. Créez un utilisateur admin dans Authentication
5. Copiez les informations de configuration dans votre fichier `.env.local`

## 📁 Structure du projet

```
wedding-site/
  ├── app/                   
  │   ├── page.js            # Page d'accueil
  │   ├── layout.js          # Layout commun
  │   ├── globals.css        # Styles globaux
  │   ├── rsvp/              # Route formulaire
  │   │   └── page.js        
  │   ├── infos/             # Route informations
  │   │   └── page.js
  │   ├── admin/             # Route admin
  │   │   └── page.js        
  ├── components/            # Composants réutilisables
  │   ├── PresenceForm.js    # Formulaire RSVP
  │   └── BackToTop.js       # Bouton "retour en haut"
  ├── lib/                   # Utilitaires
  │   └── firebase.js        # Configuration Firebase
  ├── public/                # Fichiers statiques
  ├── .env.local             # Variables d'environnement (non commité)
  ├── .env.example           # Exemple de variables d'environnement
  └── package.json           # Dépendances
```

## 🌐 Déploiement

### Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com) (idéalement en utilisant votre compte GitHub)
2. Depuis votre dashboard Vercel, cliquez sur "Add New..." puis "Project"
3. Importez votre dépôt GitHub
4. Dans la configuration du projet :
   - Framework Preset: Next.js (détecté automatiquement)
   - Root Directory: ./
   - Build Command: laisser la valeur par défaut
   - Output Directory: laisser la valeur par défaut
   - Environment Variables: ajoutez toutes les variables de votre fichier `.env.local`
5. Cliquez sur "Deploy"

### Variables d'environnement requises

Ajoutez ces variables d'environnement dans la configuration de déploiement :

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## ⚙️ Personnalisation

### Textes et dates

- Modifiez les textes dans `app/page.js` pour la page d'accueil
- Mettez à jour les informations dans `app/infos/page.js` 
- Ajustez la date limite de RSVP dans `app/rsvp/page.js`

### Styles et couleurs

- Les couleurs principales sont définies dans `tailwind.config.js` 
- Vous pouvez modifier les styles globaux dans `app/globals.css`

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter.
3. Cliquer sur "New Project"
4. Importer votre dépôt GitHub
5. Conserver les paramètres par défaut
6. Cliquer sur "Deploy"

Vercel vous fournira une URL pour votre application déployée.

## ✏️ Personnalisation

### Modifier les informations du mariage

- Modifiez le contenu dans `app/page.js` pour changer les détails du mariage
- Personnalisez les textes dans `app/rsvp/page.js` et `components/RSVPForm.jsx`

### Changer le design

- L'application utilise Tailwind CSS
- Modifiez les classes Tailwind dans les composants pour changer les couleurs, espacements, etc.
- Ajoutez vos propres images dans le dossier `public/`

### Étendre les fonctionnalités

Quelques idées d'extensions:
- Ajouter une galerie photos
- Intégrer Google Maps pour le lieu
- Créer une section FAQ
- Ajouter un compte à rebours jusqu'au jour J

## 📝 Licence

Ce projet est sous licence MIT. Libre à vous de l'utiliser et de le modifier pour votre propre mariage !

---

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur ce dépôt.