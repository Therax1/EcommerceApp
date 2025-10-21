# 📁 Architecture des Routes & API - WestAf-Ecom

## 📋 Structure des Dossiers

```
client/src/
├── routes/
│   └── routes.config.js          # Configuration centralisée des routes
├── layouts/
│   ├── MainLayout.jsx             # Layout principal (NavBar + Footer)
│   ├── AuthLayout.jsx             # Layout pour les pages d'auth
│   ├── ProtectedLayout.jsx        # Layout pour les pages protégées
│   └── AdminLayout.jsx            # Layout pour le panel admin
├── services/
│   ├── api.service.js             # Configuration Axios avec intercepteurs
│   ├── product.service.js         # Service API pour les produits
│   ├── auth.service.js            # Service API pour l'authentification (à créer)
│   ├── order.service.js           # Service API pour les commandes (à créer)
│   └── user.service.js            # Service API pour l'utilisateur (à créer)
├── config/
│   └── api.config.js              # Configuration des endpoints API
├── context/
│   ├── CartContext.jsx            # État global du panier
│   └── AuthContext.jsx            # État global de l'auth (à créer)
├── pages/                         # Pages de l'application
├── components/                    # Composants réutilisables
└── App.jsx                        # Configuration des routes principales
```

---

## 🛣️ Types de Routes

### 1️⃣ **Routes Publiques** (MainLayout)
Accessibles sans authentification, incluent NavBar + Footer

```javascript
// Exemples
/                    → Home
/products            → Liste des produits
/product/:id         → Détail d'un produit
/category/:slug      → Produits par catégorie
/contact             → Page de contact
```

### 2️⃣ **Routes d'Authentification** (AuthLayout)
Pages de connexion/inscription (sans NavBar/Footer)

```javascript
// Exemples
/login               → Connexion
/register            → Inscription
/forgot-password     → Récupération mot de passe
/reset-password      → Réinitialisation mot de passe
```

### 3️⃣ **Routes Protégées** (ProtectedLayout)
Nécessitent authentification (redirection automatique vers /login si non connecté)

```javascript
// Exemples
/cart                → Panier
/checkout            → Validation commande
/account/profile     → Profil utilisateur
/account/orders      → Historique des commandes
/account/wishlist    → Liste de souhaits
```

### 4️⃣ **Routes Administrateur** (AdminLayout)
Nécessitent authentification + rôle admin

```javascript
// Exemples
/admin/dashboard     → Tableau de bord admin
/admin/products      → Gestion des produits
/admin/orders        → Gestion des commandes
/admin/customers     → Gestion des clients
```

---

## 🔌 Services API

### Configuration Axios (`api.service.js`)
- ✅ Ajoute automatiquement le token JWT à chaque requête
- ✅ Gère le refresh token en cas d'expiration (401)
- ✅ Redirige automatiquement en cas d'erreur d'authentification
- ✅ Centralise la gestion des erreurs

### Exemple de Service (`product.service.js`)
```javascript
import { getAllProducts, getProductById } from '../services/product.service'

// Dans un composant
const fetchProducts = async () => {
  try {
    const products = await getAllProducts({ page: 1, limit: 12 })
    setProducts(products)
  } catch (error) {
    console.error(error.message)
  }
}
```

---

## 🔐 Gestion de l'Authentification

### Flux complet :

1. **Connexion** : `POST /api/auth/login`
   ```javascript
   {
     email: "user@example.com",
     password: "password123"
   }
   ```
   Réponse : `{ token, refreshToken, user }`

2. **Sauvegarde** dans `localStorage` :
   ```javascript
   localStorage.setItem('authToken', token)
   localStorage.setItem('refreshToken', refreshToken)
   localStorage.setItem('user', JSON.stringify(user))
   ```

3. **Requêtes suivantes** :
   - Axios ajoute automatiquement `Authorization: Bearer <token>`
   - Si token expiré (401) → Refresh automatique
   - Si refresh échoue → Déconnexion + redirection

4. **Déconnexion** :
   ```javascript
   localStorage.removeItem('authToken')
   localStorage.removeItem('refreshToken')
   localStorage.removeItem('user')
   ```

---

## 📡 Endpoints API Backend

### Auth
```
POST   /api/auth/register          # Inscription
POST   /api/auth/login             # Connexion
POST   /api/auth/logout            # Déconnexion
POST   /api/auth/refresh           # Refresh token
GET    /api/auth/me                # Utilisateur connecté
```

### Products
```
GET    /api/products               # Liste des produits
GET    /api/products/:id           # Détail d'un produit
GET    /api/products/search?q=...  # Recherche
GET    /api/products/featured      # Produits mis en avant
POST   /api/products               # Créer produit (admin)
PUT    /api/products/:id           # Modifier produit (admin)
DELETE /api/products/:id           # Supprimer produit (admin)
```

### Cart
```
GET    /api/cart                   # Récupérer le panier
POST   /api/cart/add               # Ajouter un article
PUT    /api/cart/item/:id          # Modifier quantité
DELETE /api/cart/item/:id          # Supprimer article
DELETE /api/cart/clear             # Vider panier
```

### Orders
```
GET    /api/orders                 # Commandes de l'utilisateur
GET    /api/orders/:id             # Détail d'une commande
POST   /api/orders                 # Créer une commande
PUT    /api/orders/:id/cancel      # Annuler une commande
```

---

## 🚀 Intégration Backend - Checklist

### Phase 1 : Configuration
- [ ] Créer le fichier `.env` depuis `.env.example`
- [ ] Configurer `VITE_API_URL` avec l'URL du backend
- [ ] Installer Axios : `npm install axios`

### Phase 2 : Authentification
- [ ] Créer `AuthContext.jsx` pour gérer l'état global
- [ ] Implémenter `auth.service.js` avec login/register/logout
- [ ] Connecter les pages Connexion/Inscription aux services
- [ ] Tester le flux complet d'authentification

### Phase 3 : Produits
- [ ] Connecter `product.service.js` au backend
- [ ] Remplacer les données mockées par des appels API
- [ ] Implémenter la pagination et les filtres
- [ ] Ajouter le chargement et la gestion d'erreurs

### Phase 4 : Panier & Commandes
- [ ] Synchroniser `CartContext` avec le backend
- [ ] Sauvegarder le panier côté serveur (utilisateurs connectés)
- [ ] Implémenter le flux de checkout complet
- [ ] Intégrer les paiements (Orange Money, Wave, etc.)

### Phase 5 : Compte Utilisateur
- [ ] Créer les pages du compte (profil, commandes, adresses)
- [ ] Implémenter `user.service.js`
- [ ] Connecter aux endpoints backend

### Phase 6 : Admin
- [ ] Créer le panel d'administration
- [ ] Implémenter la gestion des produits (CRUD)
- [ ] Ajouter la gestion des commandes
- [ ] Dashboard avec statistiques

---

## 💡 Bonnes Pratiques

### ✅ À faire :
- Toujours utiliser les constantes de `routes.config.js`
- Centraliser les appels API dans les services
- Gérer les états de chargement (`loading`, `error`)
- Valider les données côté client avant envoi
- Afficher des messages d'erreur clairs

### ❌ À éviter :
- Hardcoder les URLs dans les composants
- Faire des appels API directement dans les composants (utiliser les services)
- Ignorer les erreurs réseau
- Oublier de gérer les états vides (pas de données)

---

## 📝 Exemple Complet d'Intégration

```javascript
// Dans un composant React
import { useState, useEffect } from 'react'
import { getAllProducts } from '../services/product.service'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts({ 
          page: 1, 
          limit: 12,
          sort: 'createdAt:desc'
        })
        setProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!products.length) return <EmptyState />

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

---

## 🔗 Ressources Utiles

- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Router Documentation](https://reactrouter.com/)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

## 📞 Prochaines Étapes

1. Créer le backend avec Node.js/Express
2. Définir le schéma de base de données (MongoDB/PostgreSQL)
3. Implémenter les endpoints listés ci-dessus
4. Tester avec Postman avant intégration frontend
5. Connecter le frontend aux endpoints backend

**L'architecture est prête pour accueillir le backend ! 🚀**
