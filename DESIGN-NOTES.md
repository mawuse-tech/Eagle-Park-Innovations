The original UI is preserved locally on `backup/original-ui-2026-09-09`.
The refresh is being developed on `redesign/balanced-ui`.

The refresh adapts the rendered MTN Ghana layouts to Eagle Park’s green-and-white branding. It uses a floating green navigation bar, full-width photo heroes, bold headings, pill buttons, rounded image banners, icon-based benefits, and a deep-green footer. Existing agricultural photography and business content are retained, with a sharper existing seed image used for the homepage banner.

Page references: MTN homepage → landing; About → Our Story and leadership; Home Internet → product/service heroes and benefits; Foundation → training; Deal catalogue → shop category rail and green price panels; Contact → white form layout. These are design references, not imported MTN assets or fonts.

The shop retains its authentication redirects, local cart persistence, quantity controls, and payment integration. The contact form retains its existing endpoint. Mobile layouts include a collapsible menu and horizontally scrollable training cards. Slideshow controls support pausing, keyboard focus, and reduced motion.

Validation: lint and TypeScript passed (one existing image warning in MaintenancePage). Ten routes were browser-checked at 1440px and 390px; selected layouts also passed overflow checks at 320px, 768px, and 1024px. Navigation, carousel selection, category/search filters, empty states, login redirect, mocked-session cart persistence/quantities/removal, and a mocked contact submission passed. No real messages or payments were sent.

Production build passed with `npm run build -- --webpack`. The default Turbopack build encountered an environment port-binding restriction. Browser checks also observed an error from the pre-existing global Paystack v1 script (“Please put your Paystack Inline javascript file inside of a form element”); live checkout was not verified.

Preview with `npm run dev`.

To keep the backup on your remote as well:

```sh
git push origin backup/original-ui-2026-09-09
```

After committing any redesign work, view the original version with:

```sh
git switch backup/original-ui-2026-09-09
```

Return to the refresh with:

```sh
git switch redesign/balanced-ui
```

Switching branches only changes your local checkout. If the redesign has already been deployed, redeploy the backup branch or revert the redesign commit on your deployment branch through your normal workflow.
