# 🧪 Guide de Test - Système d'Authentification

## Démarrage rapide

### 1. Lancer le serveur de développement

```powershell
cd c:\Users\david\instantplay-fullstack\frontend
npm run dev
```

L'app démarre sur `http://localhost:3000`

### 2. Naviguer dans l'app

#### Accueil (`http://localhost:3000`)
- Boutons pour accéder à login/signup

#### Signup (`http://localhost:3000/signup`)
**Formulaire** :
- Email : email@example.com
- Nom : Jean Dupont (optionnel)
- Mot de passe : Passw0rd123 (min 8 char, majuscule, chiffre)
- Confirmation : Passw0rd123

**Validations côté client** :
- Email invalide → "Email invalide"
- Mot de passe trop court → "Min. 8 caractères..."
- Pas de majuscule → "Le mot de passe doit contenir une majuscule"
- Pas de chiffre → "Le mot de passe doit contenir un chiffre"
- Mots de passe ne correspondent pas → "Les mots de passe ne correspondent pas"

#### Login (`http://localhost:3000/login`)
**Formulaire** :
- Email : email@example.com
- Mot de passe : Passw0rd123

**Validations** :
- Email vide/invalide → "Email invalide"
- Mot de passe vide → "Le mot de passe est requis"

#### Dashboard (`http://localhost:3000/dashboard`)
- Affiche message "Bienvenue au Dashboard !"
- Bouton "Se déconnecter"
- Vérifie la présence du JWT

## 🔧 Vérifier le JWT dans localStorage

Ouvrir **DevTools** (F12) → **Application** → **Local Storage** → `http://localhost:3000`

Clé : `auth_token`

### Exemple de JWT (structure)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## 📡 API Mock pour tester

Le service `lib/auth.ts` appelle ces endpoints :

```
POST http://localhost:3001/api/auth/login
POST http://localhost:3001/api/auth/signup
```

### Pour tester sans backend

**Option 1** : Modifier temporairement `lib/auth.ts` pour retourner un token de test

```typescript
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  // Mock réponse pour test
  const data: AuthResponse = {
    token: "mock_token_" + Date.now(),
    user: {
      id: "test_123",
      email: payload.email,
    }
  }
  setToken(data.token)
  return data
}
```

**Option 2** : Créer un backend simple en Node.js/Express

```javascript
// server.js
const express = require('express')
const app = express()
app.use(express.json())

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  res.json({
    token: 'eyJhbGc...',
    user: { id: '123', email }
  })
})

app.listen(3001)
```

## ✅ Checklist de test

- [ ] Page d'accueil charge
- [ ] Accès à `/login` et `/signup`
- [ ] Validation email (valide + invalide)
- [ ] Validation mot de passe (majuscule, chiffre, longueur)
- [ ] Validation confirmation mot de passe
- [ ] Erreurs affichées correctement
- [ ] Bouton "submit" en loading
- [ ] JWT stocké dans localStorage après login réussi
- [ ] Redirection vers `/dashboard` après login
- [ ] Dashboard vérifie la présence du JWT
- [ ] Redirection vers `/login` si pas de JWT
- [ ] Bouton logout supprime le JWT et redirige

## 🐛 Dépannage

### Les appels API échouent ?
→ Vérifier que `NEXT_PUBLIC_API_URL` est correcte dans `.env.local`

### Pas de JWT dans localStorage ?
→ Ouvrir DevTools → Network → vérifier les appels POST
→ Vérifier la réponse de l'API (statut 200, contient `token`)

### Redirection infinie sur dashboard ?
→ Vérifier que le JWT est bien stocké
→ Vérifier `getToken()` retourne une valeur non-null
→ Vérifier la logique dans `useEffect`

### Styles bizarres ?
→ Vérifier que Tailwind CSS est compilé
→ Build : `npm run build`
→ Redémarrer le serveur dev

## 📊 Structure des réponses attendues

### Login/Signup Success (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login/Signup Error (400+)
```json
{
  "message": "Email already exists" ou "Invalid credentials"
}
```

## 📝 Notes de développement

- Les pages utilisent `"use client"` car elles ont besoin de state et effects
- `lib/auth.ts` est côté client (can't import server modules)
- Les tokens ne sont validés côté client que pour l'expérience UX
- La vraie validation du JWT se fait côté backend
- `localStorage` n'est disponible que côté client (`typeof window !== 'undefined'`)

---

Bon test ! 🚀
