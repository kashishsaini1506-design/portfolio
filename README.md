# Kashish Saini — AI Portfolio

A single-page, animated AI/tech portfolio website.

## Project structure
```
kashish-saini-portfolio/
├── index.html          # Main page markup
├── style.css            # All styling (neon cyan/purple theme, animations)
├── script.js             # Cursor animation, neural-network background, nav, scroll reveals
├── assets/
│   ├── images/
│   │   └── favicon.svg  # Browser tab icon (KS initials)
│   └── README.txt       # Notes on adding your own photo/resume
└── README.md            # This file
```

## Features
- Neon cyan + purple animated theme
- Custom animated cursor (glowing dot + trailing ring, magnetic hover)
- Animated neural-network canvas background
- Scroll-reveal animations
- Fully responsive (mobile nav menu included)
- Sections: Hero, About, Skills, Projects, Experience, Education, Contact

## How to view locally
Just open `index.html` in any browser — no build step or server required.

## How to add your resume
Place your resume PDF at `assets/resume.pdf`. The "Download Resume" button
in the hero section already links to that path.

## How to deploy for free (get a live link)
**Netlify Drop** (no signup):
1. Go to https://app.netlify.com/drop
2. Drag the whole project folder onto the page
3. Get an instant live link

**Vercel:**
1. Sign up free at https://vercel.com
2. "Add New Project" → "Deploy without Git" (or drag-and-drop)
3. Upload this folder, set project name to `kashish-saini`
4. Deploy — you'll get `https://kashish-saini.vercel.app`

## Customizing
- Colors: edit the `:root` variables at the top of `style.css`
- Content/text: edit `index.html` directly
- Project cards, skills, timeline: all plain HTML inside `index.html`
