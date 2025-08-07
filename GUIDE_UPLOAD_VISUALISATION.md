#  Guide d'Upload et Visualisation des Factures


##  Fonctionnalités Ajoutées

### 1. Upload de Fichiers Réels
- **Glisser-déposer** : Déposez vos fichiers directement dans la zone d'upload
- **Sélection de fichiers** : Cliquez pour sélectionner vos fichiers
- **Formats supportés** : PDF, JPG, JPEG, PNG, DOC, DOCX
- **Prévisualisation** : Voir les fichiers sélectionnés avant upload

### 2. Visualisation des Fichiers Uploadés
- **Aperçu PDF** : Visualisation directe des fichiers PDF
- **Aperçu d'images** : Affichage des factures en format image
- **Informations détaillées** : Nom, taille, type de fichier
- **Téléchargement** : Récupération des fichiers originaux

### 3. Interface Améliorée
- **Indicateur visuel** : Icône pour les factures avec fichiers uploadés
- **Gestion des fichiers** : Suppression des fichiers sélectionnés
- **Validation** : Vérification des types de fichiers acceptés

##  Interface Utilisateur

### Zone d'Upload
```
┌─────────────────────────────────────────────────────────┐
│ 📤 Zone de téléversement                               │
│                                                        │
│ Glissez-déposez votre facture ici                     │
│ ou cliquez pour sélectionner un fichier               │
│                                                        │
│ [Sélectionner un fichier]                             │
│                                                        │
│ Formats acceptés: PDF, JPG, PNG, DOC, DOCX           │
└─────────────────────────────────────────────────────────┘
```

### Fichiers Sélectionnés
```
┌─────────────────────────────────────────────────────────┐
│ 📁 Fichiers sélectionnés                              │
│                                                        │
│ 📄 facture_senelec_2024.pdf                           │
│ 2.5 MB • application/pdf                    [X]       │
│                                                        │
│ 📄 facture_sonatel_2024.jpg                           │
│ 1.8 MB • image/jpeg                        [X]       │
└─────────────────────────────────────────────────────────┘
```

### Liste des Factures
```
┌─────────────────────────────────────────────────────────┐
│ Facture │ Acheteur │ Montant │ Échéance │ Statut │ 👁️ 📥 │
├─────────────────────────────────────────────────────────┤
│ INV-001 │ SENELEC  │ 15M FCFA│ 15/02/24 │ ✅     │ 👁️ 📥 │
│         │          │         │          │        │ 📄 Fichier uploadé │
│ INV-002 │ MinSanté │ 8.5M FCFA│ 20/02/24 │ ⏳     │ 👁️ 📥 │
└─────────────────────────────────────────────────────────┘
```

### Modal de Visualisation
```
┌─────────────────────────────────────────────────────────┐
│ 📄 Visualisation de la facture                    [X] │
│ facture_senelec_2024.pdf                              │
├─────────────────────────────────────────────────────────┤
│ 📊 Aperçu de la facture                             │
│ Numéro: INV-001 │ Date d'échéance: 15/02/24        │
│ Acheteur: SENELEC │ Financement: Demandé            │
├─────────────────────────────────────────────────────────┤
│ 📁 Fichier uploadé                                   │
│ Nom: facture_senelec_2024.pdf                        │
│ Taille: 2.5 MB • Type: application/pdf              │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │                APERÇU PDF                          │ │
│ │  [Contenu réel du fichier PDF]                    │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ [Fermer] [Télécharger] [Voir les enchères]          │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Comment Utiliser

### 1. Upload d'une Facture
1. **Accédez** à la gestion des factures
2. **Cliquez** sur "Nouvelle facture"
3. **Glissez-déposez** votre fichier ou cliquez pour sélectionner
4. **Remplissez** les informations de la facture
5. **Soumettez** le formulaire

### 2. Visualisation d'une Facture
1. **Dans la liste** des factures, repérez l'icône 👁️
2. **Cliquez** sur l'icône de l'œil
3. **Visualisez** le contenu réel du fichier uploadé
4. **Utilisez** les actions disponibles (télécharger, fermer)

### 3. Gestion des Fichiers
- **Supprimer** : Cliquez sur [X] à côté du fichier
- **Remplacer** : Sélectionnez un nouveau fichier
- **Télécharger** : Récupérez le fichier original

## 📋 Types de Fichiers Supportés

### ✅ Formats Acceptés
- **PDF** : Factures au format PDF (recommandé)
- **Images** : JPG, JPEG, PNG (factures scannées)
- **Documents** : DOC, DOCX (factures Word)

### 🎯Aperçu par Type
- **PDF** : Affichage dans un iframe
- **Images** : Affichage direct de l'image
- **Documents** : Message d'information (téléchargement disponible)

##  Sécurité et Performance

### Sécurité
- **Validation des types** : Seuls les formats acceptés sont uploadés
- **Taille limitée** : Contrôle de la taille des fichiers
- **Sanitisation** : Protection contre les fichiers malveillants

### Performance
- **Chargement optimisé** : Aperçu à la demande
- **Compression** : Optimisation des images
- **Cache** : Mise en cache des fichiers visualisés

## 🚀 Fonctionnalités Avancées

### 1. Upload Multiple
- **Plusieurs fichiers** : Sélection de plusieurs factures
- **Gestion individuelle** : Suppression fichier par fichier
- **Validation globale** : Vérification de tous les fichiers

### 2. Aperçu Intelligent
- **Détection automatique** : Reconnaissance du type de fichier
- **Rendu adaptatif** : Affichage selon le format
- **Fallback** : Contenu généré si pas de fichier

### 3. Intégration Complète
- **Base de données** : Stockage des métadonnées
- **API** : Endpoints pour upload/téléchargement
- **Notifications** : Alertes de statut d'upload

##  Tests de Fonctionnalité

### Tests Réalisés
1. **Upload de fichiers** : PDF, images, documents 
2. **Glisser-déposer** : Fonctionne correctement 
3. **Aperçu PDF** : Affichage dans iframe 
4. **Aperçu images** : Affichage direct 
5. **Téléchargement** : Récupération des fichiers 
6. **Gestion des erreurs** : Messages appropriés 
7. **Responsive** : Adaptation mobile/desktop 

###  Comportement Attendu
- **Upload** → Sélection/glisser-déposer → Validation → Enregistrement
- **Visualisation** → Clic sur œil → Aperçu du fichier → Actions
- **Téléchargement** → Clic sur télécharger → Récupération du fichier original

##  Workflow Complet

### 1. Création d'une Facture
```
Upload fichier → Remplir formulaire → Soumettre → Facture créée
```

### 2. Visualisation
```
Liste factures → Clic sur œil → Modal → Aperçu fichier → Actions
```

### 3. Gestion
```
Modification → Upload nouveau fichier → Validation → Mise à jour
```

##  Avantages

### Pour l'Utilisateur
- **Simplicité** : Upload et visualisation en un clic
- **Flexibilité** : Support de multiples formats
- **Sécurité** : Validation et contrôle des fichiers
- **Performance** : Chargement rapide et fluide

### Pour l'Application
- **Intégration** : Compatible avec l'existant
- **Évolutivité** : Architecture extensible
- **Maintenance** : Code propre et documenté
- **Sécurité** : Protection contre les vulnérabilités

##  Support

Pour toute question sur l'upload et la visualisation :
-  Email : support@procapital.sn
-  Chat : Disponible sur la plateforme
-  Documentation : Guide complet disponible
