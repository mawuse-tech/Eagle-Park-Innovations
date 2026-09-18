The original UI is preserved locally on `backup/original-ui-2026-09-09`.
The refresh is being developed on `redesign/balanced-ui`.

The refresh introduces warm neutral surfaces, charcoal typography, restrained green accents, a split homepage hero, an open service gallery, and simplified imagery and service sections. Shop and authentication logic are retained.

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
