# Sochary Vanda — Portfolio

Personal portfolio site built with React, TypeScript, Vite and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Customizing content

All real content — bio, contact info, skills, education, achievements,
experience and project placeholders — lives in one file:

```
src/data/content.ts
```

Edit that file to update text without touching any component markup.

### Projects ("Content" section)

Each entry in the `projects` array (`src/data/content.ts`) becomes a
clickable chapter card. Clicking one opens a MacBook-style modal with the
`writing` field — replace the placeholder writing with your own project
write-ups, and swap `accent` for a different card color.

### Music player

Drop an MP3 at `public/audio/theme-song.mp3` and the floating play button
(bottom-left) will pick it up automatically — no code changes needed.

### Résumé / CV

Drop a PDF at `public/cv/portfolio.pdf` and the "Resume" link in the
Contact section will work automatically.

### GitHub stats

The GitHub section (`src/components/GitHubStats.tsx`) fetches live public
data for `SocharyVanda` directly from the GitHub REST API in the browser —
no build step or token required. If the API is unreachable or rate-limited,
it fails gracefully and shows a link to the profile instead.

### Theme

Dark/light mode is toggled from the nav bar and persisted in
`localStorage`. Color tokens live in `src/index.css` under `:root` and
`:root[data-theme="light"]`.
