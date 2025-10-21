# 🏗️ Architecture Complète - WestAf-Ecom

## 📊 Schéma de l'Architecture Frontend-Backend

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     App.jsx (Routes)                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │   │
│  │  │  MainLayout │  │ AuthLayout  │  │ AdminLayout │         │   │
│  │  │  (Public)   │  │  (Login)    │  │  (Protected)│         │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Context Providers                         │   │
│  │   ┌───────────────┐    ┌───────────────┐                  │   │
│  │   │  CartContext  │    │  AuthContext  │                  │   │
│  │   │  (État panier)│    │  (État auth)  │                  │   │
│  │   └───────────────┘    └───────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Services Layer                           │   │
│  │   ┌────────────────────────────────────────────────────┐   │   │
│  │   │  api.service.js (Axios + Intercepteurs)           │   │   │
│  │   │  • Ajoute token automatiquement                   │   │   │
│  │   │  • Gère refresh token (401)                       │   │   │
│  │   │  • Gère redirections erreurs                      │   │   │
│  │   └────────────────────────────────────────────────────┘   │   │
│  │                              ↓                              │   │
│  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │   │  product.    │  │   auth.      │  │   order.     │   │   │
│  │   │  service.js  │  │  service.js  │  │  service.js  │   │   │
│  │   └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              api.config.js (Endpoints)                      │   │
│  │   AUTH_ENDPOINTS, PRODUCT_ENDPOINTS, ORDER_ENDPOINTS...    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ HTTP/HTTPS
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND (Node.js/Express)                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     API Routes                              │   │
│  │   /api/auth/*    /api/products/*    /api/orders/*          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Middlewares                               │   │
│  │   • Authentication (JWT)                                    │   │
│  │   • Authorization (Roles)                                   │   │
│  │   • Validation (Joi/Yup)                                    │   │
│  │   • Error Handling                                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Controllers                              │   │
│  │   authController, productController, orderController...     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Services                                │   │
│  │   Business Logic, Validation, Data Processing               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Models (ORM/ODM)                        │   │
│  │   User, Product, Order, Category, Cart...                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                          DATABASE                                   │
│                   MongoDB / PostgreSQL                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux d'une Requête Typique

### Exemple : Récupérer la liste des produits

```
1. COMPOSANT (ProductList.jsx)
   ↓ appelle
   
2. SERVICE (product.service.js)
   → getAllProducts({ page: 1, limit: 12 })
   ↓ utilise
   
3. API CLIENT (api.service.js)
   → axios.get('/products', { params })
   → Ajoute automatiquement le token JWT
   ↓ envoie à
   
4. BACKEND (server.js)
   → Route: GET /api/products
   ↓ passe par
   
5. MIDDLEWARE (auth.middleware.js)
   → Vérifie le token JWT
   → Décode les infos utilisateur
   ↓ puis
   
6. CONTROLLER (productController.js)
   → getProducts(req, res)
   ↓ appelle
   
7. SERVICE BACKEND (productService.js)
   → Business logic, filtrage, pagination
   ↓ interroge
   
8. MODEL (Product.model.js)
   → Product.find({ ... })
   ↓ requête
   
9. DATABASE (MongoDB)
   → Exécute la requête
   ← retourne les données
   
10. RESPONSE
    ← Remonte la chaîne
    ← Format JSON
    ← Status 200
    
11. FRONTEND REÇOIT
    → Stocke dans useState
    → Met à jour l'UI
```

---

## 🔐 Flux d'Authentification Complet

```
┌─────────────────────────────────────────────────────────────────┐
│                   1. LOGIN (Frontend)                           │
│  User entre email + password                                    │
│  → auth.service.js → POST /api/auth/login                       │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                   2. BACKEND VALIDATION                         │
│  • Vérifie si user existe                                       │
│  • Compare password (bcrypt)                                    │
│  • Génère JWT token + refresh token                             │
│  • Retourne: { token, refreshToken, user }                      │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                   3. SAUVEGARDE FRONTEND                        │
│  localStorage.setItem('authToken', token)                       │
│  localStorage.setItem('refreshToken', refreshToken)             │
│  AuthContext → setUser(user)                                    │
│  Redirection vers /account                                      │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│            4. REQUÊTES SUIVANTES (Automatique)                  │
│  Axios interceptor ajoute:                                      │
│  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...         │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                   5. SI TOKEN EXPIRÉ (401)                      │
│  • Interceptor détecte erreur 401                               │
│  • Appelle /api/auth/refresh avec refreshToken                  │
│  • Reçoit nouveau token                                         │
│  • Sauvegarde + retry requête originale                         │
└────────────────────────────────┬────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│              6. SI REFRESH ÉCHOUE                               │
│  • Supprime tokens du localStorage                              │
│  • AuthContext → logout()                                       │
│  • Redirection vers /login                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Structure Backend Recommandée

```
server/
├── src/
│   ├── config/
│   │   ├── database.js         # Configuration DB
│   │   ├── jwt.js              # Config JWT
│   │   └── payment.js          # Config paiements
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Category.js
│   │   └── Cart.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   └── emailService.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js      # Vérifie JWT
│   │   ├── admin.middleware.js     # Vérifie rôle admin
│   │   ├── validate.middleware.js  # Validation données
│   │   └── error.middleware.js     # Gestion erreurs
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   └── user.routes.js
│   │
│   ├── utils/
│   │   ├── tokenUtils.js
│   │   ├── emailUtils.js
│   │   └── validators.js
│   │
│   └── app.js                  # Configuration Express
│
├── .env                        # Variables d'environnement
├── .env.example
├── package.json
└── server.js                   # Point d'entrée
```

---

## 🛠️ Technologies Recommandées

### Backend
- **Framework** : Express.js
- **Base de données** : MongoDB (Mongoose) ou PostgreSQL (Sequelize)
- **Authentification** : JWT (jsonwebtoken) + bcrypt
- **Validation** : Joi ou Yup
- **Upload fichiers** : Multer
- **Email** : Nodemailer
- **Paiements** : Intégration Orange Money, Wave, MTN

### DevOps
- **Hosting Backend** : Railway, Render, DigitalOcean
- **Hosting Frontend** : Vercel, Netlify
- **Database** : MongoDB Atlas, Supabase
- **File Storage** : Cloudinary, AWS S3

---

## ✅ Checklist Backend à Implémenter

### Phase 1 : Configuration
- [ ] Initialiser projet Node.js
- [ ] Installer dépendances (express, mongoose, jwt, bcrypt...)
- [ ] Configurer connexion base de données
- [ ] Setup variables d'environnement

### Phase 2 : Authentification
- [ ] Créer modèle User
- [ ] Routes : register, login, logout, refresh
- [ ] Middleware de vérification JWT
- [ ] Hash des mots de passe (bcrypt)

### Phase 3 : Produits
- [ ] Créer modèle Product
- [ ] CRUD produits (admin)
- [ ] Endpoints publics (liste, détail, recherche)
- [ ] Upload images produits

### Phase 4 : Commandes
- [ ] Créer modèle Order
- [ ] Créer commande depuis panier
- [ ] Gestion statuts commandes
- [ ] Historique utilisateur

### Phase 5 : Paiements
- [ ] Intégration Orange Money API
- [ ] Intégration Wave API
- [ ] Webhooks de confirmation
- [ ] Gestion échecs paiement

### Phase 6 : Admin
- [ ] Dashboard statistiques
- [ ] Gestion produits (CRUD)
- [ ] Gestion commandes
- [ ] Gestion utilisateurs

---

## 🚀 Prêt pour l'Intégration !

Ton frontend est **100% préparé** pour recevoir le backend :

✅ Routes organisées par layout
✅ Services API prêts à l'emploi
✅ Configuration centralisée
✅ Gestion automatique de l'auth
✅ Intercepteurs Axios configurés
✅ Context globaux (Cart, Auth)
✅ Documentation complète

**Next Step** : Créer le backend et le connecter ! 🎉
