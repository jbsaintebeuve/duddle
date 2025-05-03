# 🎨 Duddle - Stickers Made in France

## Présentation du projet

**Duddle** est une boutique en ligne spécialisée dans la vente de stickers design créés par des artistes français indépendants. Duddle soutient les talents locaux tout en proposant des créations originales et éco-responsables.

Ce site web est une landing page interactive pour le lancement de la boutique, mettant en vedette un impressionnant **mur 3D collaboratif** où chaque utilisateur s'inscrivant à notre newsletter peut placer son propre sticker virtuel et participer à une œuvre collective évolutive.

![Logo Duddle](public/img/icon_logo.png)

## ✨ Fonctionnalités

- 🖼️ **Mur 3D interactif** permettant aux visiteurs de placer leur sticker virtuel
- 📧 **Inscription newsletter** avec création automatique d'un sticker personnalisé
- 🔄 **Navigation fluide** dans l'environnement 3D avec zoom et rotation
- 🎭 **Prévisualisation des stickers** avant positionnement sur le mur
- 💾 **Sauvegarde de position** des stickers de chaque utilisateur
- 📱 Interface **responsive** adaptée aux mobiles et tablettes
- 🌐 **Partage social** du mur communautaire et des positions de stickers

## 🛠️ Technologies utilisées

- **Frontend** : React.js, Three.js pour la 3D, GSAP pour les animations
- **Interactivité** : HTML5 Canvas, WebGL
- **Styling** : CSS3 avec SASS, Styled Components
- **Persistance** : LocalStorage (version sans base de données)
- **3D** : Blender pour la création des assets 3D, react-three-fiber
- **Performance** : Code splitting, lazy loading des modèles 3D
- **Analytics** : Suivi des conversions et interactions utilisateur

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (ou yarn)
- vercel CLI
- Navigateur compatible WebGL

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/jbsaintebeuve/duddle.git
cd duddle

# Installer les dépendances
npm install
npm run api:install
```

### Démarrage

```bash
# Lancer l'application en mode développement
vercel dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

### Production

```bash
# Construire l'application pour la production
npm run build
```

## 📖 Comment utiliser le mur interactif Duddle

1. **Découverte** - Explorez le mur 3D en utilisant les contrôles de navigation (rotation, zoom)
2. **Inscription** - Remplissez le formulaire de newsletter pour débloquer votre sticker
3. **Personnalisation** - Choisissez le design de votre sticker parmi notre collection
4. **Placement** - Positionnez votre sticker sur le mur communautaire à l'emplacement de votre choix

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

---

Fait avec ❤️ à Bordeaux par l'équipe Duddle
