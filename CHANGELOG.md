# Changelog

Tous les changements notables du portfolio SG_01.

---

## v2.0 — Refonte visuelle & optimisation (Août 2026)

### Palette unifiée deep navy

- **Suppression de 5 thèmes concurrents** (soft-light, pro-light, dark-pro, deep-navy, default) — un seul thème cohérent
- Nouvelle palette : `#4f8eff` / `#6ea8fe` / `#3366dd` / `#060b18`
- Variables CSS : `--accent`, `--accent2`, `--accent3`, `--glow`, `--bg`, `--line`, `--muted`
- Suppression des anciennes variables `--cyan`, `--blue`, `--violet`, `--pink`
- Nettoyage de ~600 lignes de code mort dans `style.css` (2130 → 1280 lignes)
- Alignement de `404.html`, `cv.html`, `admin.html`, `three-bg.js` sur la même palette

### Animations fluides

- Toutes les transitions utilisent `cubic-bezier(0.22, 1, 0.36, 1)` au lieu de `ease`
- Durées augmentées (0.25s → 0.3-0.4s) pour des mouvements plus doux
- Reveal au scroll : `0.8s` → `1s` avec `blur(6px)` au lieu de `blur(8px)`
- Stagger delays sur les grilles (services, projets, contact)
- Suppression de l'animation `glitchJitter`

### Footer redesigné

- Layout 2 colonnes (brand + nav) au lieu de 3 colonnes égales
- Lumière de séparation `linear-gradient` en haut
- Indicateur de disponibilité avec dot animé pulse
- Séparateur subtil entre contenu et copyright
- Copyright bar : flex row avec year + heure locale

### Hover subtil sur les projets

- Thumbnail : `scale(1.01)`, pas de saturation, pas de brightness
- Carte : `translateY(-2px)`, ombre légère
- Line glow : supprimé
- Border : opacité réduite (0.2)

---

## Optimisation universelle (tous appareils)

### Responsive — 6 breakpoints

| Breakpoint | Cible |
|---|---|
| `≤ 360px` | Très petits écrans, feature phones |
| `≤ 480px` | Smartphones compacts |
| `≤ 700px` | Smartphones standard |
| `≤ 880px` | Tablette portrait, burger menu |
| `≤ 960px` | Tablette paysage, grilles single-col |
| `≥ 1900px` | Ultrawide, container élargi |

- Touch targets : `min-height: 44px` sur tous les éléments interactifs
- Typography fluid : `clamp()` sur tous les headings
- Backdrop-filter réduit sur mobile (`blur(8px)` au lieu de `blur(22px)`)

### Performance Three.js — 3 niveaux de qualité

| | Desktop | Mobile | Low-end |
|---|---|---|---|
| Particules | 550 | 200 | 100 |
| Géométrie core | 48 seg | 48 seg | 24 seg |
| Torus segments | 150 | 150 | 60 |
| Anneaux | 3 | 3 | 2 |
| Électrons | 3 | 3 | 2 |
| Pixel ratio max | 2 | 1.5 | 1.5 |
| Antialias | oui | oui | non |
| Power preference | high-performance | low-power | low-power |
| Mouse parallax | oui | non | non |
| Canvas visible | oui | oui | non (si < 480px + low-end) |

- `cancelAnimationFrame` au tab-switch pour économiser la batterie
- `prefers-reduced-motion` : canvas masqué, animations CSS courtes (0.15s)

---

## Fonctionnalités

### Musique

- Musique de fond avec Web Audio API (+35% amplification)
- Volume par défaut 70%, slider réglable
- Fade in/out au lieu de cut brutal
- **CV** : pas de musique, même si activée sur le site
- Bouton audio avec icônes on/off

### Bienvenue

- Écran d'accueil à chaque visite avec bouton "Entrer"
- Musique activée au premier clic/touche/scroll

### Navigation

- Burger menu mobile avec backdrop blur
- Scroll progress bar en haut
- Bouton retour en haut avec apparition progressive
- Liens footer avec hover translateX

### Projets

- Filtres dynamiques par catégorie
- Modale détaillée avec nav prev/next, focus trap
- Images placeholders avec gradients
- Badge statut (En ligne, En cours, Terminé)

### Admin

- Interface complète pour gérer le contenu via `content.json`
- Sauvegarde directe sur GitHub (token personnel)
- Dashboard avec stats, historique, import/export JSON
- Upload média avec drag & drop

### SEO & PWA

- Open Graph, JSON-LD, canonical, sitemap.xml, robots.txt
- Manifest PWA installable
- Page 404 personnalisée
- CV imprimable avec styles print

---

## Stack

HTML5 · CSS3 · JavaScript vanilla · Three.js · GitHub Pages

## Contact

- Email : pro.secretgaming01@gmail.com
- Discord : secret_gaming01
- GitHub : https://github.com/Secret-gaming01
- Twitch : https://www.twitch.tv/secret_gaming01
