# ProCapital - Marketplace de Financement TPE/PME

Une application web moderne pour faciliter l'accès au financement des petites et moyennes entreprises sénégalaises.

##  Fonctionnalités

### Types d'Utilisateurs Supportés
- **Fournisseur (PME/PMI)** : Entreprises souhaitant accéder à des financements
- **Micro-entreprise** : Petites structures avec accompagnement personnalisé
- **Acheteur** : Grandes entreprises et administrations
- **Financier** : Investisseurs et institutions financières

### Fonctionnalités Principales
- ✅ **Authentification** : Système de connexion/inscription avec types d'utilisateurs
- ✅ **Dashboard Personnalisé** : Interface adaptée selon le profil utilisateur
- ✅ **Gestion KYC** : Upload et suivi des documents de conformité
- ✅ **Gestion des Factures** : Upload, suivi et demande de financement
- ✅ **Interface Responsive** : Design adaptatif mobile/desktop
- ✅ **Navigation Fluide** : Parcours utilisateur optimisé

##  Technologies Utilisées

- **React 18.3.1** - Framework frontend
- **TypeScript 5.6.3** - Typage statique
- **Vite 5.4.8** - Build tool moderne
- **Tailwind CSS 3.4.17** - Framework CSS utilitaire
- **Lucide React 0.344.0** - Icônes modernes
- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS

##  Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd pro_capitale_v1
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   - Ouvrir http://localhost:5173 dans le navigateur

## 🧪 Tests de Fonctionnalité

### Comptes de Démonstration
- **Fournisseur :** demo@fournisseur.sn
- **Acheteur :** demo@acheteur.sn  
- **Financier :** demo@financier.sn

### Parcours de Test
1. **Inscription** : Créer un nouveau compte
2. **Connexion** : Se connecter avec les comptes de démonstration
3. **Dashboard** : Explorer les fonctionnalités selon le type d'utilisateur
4. **KYC** : Tester l'upload de documents
5. **Factures** : Ajouter et gérer des factures
6. **Navigation** : Tester la navigation mobile et desktop

##  Structure du Projet

```
src/
├── App.tsx                 # Composant principal avec routing
├── main.tsx               # Point d'entrée de l'application
├── index.css              # Styles Tailwind CSS
├── utils/
│   └── appStatus.ts       # Utilitaires de statut de l'app
└── components/
    ├── Header.tsx         # Navigation principale
    ├── Hero.tsx           # Page d'accueil
    ├── Login.tsx          # Formulaire de connexion
    ├── Register.tsx       # Formulaire d'inscription
    ├── Dashboard.tsx      # Tableau de bord personnalisé
    ├── KYCDocuments.tsx   # Gestion des documents KYC
    ├── InvoiceUpload.tsx  # Upload et gestion des factures
    ├── Scoring.tsx        # Affichage du scoring
    ├── Auctions.tsx       # Interface des enchères
    ├── Payments.tsx       # Gestion des paiements
    ├── Profile.tsx        # Gestion du profil
    ├── Services.tsx       # Présentation des services
    └── UserJourneys.tsx   # Parcours utilisateur
```

## 🎨 Design et UX

### Interface Utilisateur
- **Design Moderne** : Interface épurée et professionnelle
- **Responsive** : Adaptation parfaite mobile/tablette/desktop
- **Accessibilité** : Respect des standards WCAG
- **Performance** : Chargement rapide et animations fluides

### Expérience Utilisateur
- **Navigation Intuitive** : Parcours utilisateur optimisé
- **Feedback Visuel** : Retours d'information clairs
- **États de Chargement** : Indicateurs de progression
- **Gestion d'Erreurs** : Messages d'erreur explicites

## 🔧 Scripts Disponibles

```bash

npm run dev          # Lance le serveur de développement

# Build
npm run build        # Crée une version de production

# Preview
npm run preview      # Lance le serveur de preview

# Linting
npm run lint         # Vérifie la qualité du code
```

## Statut de l'Application

L'application est **entièrement fonctionnelle** avec toutes les parties liées qui travaillent ensemble :

###  Composants Fonctionnels
- Navigation responsive avec authentification
- Dashboard personnalisé selon le type d'utilisateur
- Upload de documents KYC avec glisser-déposer
- Gestion complète des factures
- Interface des enchères de financement
- Gestion des paiements
- Profil utilisateur

###  Fonctionnalités Prêtes
- Système d'authentification complet
- Interface responsive mobile/desktop
- Animations et transitions fluides
- Gestion d'état avec React hooks
- Typage TypeScript complet
- Styles Tailwind CSS optimisés

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Serveur de Production
```bash
npm run preview
```

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

##  Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

##  Support

Pour toute question ou support :
-  Email : support@procapital.sn
-  Téléphone : +221 XX XXX XX XX
- Chat : Disponible sur la plateforme

