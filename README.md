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

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-nom/wedding-rsvp.git
   cd wedding-rsvp
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer Firebase**
   - Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com/)
   - Activer Firestore Database
   - Activer Authentication (Email/Password)
   - Créer un utilisateur admin dans Authentication
   - Copier la configuration Firebase dans `lib/firebase.js`

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Accéder à l'application**
   - Ouvrir [http://localhost:3000](http://localhost:3000)
   - Page admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Structure du projet

```
wedding-rsvp/
  ├── app/                   
  │   ├── page.js            # Page d'accueil
  │   ├── layout.js          # Layout commun
  │   ├── globals.css        # Styles globaux
  │   ├── rsvp/              # Route formulaire
  │   │   └── page.js        
  │   ├── admin/             # Route admin
  │   │   └── page.js        
  ├── components/            # Composants réutilisables
  │   └── RSVPForm.jsx       
  ├── lib/                   # Utilitaires
  │   └── firebase.js        # Configuration Firebase
  ├── public/                # Fichiers statiques
  └── package.json           # Dépendances
```

## 🌐 Déploiement

### Déploiement sur Vercel

1. Pousser votre code sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
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

## 💖 Crédit

Créé avec amour pour célébrer votre union.

---

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur ce dépôt.