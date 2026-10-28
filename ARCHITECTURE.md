# Portfolio Project — Architecture Overview

## Project Overview

A React-based portfolio website showcasing game development and web development work. Built with Create React App (React 18), React Router v6, and EmailJS for contact form handling. All project data is stored in static JSON files — no backend, no database.

The site is designed so that **adding or updating portfolio projects requires only JSON edits and asset uploads**, with no component code changes needed.

---

## Directory Structure

```
/PortfolioWithReact/
├── public/
│   ├── projects.json          ← PRIMARY: Project catalog (cards + routing)
│   ├── projectsInfo.json      ← PRIMARY: Project detail data (full page content)
│   ├── index.html
│   ├── images/                ← All project thumbnails, logos, screenshots
│   └── videos/                ← Game trailers and gameplay footage
├── src/
│   ├── index.js               ← React entry point
│   ├── App.js                 ← Router setup + data fetching (central hub)
│   ├── index.css              ← Typography reset
│   ├── App.css
│   ├── styles.css             ← Header, nav, projects grid, filter buttons
│   ├── about.css
│   ├── contact.css
│   ├── projInfo.css           ← Single/multi project detail page layout
│   ├── imageslider.css
│   ├── backtotop.css
│   └── components/
│       ├── Header.js          ← Animated typewriter role titles
│       ├── Footer.js          ← Social links + copyright
│       ├── ProjectsGrid.js    ← Search/filter UI + project card layout
│       ├── ProjectCard.js     ← Single project thumbnail card
│       ├── ProjectInfo.js     ← Single-project detail page
│       ├── MultiProjectInfo.js← Multi-project detail page
│       ├── Imageslider.js     ← Auto-rotating image carousel
│       ├── About.js           ← About/Bio page
│       ├── Contact.js         ← Contact form + EmailJS
│       └── Backtotop.js       ← Fixed scroll-to-top button
└── package.json
```

---

## Architecture: Two Pillars

The codebase separates cleanly into two pillars:

### Pillar 1 — Stable Infrastructure (rarely changes)

These components are hardcoded and independent of project data. They define the site's structure, branding, and UX — they do not need to change when projects are added or updated.

| Component | Purpose | Change Trigger |
|---|---|---|
| `Header.js` | Animated typewriter cycling through role titles | Only if role titles change |
| `Footer.js` | Social links, copyright | Only if social links change |
| `About.js` | Bio/facts page | Only if bio content changes |
| `Backtotop.js` | Scroll-to-top UX button | Never |
| `Imageslider.js` | Auto-rotating image carousel (10s interval) | Never |
| `Contact.js` | Contact form with EmailJS integration | Only if contact info/service changes |
| `styles.css` | Global theme: dark blue `#16213e`, cyan `#64ffda` accent | Only for visual redesign |

### Pillar 2 — Dynamic Project System (changes with each project update)

These are the parts that change when you add, update, or modify portfolio projects. The system is fully data-driven — components read from JSON and render accordingly.

| File | Role | Modified When |
|---|---|---|
| `public/projects.json` | Project catalog: IDs, titles, thumbnails, filters, routes | Adding/removing/renaming projects |
| `public/projectsInfo.json` | Project detail content: descriptions, images, videos, links | Updating project content |
| `public/images/` | Thumbnail and screenshot assets | Adding new project images |
| `public/videos/` | Trailer and gameplay video assets | Adding new project videos |
| `App.js` | Fetches both JSON files; generates all routes dynamically | Only if routing logic changes |
| `ProjectsGrid.js` | Renders filtered/searchable card grid from props | Only if search/filter logic changes |
| `ProjectCard.js` | Renders individual project card thumbnail | Only if card layout changes |
| `ProjectInfo.js` | Renders full detail page for single-project entries | Only if detail page layout changes |
| `MultiProjectInfo.js` | Renders full detail page for multi-project entries | Only if multi-project layout changes |

---

## Data Structure

### `projects.json` — Project Catalog

Each entry controls the card grid and routing:

```json
{
  "id": 11,
  "projectCount": 1,
  "title": "Coach Cube",
  "image": "COACHCUBEAI_ICON_DARK.png",
  "filter": "Coach Cube",
  "PageRoute": "/coachcube"
}
```

| Field | Purpose |
|---|---|
| `id` | Unique identifier — must match `projectsInfo.json` |
| `projectCount` | `1` = single project page, `2+` = multi-project page |
| `title` | Display name on card and page |
| `image` | Thumbnail filename in `/public/images/` |
| `filter` | Category for filter buttons (groups by company/studio) |
| `PageRoute` | React Router path for the detail page |

**Current filter categories:**
- Coach Cube
- Bloktopia
- TopBox Studio (indie)
- Solo Projects
- Archived

**Current projects (IDs 2–11):**

| ID | Title | Route | Type |
|---|---|---|---|
| 2 | Blok Arcade | `/blokArcade` | Multi (3) |
| 3 | Token Tickers | `/tokentickers` | Single |
| 4 | BlokBuster | `/blokbuster` | Single |
| 5 | Bionic Blitz | `/bionicblitz` | Single |
| 6 | Taylor's Tales | `/taylorstales` | Multi (2) |
| 7 | Crosswaves | `/crosswaves` | Single |
| 8 | Macro Tracker | `/macrotracker` | Single |
| 9 | Trick or Treat | `/trickortreat` | Single |
| 10 | 3D Street Fighter | `/3dstreetfighter` | Single |
| 11 | Coach Cube | `/coachcube` | Single |

Next available `id`: 12

---

### `projectsInfo.json` — Project Detail Content

Each entry matches a project by `id` and provides all content for the detail page:

```json
{
  "id": 11,
  "pageIntro": "First intro paragraph & Second intro paragraph",
  "title": "Coach Cube",
  "introText": "Short description text",
  "infoText": "Technical paragraph one & Technical paragraph two",
  "additionalText": "Optional extra paragraph after media panel",
  "image": ["screenshot1.jpg", "screenshot2.jpg"],
  "releasedate": "DD/MM/YY",
  "trailer": "trailer.mp4",
  "gameplay": "gameplay.mp4",
  "gameplayLabel": "Custom Video Heading",
  "trailerLabel": "Custom Trailer Heading",
  "steamlink": "https://...",
  "githublink": "https://...",
  "techused": "Unity & C# & ASP.NET",
  "role": "Front-End Development & API Integration & UI Design"
}
```

#### Field reference

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Must match `projects.json` |
| `pageIntro` | Yes | Page-level intro; `" & "` = paragraph break |
| `title` | Yes | Page heading |
| `introText` | Yes | Per-project intro below title; `" & "` = paragraph break |
| `infoText` | Yes | Technical section; `" & "` = paragraph break |
| `additionalText` | No | Extra text block between media panel and Technical Info; `" & "` = paragraph break. Omit or use `""` if unused. *(Single-project only)* |
| `image` | Yes | Array of filenames in `/public/images/` |
| `releasedate` | No | Shown as a tag in project details. Use `""` if unused. |
| `trailer` | No | Filename in `/public/videos/`. Use `""` if unused. |
| `gameplay` | No | Filename in `/public/videos/`. Use `""` if unused. |
| `gameplayLabel` | No | Overrides the default "Gameplay" heading above the gameplay video. Omit or use `""` for default. *(Single-project only)* |
| `trailerLabel` | No | Overrides the default "Trailer" heading above the trailer video. Omit or use `""` for default. *(Single-project only)* |
| `steamlink` | No | Full URL shown as a tag. Use `""` if unused. |
| `githublink` | No | Full URL shown as a tag. Use `""` if unused. |
| `techused` | No | `" & "` delimited list — renders as a tag grid when 2+ items. |
| `role` | No | `" & "` delimited list — renders as a tag grid when 2+ items. |

#### Text formatting rules

- `" & "` (space-ampersand-space) is the **paragraph/item delimiter** in all text fields. Components split on it and render each chunk as a `<p>`. Do not use `\n` or `<br>`.
- In `MultiProjectInfo.js` only: `[LINK]url` at the end of a paragraph segment embeds a hyperlink. Format: `...some text [LINK] https://example.com`. The URL is used as both the href and the link text.

---

### Project Details Tag/Grid System

The project details section (Released, Steam, GitHub, Tech, Role) uses a pill/tag grid system rendered entirely from JSON fields.

**Rendering rules:**

- `releasedate`, `steamlink`, `githublink` — rendered as small pills. When any of these are present, they are grouped in a `detail-links-row` container that takes the full width of the details bar, keeping them on their own row above tech and role.
- `techused` — if the value contains `" & "` (2+ items), renders as a **4-column tag grid** using `.tech-grid`. If a single item, renders as a plain pill.
- `role` — if the value contains `" & "` (2+ items), renders as a **3-column tag grid** using `.role-grid`. If a single item, renders as a plain pill.
- Fields that are empty strings or falsy are not rendered — no placeholder or empty space appears.

**CSS classes involved (`projInfo.css`):**

| Class | Purpose |
|---|---|
| `.details-grid` | Flex-wrap container for all project metadata pills |
| `.detail-links-row` | Groups Released/Steam/GitHub pills together on their own row (`flex-basis: 100%`) |
| `.detail-tag` | Individual pill/tag (Release date, Steam, GitHub, single-item tech/role) |
| `.role-grid-item` | Forces a tag to its own full-width row (`flex-basis: 100%`) — applied to multi-item tech and role |
| `.tech-grid` | 4-column grid inside a tech tag |
| `.role-grid` | 3-column grid inside a role tag |
| `.role-tag` | Individual item inside `.tech-grid` or `.role-grid` |

**Visual row order in project details:**
1. Released / Steam / GitHub pills (if any)
2. Tech grid (if `techused` has 2+ items)
3. Role grid (if `role` has 2+ items)

---

### Multi-project entries

When `projectCount` is 2 or more, per-project fields become arrays. Array length must equal `projectCount`.

```json
{
  "id": 2,
  "projectCount": 3,
  "pageIntro": "Shared intro paragraph & Second paragraph",
  "title": ["Game One", "Game Two", "Game Three"],
  "introText": ["Intro 1", "Intro 2", "Intro 3"],
  "infoText": ["Info 1 & More 1", "Info 2 & More 2", "Info 3 & More 3"],
  "image": ["img1.mp4", "img2.mp4", "img3.mp4"],
  "techused": "Unity & C# & Photon Fusion",
  "role": [
    "Role A & Role B & Role C",
    "Role D & Role E & Role F",
    "Role G & Role H & Role I"
  ]
}
```

- `pageIntro` is shared across all sub-projects (single string).
- `title`, `introText`, `infoText`, `image` are arrays indexed by project position.
- `techused` is shared across all sub-projects (single string, same grid rendering rules apply).
- `role` can be either a **single shared string** or an **array** (one entry per sub-project). The component detects the type with `Array.isArray()` and indexes accordingly. Use an array when each sub-project has different roles.
- `releasedate`, `steamlink`, `githublink` are shared (single values). In practice these are left as `""` for multi-project entries — the tag system still applies if populated.

---

## Detail Page Layout (`projInfo.css`)

### Single-project page (`ProjectInfo.js`) — section order

1. **Introduction** (`.introduction`) — `pageIntro` text
2. **Project details row** (`.project-details-row`) — image carousel + metadata tags
3. **Additional text** (`.introduction`) — `additionalText` if present
4. **Technical Information** (`.technical-info`) — `infoText` text
5. **Gameplay video** (`.media-section`) — labeled by `gameplayLabel` or "Gameplay"
6. **Trailer video** (`.media-section`) — labeled by `trailerLabel` or "Trailer" — only if `trailer` is non-empty

### Multi-project page (`MultiProjectInfo.js`) — section order (repeated per sub-project)

1. **Introduction** (`.introduction`) — `pageIntro` (rendered once above all sub-projects)
2. Per sub-project loop:
   - Sub-project title + `introText`
   - **Video + details wrapper** (`.video-details-wrapper`) — video panel + metadata tags as a connected unit
   - **Technical Information** (`.technical-info`) — `infoText`

### Media panel sizing

All media panels (image carousel, video panels) share the same dimensions:
- Width: 90% (video panels in `.video-details-wrapper` stretch to 100% of the wrapper)
- Height: 500px
- Videos: `object-fit: contain`
- Images: `object-fit: cover`

### `video-details-wrapper` (MultiProjectInfo only)

In multi-project pages, each video and its metadata tags are wrapped in `.video-details-wrapper`:
- 75% wide, horizontally centered
- Contains the `.media-section` (video) and `.project-info` (tags) stacked vertically with no gap
- The `.project-info` uses `border-radius: 0 0 8px 8px` so it appears as a visual extension of the video panel above it

---

## Data Flow

```
projects.json ──────────────────────────────────────────┐
    ↓                                                   │
App.js (useEffect fetch on mount)                       │
    ↓ setState(projects)                                │
    ├── ProjectsGrid (prop: projects)                   │
    │       ├── Filter buttons (dynamic from .filter)  │
    │       └── ProjectCard × N (prop: project)        │
    │               └── Link → project.PageRoute        │
    │                                                   │
    └── Dynamic Route generation ←──────────────────────┘
            ↓
            projectCount < 2 → <ProjectInfo>
            projectCount ≥ 2 → <MultiProjectInfo>
                ↓
                projectsInfo.find(t => t.id === project.id)
                ↓
                Renders full detail page from JSON data
```

---

## Routing

All project routes are **generated dynamically** in `App.js` from `projects.json`. No route needs to be hardcoded when a new project is added.

```jsx
// App.js — dynamic route generation
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

**Static routes (hardcoded):**
- `/` → ProjectsGrid (Home)
- `/about` → About
- `/contact` → Contact

---

## How to Add a New Project

### Step 1 — Add to `public/projects.json`

```json
{
  "id": 12,
  "projectCount": 1,
  "title": "My New Project",
  "image": "my-project-logo.jpg",
  "filter": "Solo Projects",
  "PageRoute": "/mynewproject"
}
```

- Use the next available `id` (currently 12)
- Use an existing `filter` category or add a new one (new category auto-appears as a filter button)
- `projectCount: 1` for a single project, higher number for multi-project

### Step 2 — Add to `public/projectsInfo.json`

```json
{
  "id": 12,
  "pageIntro": "Opening paragraph & Second paragraph",
  "title": "My New Project",
  "introText": "",
  "infoText": "Technical detail paragraph & Additional paragraph",
  "image": ["screenshot1.jpg", "screenshot2.jpg"],
  "releasedate": "",
  "trailer": "",
  "gameplay": "gameplay.mp4",
  "steamlink": "",
  "githublink": "https://github.com/...",
  "techused": "React & Node.js & MongoDB",
  "role": "Full-Stack Development & UI Design"
}
```

- `id` must match the `id` in `projects.json`
- Leave optional fields (trailer, steamlink, etc.) as empty strings if not applicable
- Use `" & "` to create paragraph breaks in text fields, and to create multi-item grids in `techused` and `role`
- `image` is always an array, even with one entry

### Step 3 — Add Assets

- Drop thumbnail/logo into `/public/images/`
- Drop screenshots into `/public/images/`
- Drop videos into `/public/videos/`

### Result

No component code changes needed. The new project will:
- Appear in the card grid on the home page
- Be searchable and filterable
- Have its own detail page at the specified route
- Show in the correct filter category

---

## How to Update an Existing Project

Find the project by `id` in both JSON files and edit the relevant fields.

| What to change | File | Field |
|---|---|---|
| Card thumbnail | `projects.json` | `image` |
| Project title | Both files | `title` |
| Filter category | `projects.json` | `filter` |
| Intro / description text | `projectsInfo.json` | `pageIntro`, `introText`, `infoText` |
| Extra text block (single project) | `projectsInfo.json` | `additionalText` |
| Screenshots | `projectsInfo.json` | `image` array |
| Gameplay video | `projectsInfo.json` | `gameplay` |
| Gameplay video heading | `projectsInfo.json` | `gameplayLabel` |
| Trailer video | `projectsInfo.json` | `trailer` |
| Trailer video heading | `projectsInfo.json` | `trailerLabel` |
| Steam / GitHub link | `projectsInfo.json` | `steamlink` / `githublink` |
| Tech stack | `projectsInfo.json` | `techused` |
| Role / responsibilities | `projectsInfo.json` | `role` |
| Release date | `projectsInfo.json` | `releasedate` |

No component changes required — all content is read from JSON at runtime.

---

## Styling

**Color scheme:**
- Background: `#16213e` (dark navy)
- Accent: `#64ffda` (cyan)
- Text: `#ffffff`
- Hover overlays: `rgba` with low opacity

**CSS files and scope:**

| File | Covers |
|---|---|
| `styles.css` | Header, nav, search input, filter buttons, project grid, cards, footer |
| `projInfo.css` | Project detail page layout, media panels, tag/grid system |
| `about.css` | About page (CSS Grid, photo + content) |
| `contact.css` | Contact form (two-column layout, form inputs) |
| `imageslider.css` | Carousel dots and slide animation |
| `backtotop.css` | Fixed position scroll button |
| `index.css` | Global typography reset |

**Grid layout** for project cards uses CSS Grid:
```css
grid-template-columns: repeat(auto-fill, 250px);
```

---

## Tech Stack Summary

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| React Router | 6.22.3 | Client-side routing |
| @emailjs/browser | 4.4.1 | Contact form email sending |
| react-scripts | 5.0.1 | CRA build tooling |
| Node.js | 24 LTS | Runtime / dev server |

- No TypeScript — all vanilla JavaScript
- No Redux or Context API — props drilling only
- No backend — static JSON served from `/public`
- No database — JSON files are the data store
