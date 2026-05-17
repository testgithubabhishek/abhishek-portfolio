# Abhishek Singh — Portfolio

Personal developer portfolio built with **React + Vite**, deployed via **GitHub Pages**.

🔗 **Live:** `https://testgithubabhishek.github.io/abhishek-portfolio/`

---

## Tech Stack

- **React 18** — UI components & hooks
- **Vite** — Build tool & dev server
- **GitHub Actions** — CI/CD auto-deploy on every push to `main`
- **GitHub Pages** — Free static hosting

---

## Project Structure

```
abhishek-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deploy to GitHub Pages
├── src/
│   ├── App.jsx               # Main portfolio component
│   └── main.jsx              # React entry point
├── index.html                # HTML shell
├── vite.config.js            # Vite config (sets base path)
├── package.json
├── .gitignore
└── README.md
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Deploying to GitHub Pages (First Time Setup)

### Step 1 — Create the GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it **`abhishek-portfolio`** (must match `base` in `vite.config.js`)
3. Set it to **Public**
4. Do **not** initialise with README (you already have files)

### Step 2 — Push your code

```bash
cd abhishek-portfolio

git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/testgithubabhishek/abhishek-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

GitHub Actions will now build and deploy automatically on every push to `main`. Your site will be live at:

```
https://testgithubabhishek.github.io/abhishek-portfolio/
```

> ⚠️ First deploy takes ~2 minutes. Check progress under the **Actions** tab.

---

## Making Updates

Just edit `src/App.jsx`, commit, and push — GitHub Actions handles the rest:

```bash
git add .
git commit -m "Update: changed project description"
git push
```

---

## Customisation Checklist

- [ ] Update name, email, GitHub, LinkedIn in `src/App.jsx`
- [ ] Replace placeholder projects with real ones
- [ ] Add your CV PDF to `public/` and link the Download CV button
- [ ] Update `vite.config.js` `base` if you rename the repo
- [ ] Add a custom domain under **Settings → Pages → Custom domain** (optional)
