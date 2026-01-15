# Contribution à FlexSave 🤝

Merci de votre intérêt pour FlexSave ! Ce document explique comment contribuer au projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Style de Code](#style-de-code)
- [Processus de Pull Request](#processus-de-pull-request)

---

## Code de Conduite

- Soyez respectueux et inclusif
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour la communauté

---

## Comment Contribuer

### 🐛 Signaler un Bug

1. Vérifiez que le bug n'a pas déjà été signalé
2. Ouvrez une issue avec le template "Bug Report"
3. Incluez les étapes pour reproduire le problème

### 💡 Proposer une Fonctionnalité

1. Ouvrez une issue avec le template "Feature Request"
2. Décrivez clairement la fonctionnalité proposée
3. Attendez la validation avant de commencer le développement

### 🔧 Soumettre du Code

1. Forkez le repository
2. Créez une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'feat: ajoute ma fonctionnalité'`)
4. Poussez la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

---

## Style de Code

### Python (Backend)

- Suivez PEP 8
- Utilisez les type hints
- Documentez avec docstrings

```python
def calculate_flexibility(vault_amount: float, percentage: float = 0.10) -> float:
    """
    Calcule le montant de flexibilité disponible.
    
    Args:
        vault_amount: Montant total du coffre
        percentage: Pourcentage de flexibilité (défaut: 10%)
    
    Returns:
        Montant disponible pour retrait anticipé
    """
    return vault_amount * percentage
```

### TypeScript (Web)

- Utilisez TypeScript strict
- Préférez les interfaces aux types
- Nommez clairement les composants

### Dart (Mobile)

- Suivez les conventions Flutter
- Utilisez l'architecture proposée
- Documentez les widgets publics

---

## Processus de Pull Request

1. Assurez-vous que les tests passent
2. Mettez à jour la documentation si nécessaire
3. Remplissez le template de PR
4. Attendez la review

### Convention de Commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` – Nouvelle fonctionnalité
- `fix:` – Correction de bug
- `docs:` – Documentation
- `style:` – Formatage
- `refactor:` – Refactoring
- `test:` – Tests
- `chore:` – Maintenance

---

## 🙏 Merci

Merci de contribuer à FlexSave ! Ensemble, nous construisons une meilleure solution d'épargne.
