# Eagle Park Innovations

The public-facing website for Eagle Park Innovations, an agribusiness focused on grains, seeds, poultry, farmer training, and agricultural products.

## Tech stack

- React 19
- Vite 6
- React Router
- Tailwind CSS 4
- AOS, Swiper, Font Awesome, and React Icons
- Formspree for contact and order submissions
- Paystack's inline checkout script

## Getting started

### Prerequisites

Install the following before setting up the project:

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)
- Git

### Local setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone <repository-url>
   cd Eagle-Park-Innovations
   ```

2. Install the locked dependency versions:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown by Vite (normally `http://localhost:5173`).

> [!IMPORTANT]
> Maintenance mode is currently enabled. To view and work on the full website locally, change `maintenanceMode` to `false` in `src/App.jsx`. Do not commit that change unless the live site is meant to leave maintenance mode.

No local environment variables are currently required.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

There is no automated test suite yet, so please also check affected pages manually at desktop and mobile widths.

## Routes

When maintenance mode is disabled, the application provides these routes:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/ourstory` | Our story |
| `/train` | Farmer training |
| `/grain` | Grain services |
| `/contact` | Contact form |
| `/shop` | Product shop and cart |
| `/poultry` | Poultry services |
| `/seed` | Seed services |

## Project structure

```text
.
├── public/                 # Static files copied directly into the build
├── src/
│   ├── assets/             # Shared images and brand assets
│   ├── Components/         # Shared UI components
│   ├── Pages/              # Route-level pages and page-specific assets
│   ├── App.jsx             # Router configuration and maintenance-mode flag
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles and Tailwind import
│   └── main.jsx            # React entry point
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite and Tailwind configuration
└── package.json            # Dependencies and npm scripts
```

## Working on the project

1. Pull the latest changes from the default branch.
2. Create a short-lived branch with a descriptive name, such as `feature/shop-filter` or `fix/mobile-navbar`.
3. Keep changes focused and reuse shared components where practical.
4. Put shared images in `src/assets`; keep page-specific images beside their page.
5. Run the lint and build commands, then manually verify the affected routes.
6. Open a pull request explaining what changed and how it was tested. Include screenshots for visual changes.

Avoid committing `node_modules/`, `dist/`, local editor settings, secrets, or `.env` files.

## External services

- Contact messages and shop orders are submitted to Formspree from the browser.
- The Paystack inline script is loaded in `index.html` for checkout functionality.
- The shop cart is persisted in the browser using `localStorage` under the key `grainCart`.

Changes to service endpoints or payment behavior should be coordinated with the project owner and tested carefully. Never commit private keys or credentials to the repository.
