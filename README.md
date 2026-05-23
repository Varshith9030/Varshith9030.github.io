# varshith.dev — portfolio

Personal portfolio for **Varshith Bonagiri** — offensive security practitioner, red team intern at FireCompass, author of [Mega-Finder](https://github.com/Varshith9030/Mega-Finder).

Pure HTML + CSS, no build step, no JavaScript framework, no trackers. Hosted free on GitHub Pages.

---

## Deploy on GitHub Pages — first time setup

### 1. Create the repo

The easiest setup uses a **user-site repo**, which gives you `https://<username>.github.io/` as the URL.

1. Create a new GitHub repo named exactly: `Varshith9030.github.io` (must match your GitHub username, case-sensitive).
2. Make it **public**.
3. Don't initialize with README — you're pushing this folder.

### 2. Push the files

From this folder on your laptop:

```bash
git init
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin https://github.com/Varshith9030/Varshith9030.github.io.git
git push -u origin main
```

### 3. Enable Pages

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under **Source**, pick **Deploy from a branch**.
3. Branch: **main**, Folder: **/ (root)**. Save.
4. Wait ~30 seconds. The site goes live at:
   **https://varshith9030.github.io/**

### 4. (Optional but recommended) custom domain

Free GitHub Pages supports custom domains. If you buy `varshith.dev` (around $12/year on Porkbun or Namecheap):

1. In your domain registrar, add a CNAME record: `varshith.dev` → `varshith9030.github.io`
2. In the repo: **Settings** → **Pages** → enter `varshith.dev` under Custom domain.
3. Check **Enforce HTTPS** once Let's Encrypt provisions the cert (5-30 min).

A custom domain reads much more professionally on a CV than a `.github.io` subdomain.

---

## File structure

```
.
├── index.html        # home — hero, focus, current role, certs, stack
├── projects.html     # Mega-Finder + Web App Pentest Tool, with placeholder for future
├── writeups.html     # placeholder for CTF writeups and research notes
├── about.html        # background, education, contact, reading list
├── assets/
│   └── style.css     # all styles
└── README.md         # this file
```

No build step. No dependencies. Open `index.html` in a browser and it works.

---

## Updating content

### Add a new project

Open `projects.html` and copy one of the existing `<article class="project">` blocks. The structure is:

- Project title + slug after `<span class="slash">/</span>`
- Date + language in `.project-meta`
- Tags in `.project-tags`
- Summary paragraph(s)
- A `.project-detections` callout if you want to highlight what the tool finds
- Links in `.project-links`

### Add a writeup

Open `writeups.html`. Inside the `<section>`, there's a commented-out template (`<article class="project">`). Uncomment it, fill in details, and remove the empty-state `.writeup-empty` block once you have at least one entry.

If you want full long-form writeups, the cleanest approach is one `.html` file per writeup in a `/writeups/` subfolder, then link to them from `writeups.html`. Each writeup file can reuse `assets/style.css`.

### Change the accent color

In `assets/style.css`, edit these three variables at the top:

```css
--accent: #65d962;       /* phosphor green */
--accent-dim: #3a8a3a;
--accent-glow: rgba(101, 217, 98, 0.15);
```

Try `#ffb454` (amber/Solarized) or `#5fb3d4` (cyan) for a different mood.

---

## Performance & privacy

- **Page weight**: ~50 KB total per page (HTML + CSS + 2 font files)
- **Trackers**: none
- **JavaScript**: none (no analytics, no ads, no service worker)
- **Fonts**: JetBrains Mono + Inter, loaded from Google Fonts. If you want to be fully external-dependency-free, self-host them in `assets/fonts/`.

---

## License

Personal portfolio content (text, project descriptions) is © Varshith Bonagiri. The HTML/CSS scaffold is free for you to reuse or fork.
