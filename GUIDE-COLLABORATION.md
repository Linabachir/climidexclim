# Travailler ensemble sur Climidex — guide débutant

Ce guide explique comment récupérer le projet, le lancer et envoyer des modifications sur GitHub sans écraser le travail de l'autre personne.

Repository privé : https://github.com/Linabachir/climidexclim

## 1. À installer une seule fois

- Git : https://git-scm.com/downloads
- Node.js 20 ou plus récent : https://nodejs.org
- Visual Studio Code : https://code.visualstudio.com/

Sous Windows, redémarrer l'ordinateur après l'installation si une commande n'est pas reconnue.

## 2. Accepter l'invitation GitHub

1. Ouvrir l'e-mail envoyé par GitHub.
2. Cliquer sur **View invitation**.
3. Cliquer sur **Accept invitation**.
4. Vérifier que le repository Climidex est visible.

## 3. Télécharger le projet la première fois

Ouvrir PowerShell ou le terminal de VS Code, puis lancer :

```bash
git clone https://github.com/Linabachir/climidexclim.git
cd climidexclim
npm install
```

Le téléchargement avec `git clone` ne doit être fait qu'une seule fois.

## 4. Récupérer le fichier de configuration

Les fichiers contenant des clés ou mots de passe ne sont volontairement pas sur GitHub.

Pour commencer à modifier le design, demander à Lina uniquement ce fichier et le placer exactement ici :

```text
apps/storefront/.env.local
```

Ne jamais envoyer ce fichier sur GitHub, dans un groupe public ou dans une capture d'écran.

## 5. Lancer le site

Dans le dossier du projet, lancer uniquement le storefront :

```bash
npm run storefront:dev
```

Adresses utiles :

- Site : http://localhost:8000/fr

Arrêter les serveurs avec `Ctrl + C` dans le terminal.

Cette méthode suffit pour modifier les textes, les couleurs, les images, les pages et le responsive. Le fichier `.env.local` connecte le site au backend Climidex existant.

### Docker et le backend : seulement plus tard

Docker n'est pas nécessaire pour commencer. Il servira uniquement si la personne doit modifier Medusa, la base de données, les produits, les commandes ou le fonctionnement interne du panier. Dans ce cas, demander à Lina le fichier `apps/backend/.env` et la procédure correspondante.

## 6. Règle importante : une branche par modification

Ne pas travailler directement sur `master`. Avant de commencer :

```bash
git switch master
git pull origin master
git switch -c prenom-description
```

Exemples de noms de branche :

```text
melvin-footer
lina-page-produit
melvin-correction-mobile
```

Utiliser uniquement des lettres minuscules et des tirets, sans espace ni accent.

## 7. Enregistrer et envoyer son travail

Voir les fichiers modifiés :

```bash
git status
```

Ajouter les modifications, créer un commit et pousser la branche :

```bash
git add -A
git commit -m "Améliore le panier sur mobile"
git push -u origin prenom-description
```

Remplacer `prenom-description` par le vrai nom de la branche.

## 8. Demander la validation avec une Pull Request

Après le `git push`, GitHub affiche généralement un bouton **Compare & pull request**.

1. Cliquer sur **Compare & pull request**.
2. Écrire en quelques mots ce qui a changé.
3. Ajouter une capture si le changement est visuel.
4. Cliquer sur **Create pull request**.
5. L'autre personne vérifie puis clique sur **Merge pull request**.

Une Pull Request évite d'envoyer directement un bug sur le site.

## 9. Commencer une nouvelle modification

Une fois la Pull Request fusionnée :

```bash
git switch master
git pull origin master
git switch -c prenom-nouvelle-modification
```

Créer une nouvelle branche pour chaque nouveau sujet.

## 10. Récupérer le travail de l'autre personne

Si aucun fichier local n'est en cours de modification :

```bash
git switch master
git pull origin master
```

Si `git status` affiche des fichiers modifiés, faire d'abord un commit ou demander de l'aide. Ne pas utiliser `git reset --hard` : cette commande peut effacer le travail local.

## 11. Routine recommandée à chaque session

```bash
git switch master
git pull origin master
git switch -c prenom-description
```

Après les modifications :

```bash
git status
npm run build
git add -A
git commit -m "Description claire de la modification"
git push -u origin prenom-description
```

Puis créer la Pull Request sur GitHub.

## 12. En cas de problème

### `git pull` signale un conflit

Ne pas supprimer de fichiers au hasard. Envoyer une capture du terminal et attendre avant de pousser.

### Le site ne démarre pas

Vérifier dans cet ordre :

1. Node.js 20 ou plus récent est installé avec `node -v`.
2. Le fichier `apps/storefront/.env.local` est présent.
3. Les dépendances sont installées avec `npm install`.
4. Aucun autre programme n'utilise le port 8000.

### GitHub refuse le push

Vérifier que l'invitation a été acceptée et que le compte GitHub possède l'autorisation **Write**.

## Règles de travail à deux

- Toujours faire un `git pull` avant de commencer.
- Une personne = une branche de travail.
- Ne jamais partager les fichiers `.env` publiquement.
- Faire des petits commits avec un message clair.
- Tester la page sur ordinateur et mobile avant la Pull Request.
- Ne jamais pousser directement sur `master` si l'autre personne travaille aussi.
