# Sanket Patil — DevOps Portfolio

Personal portfolio website for a DevOps / Platform / SRE Engineer.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- shadcn/ui components
- Lucide React + React Icons

## Run Locally

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/devops-portfolio.git
cd devops-portfolio

# Install dependencies (use Node 18+)
npm install

# Start dev server (opens at http://localhost:3000)
npm run dev
```

## Build for Production

```bash
npm run build
# Output is in the ./dist folder — ready to deploy
```

## Preview Production Build

```bash
npm run preview
```

## Deploy to GitHub Pages

```bash
# One-time setup
npm install --save-dev gh-pages

# Add to package.json scripts: "deploy": "gh-pages -d dist"
# Add to package.json: "homepage": "https://YOUR_USERNAME.github.io/devops-portfolio"

# Build + deploy
npm run build
npx gh-pages -d dist
```

Your site will be live at `https://YOUR_USERNAME.github.io/devops-portfolio/`

> If deploying to a GitHub Pages sub-path, set `BASE_PATH=/devops-portfolio/` before building:
> ```bash
> BASE_PATH=/devops-portfolio/ npm run build
> ```

## Deploy to Vercel / Netlify (easiest)

Just connect your GitHub repo — both platforms auto-detect Vite and deploy with zero config.

## Environment Variables

| Variable    | Default | Description                              |
|-------------|---------|------------------------------------------|
| `PORT`      | `3000`  | Dev server port                          |
| `BASE_PATH` | `/`     | Base URL path (e.g. `/devops-portfolio/`)|

## Customise

All content is in `src/pages/home.tsx` — edit the data objects at the top of each section function.

- **Hero / name / title** — `Hero()` function
- **About text** — `About()` function
- **Skills** — `skillCategories` array in `Skills()`
- **Certifications** — `certifications` array in `Certifications()`
- **Projects** — `projects` array in `Projects()`
- **Experience** — `roles` array in `Experience()`
- **Contact links** — `Contact()` function (update GitHub + LinkedIn URLs)
