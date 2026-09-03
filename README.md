# Eagle Park Innovations frontend

The storefront is a Next.js App Router application written in strict TypeScript. The existing Node.js/Express/Mongoose application remains a separate REST backend.

## Setup

- Node.js 20.9 or newer
- npm
- The Express API running on `http://localhost:5050`, or another configured URL

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set these browser-visible values in `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5050
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

Only a Paystack public key belongs in the frontend. Never add the JWT secret, MongoDB URI, database credentials, or other backend secrets to `NEXT_PUBLIC_*` variables.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create the production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run lint` | Run Next.js and TypeScript ESLint rules |
| `npm run check` | Run lint, typecheck, and production build |

## Routes and architecture

The App Router pages are `/`, `/ourstory`, `/train`, `/grain`, `/contact`, `/shop`, `/poultry`, and `/seed`. Shared navigation, footer, metadata, font, styles, and Paystack script loading live in `app/layout.tsx`.

`src/lib/api.ts` centralizes the Express base URL and typed request behavior. `src/lib/auth-api.ts` prepares typed calls for register, login, and current-user endpoints without moving authentication or authorization into Next.js. The Express backend must allow the frontend origin through CORS.

## Authentication

The `/login` and `/register` routes call the Express authentication endpoints. `AuthProvider` restores the session with `/api/auth/me`, exposes the authenticated user and role, and owns login/logout state. The temporary `/admin` route requires an authenticated user whose backend profile reports the `admin` role.

The current Bearer-token backend requires its JWT to be available to browser JavaScript, so the frontend stores it in `localStorage` and attaches it centrally in the API layer. This preserves sessions across refreshes but means an XSS vulnerability could access the token. For production, prefer changing the Express backend to set a Secure, HttpOnly, SameSite cookie, add CSRF protection where appropriate, and then remove browser-accessible token storage. Never store the JWT secret in this frontend.

The shop cart is browser-only state persisted under `grainCart`. Contact and order notifications continue to use Formspree directly from the browser.
