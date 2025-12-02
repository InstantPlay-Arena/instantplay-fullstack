# Tests Unitaires - InstantPlay Frontend

## Configuration

Les tests utilisent **Jest** et **React Testing Library** pour tester :
- Services d'authentification
- Services de récupération des jeux
- Composants (GameCard, etc.)

## Installation des dépendances

```bash
npm install --legacy-peer-deps
```

## Exécuter les tests

### Tous les tests
```bash
npm test
```

### Mode watch (recharge automatique)
```bash
npm run test:watch
```

### Couverture de test
```bash
npm run test:coverage
```

## Structure des tests

```
lib/
  __tests__/
    auth.test.ts          # Tests du service d'authentification
    games.test.ts         # Tests du service de jeux

components/
  dashboard/
    __tests__/
      game-card.test.tsx  # Tests du composant GameCard
```

## Tests disponibles

### Auth Service Tests
- ✅ `setToken` : Stocke le JWT dans localStorage
- ✅ `getToken` : Récupère le JWT
- ✅ `clearToken` : Supprime le JWT
- ✅ `decodeToken` : Décode un JWT valide

### Games Service Tests
- ✅ `getMockGames` : Retourne un tableau de jeux
- ✅ Validation des propriétés des jeux
- ✅ Validation des notes (0-5)
- ✅ Gestion des erreurs API

### GameCard Component Tests
- ✅ Rendu avec les informations correctes
- ✅ Appel de callback `onPlay` au clic

## Exécuter un test spécifique

```bash
npm test -- auth.test.ts
npm test -- game-card.test.tsx
```

## Vérifier la couverture

```bash
npm run test:coverage
```

Cela génère un rapport de couverture dans le dossier `coverage/`.

## Notes importantes

- Les tests utilisent des mocks pour localStorage
- Les appels API sont mockés pour les tests sans réseau
- Les composants sont testés de manière isolée

---

Bon test ! 🚀
