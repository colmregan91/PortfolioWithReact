# CLAUDE.md

This file gives Claude Code the context it needs to work effectively in this repository. Read it before making changes.

## Project Snapshot

React 18 portfolio site (Create React App) showcasing game and web development projects. Routing via React Router v6, contact form via EmailJS. **No backend, no database** — all project data lives in two static JSON files in `/public`.

**Core principle:** adding or updating portfolio projects should only require editing JSON and dropping in assets. Component code should not need to change. If you find yourself editing a component to add a project, stop and reconsider — you're probably doing it wrong.

## Tech Stack

- React 18.2.0 (vanilla JS, no TypeScript)
- React Router 6.22.3
- @emailjs/browser 4.4.1
- react-scripts 5.0.1 (CRA)
- Node.js 24 LTS
- No Redux, no Context API — props drilling only

## Commands

```bash
npm install      # install deps
npm start        # dev server (http://localhost:3000)
npm run build    # production build to /build
npm test         # CRA test runner
```

## Repository Layout

```
public/
  projects.json         ← Project catalog (cards + routing)
  projectsInfo.json     ← Project detail page content
  images/               ← Thumbnails, logos, screenshots
  videos/               ← Trailers, gameplay footage
src/
  App.js                ← Router + JSON fetch (central hub)
  index.js              ← Entry point
  components/
    Header.js           ← Typewriter role title animation
    Footer.js           ← Social links
    ProjectsGrid.js     ← Search + filter + card grid
    ProjectCard.js      ← Single thumbnail card
    ProjectInfo.js      ← Single-project detail page
    MultiProjectInfo.js ← Multi-project detail page
    Imageslider.js      ← Auto-rotating carousel (10s)
    About.js
    Contact.js          ← EmailJS form
    Backtotop.js
  styles.css            ← Header/nav/grid/cards/footer
  projInfo.css          ← Detail page layout
  about.css / contact.css / imageslider.css / backtotop.css
  index.css             ← Typography reset
```

## Architecture: Two Pillars

The codebase splits cleanly into two halves. Know which one you're in before editing.

### Pillar 1 — Stable Infrastructure

Hardcoded, project-independent. Don't touch unless the user explicitly asks for a structural/branding/UX change.

`Header.js`, `Footer.js`, `About.js`, `Contact.js`, `Imageslider.js`, `Backtotop.js`, `styles.css` (theme).

### Pillar 2 — Dynamic Project System

Data-driven. Components read JSON and render. To add or update a project, you almost always only edit:

- `public/projects.json`
- `public/projectsInfo.json`
- assets in `public/images/` and `public/videos/`

`App.js`, `ProjectsGrid.js`, `ProjectCard.js`, `ProjectInfo.js`, `MultiProjectInfo.js` only change when the underlying layout, routing, or filter logic itself needs to change.

## Data Contracts

### `projects.json` — catalog entry

```json
{
  "id": 12,
  "projectCount": 1,
  "title": "My Project",
  "image": "logo.png",
  "filter": "Solo Projects",
  "PageRoute": "/myproject"
}
```

- `id` — unique, must match the entry in `projectsInfo.json`
- `projectCount` — `1` → `ProjectInfo`, `2+` → `MultiProjectInfo`
- `image` — filename in `/public/images/`
- `filter` — category label; new values automatically produce a new filter button
- `PageRoute` — React Router path

Existing filter categories: `CoachCubeAI`, `Bloktopia`, `Topbox Studio (indie)`, `Solo Projects`, `Archived`.

Existing project IDs run 2–11. Use the next available `id` for new projects.

### `projectsInfo.json` — detail page entry

```json
{
  "id": 12,
  "pageIntro": "Para one & Para two",
  "title": "My Project",
  "introText": "Short summary",
  "infoText": "Tech para one & Tech para two",
  "image": ["shot1.jpg", "shot2.jpg"],
  "releasedate": "DD/MM/YY",
  "trailer": "trailer.mp4",
  "gameplay": "gameplay.mp4",
  "steamlink": "https://...",
  "githublink": "https://...",
  "techused": "React, Node.js",
  "role": "Full Development"
}
```

**Formatting rules — important:**

- `" & "` (space-ampersand-space) is the **paragraph delimiter** in text fields. Components split on it and render each chunk as a `<p>`. Do not use `\n` or `<br>`.
- In `MultiProjectInfo.js` only: `[LINK]url[LINK]` markup embeds hyperlinks inside text.
- Optional fields (`trailer`, `gameplay`, `steamlink`, `githublink`) should be empty strings `""` when unused, not `null` or omitted.
- `image` is always an array, even with one entry.

**Multi-project entries** use arrays for per-project fields:

```json
{
  "id": 2,
  "projectCount": 3,
  "title": ["Game One", "Game Two", "Game Three"],
  "introText": ["...", "...", "..."],
  "infoText": ["... & ...", "... & ...", "... & ..."],
  "image": ["img1.jpg", "img2.jpg", "img3.jpg"]
}
```

Array length must equal `projectCount`.

## Routing

`App.js` fetches both JSON files on mount and generates project routes dynamically:

```jsx
{projects.map((project) => (
  <Route
    path={project.PageRoute}
    element={
      project.projectCount < 2
        ? <ProjectInfo projectInfo={...} category={project.filter} />
        : <MultiProjectInfo projectInfo={...} projectCount={project.projectCount} />
    }
  />
))}
```

Static routes: `/` (ProjectsGrid), `/about`, `/contact`. New projects do **not** require new `<Route>` declarations.

## Expected Request Types

The owner of this repo will give you tasks that fall into a small set of categories. Here is how to handle each one. **In every case: edit JSON and assets, not components.**

### 1. "Change the text in [project]'s intro / description / etc."

1. Find the project by name in `public/projectsInfo.json`.
2. Identify the field (`pageIntro`, `introText`, `infoText`).
3. Edit the string. Preserve the `" & "` paragraph delimiter — if the user gives you multiple paragraphs, join them with `" & "`. Never use `\n` or `<br>`.
4. If editing a multi-project entry, the field is an array — edit the correct index (the order matches the `title` array).
5. For `MultiProjectInfo` entries, hyperlinks inside text use `[LINK]url[LINK]` markup — preserve any existing markup and use the same syntax for new links.
6. Don't touch any other field.

### 2. "Update / replace / add an image for [project]"

When the user provides an image file:

1. **Inspect the image first** — check its dimensions and aspect ratio with a quick bash command (e.g. `file path/to/image` or `identify` if ImageMagick is available, otherwise read with Python/Pillow). You need to know what you're working with.
2. **Determine the target slot:**
   - Card thumbnail → `projects.json` → `image` (single filename)
   - Detail page screenshot → `projectsInfo.json` → `image[]` array
3. **Match the existing asset's shape.** Look at the file currently in that slot in `public/images/` and check its dimensions. The CSS expects a specific shape (e.g. card grid is `250px` wide). **The new image must be made to fit the existing space — do not modify CSS, layout, or component code to fit a new image.**
4. **If the new image doesn't match:** resize / crop / pad it to match the existing asset's dimensions and aspect ratio before saving. Use ImageMagick (`convert`/`magick`) or Python Pillow. Preserve the original file format where reasonable, or convert to match the slot it's replacing (`.png` for logos with transparency, `.jpg` for screenshots).
5. **Filename:** keep it descriptive and lowercase-with-hyphens or match the existing project's naming convention. Save to `public/images/`.
6. **Update the JSON** to reference the new filename. For replacements in an `image[]` array, replace at the correct index unless the user says "add" — then append.
7. **Never delete the original asset file** unless the user explicitly asks. Just stop referencing it from the JSON.

**Sizing reference:**
- Card thumbnails: 250px wide grid cell — square or near-square logos work best.
- Detail page screenshots: variable, but check sibling images in the same project's `image[]` array and match their aspect ratio.

### 3. "Update / replace / add a video for [project]"

1. **Inspect the video** — check codec, container, dimensions, duration (`ffprobe` if available).
2. **Determine the slot:** `trailer` or `gameplay` in `projectsInfo.json`. Both are single string filenames, not arrays.
3. **Format requirements:** must be `.mp4` (H.264) for browser compatibility. If the user provides `.mov`, `.webm`, `.avi`, or anything else, transcode to `.mp4` with `ffmpeg` before saving.
4. **Don't resize or re-encode unnecessarily** if the source is already a web-friendly mp4 — just copy it in.
5. Save to `public/videos/`.
6. Update the relevant field in `projectsInfo.json`. Empty string `""` means "no video for this slot" — replace it with the filename, don't leave both.
7. **Don't change any component code** to accommodate a different video format. Convert the video to fit the player, not the player to fit the video.

### 4. "Add a new project"

Follow the full new-project workflow below. Ask the user for anything missing (title, filter category, route name, links, tech stack, role) before starting — don't invent values. Once you have what you need:

1. Pick the next available `id` (currently 12+).
2. Add entry to `projects.json`.
3. Add matching entry to `projectsInfo.json` with the same `id`.
4. Process and save any provided images/videos using the rules above.
5. Confirm to the user what route the project will live at and which filter category it joined.

### 5. "Update a link / tech stack / release date / role"

Single-field edits in `projectsInfo.json`. Find by `id` or `title`, edit the field, done.

### General rules for all of the above

- **Always read the relevant JSON file before editing it** so you know the current shape and don't break sibling entries.
- **Validate the JSON after editing** — a stray comma blanks the entire site. If unsure, run `node -e "JSON.parse(require('fs').readFileSync('public/projects.json'))"` to verify.
- **Never edit `App.js`, `ProjectsGrid.js`, `ProjectInfo.js`, `MultiProjectInfo.js`, or any CSS file** in response to these requests. If you think you need to, stop and tell the user why — there is almost certainly a JSON-only solution.
- **Confirm before deleting.** Removing an entry, an image reference, or a project should always be confirmed with the user first.
- **Report what you did concisely** — which file(s), which fields, which assets — so the user can verify in the dev server.

---

## Standard Workflows

### Adding a new project

1. Append entry to `public/projects.json` with the next available `id`.
2. Append matching entry (same `id`) to `public/projectsInfo.json`.
3. Drop thumbnail/screenshots into `public/images/`, videos into `public/videos/`.
4. Verify with `npm start` — card should appear on home, filter button should work, detail route should render.
5. Do not touch any `.js` file.

### Updating a project

Find by `id` in the relevant JSON file and edit the field. Cheat sheet:

| Change | File | Field |
|---|---|---|
| Card thumbnail | `projects.json` | `image` |
| Title | both | `title` |
| Filter category | `projects.json` | `filter` |
| Intro / description / tech text | `projectsInfo.json` | `pageIntro` / `introText` / `infoText` |
| Screenshots | `projectsInfo.json` | `image[]` |
| Trailer / gameplay video | `projectsInfo.json` | `trailer` / `gameplay` |
| Steam / GitHub link | `projectsInfo.json` | `steamlink` / `githublink` |
| Tech stack | `projectsInfo.json` | `techused` |
| Release date | `projectsInfo.json` | `releasedate` |

## Styling

**Theme:**
- Background `#16213e` (dark navy)
- Accent `#64ffda` (cyan)
- Text `#ffffff`
- Hovers use low-opacity `rgba` overlays

**CSS file scope:**

| File | Scope |
|---|---|
| `styles.css` | Header, nav, search, filter buttons, grid, cards, footer |
| `projInfo.css` | Detail page (flexbox + media sidebar) |
| `about.css` | About (CSS Grid, photo + content) |
| `contact.css` | Contact form (two-column) |
| `imageslider.css` | Carousel |
| `backtotop.css` | Fixed scroll button |
| `index.css` | Typography reset |

Project card grid: `grid-template-columns: repeat(auto-fill, 250px);`

## Conventions and Guardrails

- **JSON before JS.** If a request can be satisfied by editing `projects.json` / `projectsInfo.json`, do that and stop. Don't refactor components opportunistically.
- **Vanilla JS only.** Don't introduce TypeScript, Redux, Context API, or new state libraries.
- **No backend.** Don't add API calls, server routes, or databases. Project data is static JSON.
- **Keep IDs consistent across both JSON files.** A mismatched `id` silently breaks the detail page.
- **Validate JSON after edits.** Trailing commas or unbalanced brackets break the fetch and blank the entire site.
- **Paragraph breaks use `" & "`.** Not `\n`, not `<br>`. The split happens in component code.
- **Asset paths are relative to `/public`.** In JSON, write `"shot1.jpg"`, not `"/images/shot1.jpg"`.
- **Don't hardcode new routes in `App.js`.** Routes generate from `projects.json`.
- **Prefer minimal diffs.** This codebase is intentionally simple — resist sweeping rewrites.
