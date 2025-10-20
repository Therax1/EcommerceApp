# 🛒 WestAf-Ecom

> Plateforme e-commerce moderne pour l'Afrique de l'Ouest • React + Tailwind CSS

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ☕ Support le projet

Si ce projet t'aide ou te plaît, tu peux me soutenir avec un café ! ☕

<a href="https://www.buymeacoffee.com/theranxe" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
</a>

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Vision](#-vision)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Structure](#-structure)
- [Composants](#-composants)
- [Roadmap](#-roadmap)
- [Contribuer](#-contribuer)

---

## 🎯 Aperçu

**WestAf-Ecom** est une plateforme e-commerce adaptée aux réalités du marché ouest-africain. Elle combine les meilleures pratiques internationales avec une compréhension des besoins locaux.

### 🌍 Pourquoi WestAf-Ecom ?

- 📱 **Mobile-first** - Optimisé pour les smartphones
- 💳 **Paiements locaux** - Orange Money, Wave, MTN, Moov (à venir)
- 💰 **Devise FCFA/XOF** - Prix en francs CFA
- 🎨 **UX intuitive** - Interface claire pour tous

---

## 🚀 Vision

### 🎨 UX/UI Intuitive

- Design épuré et moderne
- Navigation fluide et claire
- Feedback visuel instantané
- Chargement optimisé

### ♿ Accessibilité & Ergonomie

- ✅ Labels ARIA pour lecteurs d'écran
- ✅ Navigation clavier complète
- ✅ Contrastes WCAG
- ✅ Icônes universelles
- ✅ Textes lisibles

### 🌍 Contexte Local

- Support FCFA/XOF
- Paiements mobiles africains
- Interface FR/EN (à venir)

---

## ✨ Fonctionnalités

### 🛍️ Shopping

- ✅ Catalogue produits avec filtres
- ✅ Pages détails complètes
- ✅ Panier avec popup latéral
- ✅ Système de catégories
- ✅ Produits connexes

### 🎨 Interface

- ✅ Hero section avec carousel (chaque 4.5s)
- ✅ Navbar sticky + recherche
- ✅ Menu hamburger responsive
- ✅ Fil d'Ariane dynamique
- ✅ Footer avec newsletter
- ✅ Badges promo (-30%, New)

### 🔍 Recherche

- ✅ Barre expansive sur mobile
- ✅ Overlay d'assombrissement
- ✅ Ring de focus ambre
- ✅ Animations fluides

### 📱 Responsive

- ✅ Mobile-first
- ✅ Tablette & Desktop
- ✅ Touch-friendly
- ✅ Transitions CSS

---

## 🛠️ Technologies

### Frontend

- **React+Vite**
- **Tailwind CSS**
- **FontAwesome** - Icônes

### Standards

- Accessibilité WCAG
- Responsive Design
- SEO-friendly HTML5
- Performance optimisée

---

## 🚀 Installation

### Prérequis

```bash
Node.js v16+
npm ou yarn
```

### Étapes

```bash
# 1. Cloner
git clone https://github.com/Therax1/WestAf-Ecom.git
cd WestAf-Ecom

# 2. Installer
cd client
npm install

# 3. Lancer
npm run dev

# 4. Ouvrir
http://localhost:5173
```

### Production

```bash
npm run build
npm run preview
```

---

## 📁 Structure

```
client/
├── public/images/          # Assets statiques
├── src/
│   ├── assets/img/         # Images importées
│   ├── auth/               # Connexion, Inscription
│   ├── components/         # Composants réutilisables
│   │   ├── NavBar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── CartPopUp.jsx
│   │   ├── Footer.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── OurCategories.jsx
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/              # Home ...
│   ├── App.jsx             # Routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind + globals
├── package.json
└── vite.config.js
```


## 🗺️ Roadmap

### ✅ Phase 1 - UI/UX (En cours...)

- [x] Design system Tailwind
- [ ] Composants de base
- [ ] Navigation & routing
- [ ] Responsive mobile-first
- [ ] Accessibilité ARIA
- [ ] Animations fluides

### 🚧 Phase 2 - Core

- [ ] API backend
- [ ] State management
- [ ] Auth JWT
- [ ] Recherche avancée
- [ ] Wishlist

### 💳 Phase 3 - Paiements (Priorité)

- [ ] **Orange Money** 🇸🇳 🇨🇮 🇲🇱
- [ ] **Wave** 🇸🇳 🇨🇮
- [ ] **MTN Mobile Money** Multi-pays
- [ ] **Moov Money** 🇧🇯 🇹🇬
- [ ] Carte bancaire
- [ ] Paiement à la livraison

### 🌍 Phase 4 - Localisation

- [ ] Multilingue FR/EN
- [ ] Conversion FCFA
- [ ] Contenu par pays
- [ ] Zones de livraison

### 📦 Phase 5 - Avancé

- [ ] Gestion commandes
- [ ] Tracking livraison
- [ ] Programme fidélité
- [ ] Notifications push
- [ ] Chat support

### 🔮 Phase 6 - Optimisation

- [ ] PWA
- [ ] Mode offline
- [ ] SEO avancé
- [ ] Analytics
- [ ] CDN images
- [ ] Paiements fractionnés

---

## 🎨 Personnalisation

### Couleurs

```javascript
// Palette Tailwind
Primaire : Amber (#F59E0B)    // CTA, actions
Secondaire : Gris (#10121a)   // NavBar
Accent : Bleu (#3B82F6)       // Liens
```


## 🤝 Contribuer

Les contributions sont bienvenues !

### Comment

1. Fork le projet
2. Créer une branche (`git checkout -b feature/MaFonctionnalite`)
3. Commit (`git commit -m 'Ajout fonctionnalité'`)
4. Push (`git push origin feature/MaFonctionnalite`)
5. Pull Request

### Guidelines

- ✅ Noms de composants clairs
- ✅ Code commenté en français
- ✅ Tests mobile + desktop
- ✅ Standards accessibilité WCAG
- ✅ Conventions Tailwind
- ✅ JSDoc sur composants

### Domaines

- 🎨 Design & UX
- 💻 Frontend
- 🔌 API paiements
- 🌍 Traductions
- 📚 Documentation
- 🐛 Bug fixes

---

## 📝 Licence

MIT License

---

## 👨‍💻 Auteur

**t-ranxe**

- GitHub: [@Therax1](https://github.com/Therax1)
- Repo: [WestAf-Ecom](https://github.com/Therax1/WestAf-Ecom)

---

## 🙏 Remerciements

- Design inspiré de Amazon & Shopify
- Icons : FontAwesome
- CSS : Tailwind CSS
- Build : Vite
- Communauté React

**Dédicace** : Aux entrepreneurs et devs d'Afrique de l'Ouest qui bâtissent l'économie numérique de demain 🌍💪

---

## 📞 Support

- 💬 [Issues GitHub](https://github.com/Therax1/WestAf-Ecom/issues)
- 🗨️ [Discussions](https://github.com/Therax1/WestAf-Ecom/discussions)



---

<div align="center">
  <p>Fait avec ❤️ pour l'Afrique de l'Ouest</p>
  <p><strong>WestAf-Ecom</strong> © 2025</p>
  <p>🌍 Construisons ensemble l'avenir du Continent Africain 🚀</p>
</div>

