# SG_01 — Portfolio

Portfolio personnel de **Secret_gaming01**, développeur Web & C# basé au Québec, Canada.

## Liens

- Site en ligne : https://secret-gaming01.github.io/Portfolio/
- CV imprimable : https://secret-gaming01.github.io/Portfolio/cv.html
- Panneau d'administration : https://secret-gaming01.github.io/Portfolio/admin.html
- Repo GitHub : https://github.com/secret-gaming01/Portfolio

## Fonctionnalités

- Fond 3D temps réel (cœur d'énergie, Three.js) avec parallaxe souris et pause automatique
- Effet typing sur le hero, titres avec effet "decode", animations au scroll
- Filtres de projets + fiche détaillée en modale pour chaque projet
- Section GitHub alimentée en direct par l'API GitHub
- Formulaire de contact fonctionnel (FormSubmit)
- Compteurs de visites/vues animés (abacus.jasoncameron.dev)
- Son ambiant génératif (Web Audio API), curseur lumineux, cartes tilt 3D
- SEO complet : Open Graph, JSON-LD, canonical, sitemap.xml, robots.txt
- PWA installable (manifest), page 404 personnalisée, CV imprimable

## Contenu modifiable sans toucher au code

Tout le contenu éditable vit dans [`data/content.json`](data/content.json) :

- Phrases du typing du hero
- Compétences (nom + pourcentage)
- Bandeau défilant
- Projets (titre, catégorie, descriptions, tags, stack, liens)

Deux façons de le modifier :

1. **Panneau admin** (`admin.html`) — interface complète, sauvegarde directe sur GitHub via un token personnel (fine-grained, permission Contents: Read and write). Le token reste stocké uniquement dans le navigateur.
2. **Édition directe** du fichier `data/content.json` dans le repo.

Le site applique les changements dès la publication (délai GitHub Pages : 1 à 2 minutes).

## Structure

```
├── index.html          # Page principale
├── admin.html          # Panneau d'administration (noindex)
├── cv.html             # CV imprimable
├── 404.html            # Page 404
├── data/
│   └── content.json    # Contenu éditable (skills, projets, hero…)
├── css/style.css       # Styles
├── js/main.js          # Interactions & rendu du contenu
├── js/three-bg.js      # Scène 3D Three.js
├── assets/avatar.png   # Photo de profil
├── manifest.webmanifest
├── robots.txt / sitemap.xml
```

## Stack

HTML5 · CSS3 · JavaScript vanilla · Three.js · GitHub Pages

## Crédits

- Musique de fond : fichier fourni par le propriétaire du site (`assets/music1.mp3`)

## Déploiement

Automatique : chaque push sur `main` est publié par GitHub Pages.

## Contact

- Email : pro.secretgaming01@gmail.com
- Discord : secret_gaming01
- Twitch : https://www.twitch.tv/secret_gaming01
