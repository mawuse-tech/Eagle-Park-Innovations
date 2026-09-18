# Eagle Park Innovations

One Next.js App Router application contains the public storefront and the existing MongoDB authentication backend. Express is retained separately for rollback; this application makes no requests to it.

## Setup

Use Node.js 20.9 or newer. Run `npm ci`. For a new checkout, copy `.env.example` to `.env.local` and supply the **existing** `MONGODB_URI` and `JWT_SECRET`. Do not overwrite a configured `.env.local`. Start with `npm run dev`; production uses `npm run build` and `npm start` with HTTPS.

`MONGODB_URI`, `JWT_SECRET`, and optional `JWT_EXPIRES_IN` (default `7d`) are server-only. Configure them in your hosting provider for deployment. `.env.local` is ignored by Git. Only the existing Paystack public key uses `NEXT_PUBLIC_`.

## Backend and authentication

- `src/server/db.ts` caches the Mongoose connection promise across hot reloads and concurrent requests, retaining failed attempts until an explicit server restart. It preserves Express's explicit `eagle_park_ecommerce` database name and the same Atlas URI.
- `src/server/models/User.ts` reuses model `User` and collection `users`, all existing fields/timestamps, bcrypt cost 12, password exclusion, and an eight-character minimum. No data migration or new database is needed.
- `POST /api/auth/register` always creates `user`, regardless of submitted role.
- `POST /api/auth/login` sets a signed JWT in an HttpOnly, SameSite=Lax cookie, Secure in production. No token is returned to browser JavaScript.
- `GET /api/auth/me` returns only id, name, email, role. `POST /api/auth/logout` clears the cookie.
- `GET /api/admin` requires the current database role to be admin; `/admin` also checks authentication and role on the server.
- `GET /api/health` preserves the existing health response; it is a liveness check, not a database probe.

JWT signing, expiry, and password verification remain compatible with the existing users. Bearer headers are no longer accepted. Existing localStorage credentials are discarded on startup, so users sign in once after migration. Refresh restores the session from `/api/auth/me`. As with the original stateless JWT design, logout removes this browser's credential; it does not revoke a previously copied JWT before expiry.

Mutating routes reject cross-origin requests. Login and registration require JSON, and cookies are host-only with SameSite=Lax. Deploy behind a proxy that preserves the public request origin. Server modules use `server-only` to prevent imports into Client Components. Errors never serialize database connection details.

Visitors can browse all public pages. The same login form handles both roles; admins go to `/admin`. Existing Add to Cart authentication checks, browser cart storage, and Formspree behavior remain in place.

## Admin provisioning

Run `npm run create-admin` with `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` supplied through your terminal environment or secret manager. The script loads Next.js environment files, uses the same database/model, hashes the password, refuses duplicates, and prints no password. There is no admin registration API.

For zsh, enter credentials without putting passwords into shell history:

```zsh
read 'ADMIN_NAME?Admin name: '
read 'ADMIN_EMAIL?Admin email: '
read -s 'ADMIN_PASSWORD?Admin password: '
export ADMIN_NAME ADMIN_EMAIL ADMIN_PASSWORD
npm run create-admin
unset ADMIN_NAME ADMIN_EMAIL ADMIN_PASSWORD
```

Do not commit admin credentials or store them in the example file. The CLI's `react-server` condition enables the shared server-only modules in Node.

## Verification

`npm run lint`, `npm run typecheck`, and `npm run build` verify the application. `npm run test:auth` runs the live integration checks against a running local application and the configured Atlas database. It creates uniquely named temporary user/admin fixtures and removes only those fixtures afterward. It checks existing-record visibility without printing identities or changing existing users. Set `AUTH_TEST_URL` if the app is not running at `http://localhost:3000`.

The old Express project has not been deleted. Stop using it only after live verification succeeds in your deployment environment.

## No automatic retries

Authentication requests are sent once, including the startup session check in React Strict Mode. MongoDB read/write retries and Mongoose command buffering are disabled. A failed initial connection remains cached; after fixing connectivity, explicitly restart Next.js to attempt a new connection. Connection failures return a safe HTTP 503 database-unavailable message instead of a generic 500. MongoDB still performs its normal topology monitoring; that does not resubmit application operations.
