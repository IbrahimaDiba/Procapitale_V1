#  Guide de Visualisation des Factures

##  Nouvelle Fonctionnalité

L'application ProCapital dispose maintenant d'une fonctionnalité complète de **visualisation des factures** qui permet aux utilisateurs de voir leurs factures directement dans l'interface.

##  Fonctionnalités Ajoutées

### 1. Visualisation des Factures
- **Icône de l'œil** : Cliquez sur l'icône 👁️ dans la liste des factures
- **Modal interactif** : Ouverture d'une fenêtre de visualisation
- **Aperçu complet** : Affichage de tous les détails de la facture
- **Design professionnel** : Interface moderne et lisible

### 2. Fonctionnalités du Modal
- **En-tête informatif** : Nom de la facture et actions disponibles
- **Aperçu des détails** : Résumé des informations principales
- **Visualisation complète** : Rendu HTML de la facture
- **Actions contextuelles** : Téléchargement et navigation

### 3. Actions Disponibles
- **Voir la facture** : Clic sur l'icône de l'œil
- **Télécharger** : Bouton de téléchargement dans le modal
- **Fermer** : Fermeture du modal
- **Voir les enchères** : Si la facture est validée et financée

##  Interface Utilisateur

### Liste des Factures
```
┌─────────────────────────────────────────────────────────┐
│ Facture │ Acheteur │ Montant │ Échéance │ Statut │ 👁️ │
├─────────────────────────────────────────────────────────┤
│ INV-001 │ SENELEC  │ 15M FCFA│ 15/02/24 │ ✅     │ 👁️ │
│ INV-002 │ MinSanté │ 8.5M FCFA│ 20/02/24 │ ⏳     │ 👁️ │
└─────────────────────────────────────────────────────────┘
```

### Modal de Visualisation
```
┌─────────────────────────────────────────────────────────┐
│ Visualisation de la facture                    [X] │
│ Facture_SENELEC_2024_001.pdf                        │
├─────────────────────────────────────────────────────────┤
│  Aperçu de la facture                             │
│ Numéro: INV-001 │ Date d'échéance: 15/02/24        │
│ Acheteur: SENELEC │ Financement: Demandé            │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │                FACTURE RENDU HTML                  │ │
│ │  [Contenu formaté de la facture]                  │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ [Fermer] [Télécharger] [Voir les enchères]          │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Comment Utiliser

### 1. Accéder à la Gestion des Factures
1. Connectez-vous à votre compte
2. Allez dans le **Dashboard**
3. Cliquez sur **"Téléverser une facture"** ou **"Gestion des Factures"**

### 2. Visualiser une Facture
1. Dans la liste des factures, repérez l'icône 
2. Cliquez sur l'icône de l'œil
3. Le modal s'ouvre avec la visualisation complète

### 3. Actions Disponibles dans le Modal
- **Fermer** : Retour à la liste des factures
- **Télécharger** : Téléchargement de la facture en HTML
- **Voir les enchères** : Si applicable (facture validée + financement)

##  Informations Affichées

### Aperçu de la Facture
- **Numéro de facture** : Identifiant unique
- **Acheteur** : Nom de l'entreprise acheteuse
- **Montant** : Montant en FCFA
- **Date d'échéance** : Date limite de paiement
- **Financement** : Statut de la demande de financement
- **Jours restants** : Calcul automatique

### Contenu de la Facture
- **En-tête ProCapital** : Logo et informations de l'entreprise
- **Détails de la facture** : Numéro, dates, montant
- **Informations commerciales** : Acheteur, fournisseur, statut
- **Description** : Détails des services/produits (si disponible)
- **Pied de page** : Informations techniques et statut

##  Types d'Utilisateurs

### Fournisseur
- ✅ Visualisation de toutes ses factures
- ✅ Suivi du statut de validation
- ✅ Accès aux enchères pour factures validées

### Acheteur
- ✅ Visualisation des factures à valider
- ✅ Interface de validation
- ✅ Suivi des paiements

### Financier
- ✅ Visualisation des opportunités d'investissement
- ✅ Analyse des factures avant financement
- ✅ Interface d'enchères

## 🔒 Sécurité et Performance

### Sécurité
- **Validation des données** : Vérification des permissions
- **Sanitisation HTML** : Protection contre les injections
- **Contrôle d'accès** : Vérification du type d'utilisateur

### Performance
- **Chargement optimisé** : Modal ouvert à la demande
- **Rendu efficace** : HTML généré dynamiquement
- **Mémoire optimisée** : Nettoyage automatique

##  Améliorations Futures

### Fonctionnalités Prévues
- **Support PDF** : Affichage de vrais fichiers PDF
- **Zoom et navigation** : Contrôles de visualisation
- **Annotations** : Possibilité d'ajouter des commentaires
- **Partage** : Envoi par email ou lien
- **Historique** : Suivi des modifications

### Intégrations
- **API de facturation** : Connexion avec des systèmes externes
- **Signature électronique** : Validation numérique
- **Notifications** : Alertes de statut en temps réel

##  Support

Pour toute question sur la visualisation des factures :
-  Email : support@procapital.sn
- Chat : Disponible sur la plateforme
- Documentation : Guide complet disponible
