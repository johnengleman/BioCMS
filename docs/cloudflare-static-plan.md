# Plan: static site, then Cloudflare

Goal: every page is pre-generated and cached at the edge. The site is cheap to run and fast. Then the site moves from Vercel to Cloudflare Workers.

Status: phases 0 to 4 are done on branch `static-cloudflare` (2026-10-01). A preview Worker runs at `https://saints.nicholasengleman1.workers.dev`. Production is still Vercel from `main`. Cutover (phase 5) is not started.

## What I found

| Finding | Where | Effect |
|---|---|---|
| Every page reads `searchParams` (`church`, `filter`, `preset`, `sort`) | all `app/**/page.tsx` | Next.js must render each request. No page is static. |
| `getChurch()` reads a cookie | `hooks/getChurch.ts` | The cookie also forces per-request rendering. |
| `SiteFooter` is async and calls `getChurch()` | `components/candle/SiteFooter` | Every page that has a footer becomes dynamic. |
| `SiteHeader` loads the full search index on the server | `Search.server.tsx`, `getSearchData.ts` | Every page fetches the search data and embeds it in the HTML. |
| `export const runtime = 'edge'` on 13 pages | `app/**/page.tsx` | Old Next.js 14 habit. It blocks static output and OpenNext. |
| `unstable_rethrow` in `getChurch` | `hooks/getChurch.ts` | A workaround that disappears with the cookie. |
| `/` renders a page only to call `redirect('/saints')` | `app/page.tsx` | Should be a config redirect. |
| Sitemap is built once at build time by `next-sitemap` | `next-sitemap.config.js` | New saints will not appear until the next build. |
| Install uses `--legacy-peer-deps` | Vercel project setting | It hides dependency conflicts. |
| Sentry files exist but are switched off | `sentry.*.config.ts`, `next.config.js` | Dead code. |
| Directus runs on Railway and returns only 2 saints publicly today | `directus-production-2664.up.railway.app` | The site will grow to many saints. The plan must not build every page at build time. |
| `images.unoptimized` is `true` | `next.config.js` | `next/image` does no work today. Cloudflare image limits do not matter. |

## Decisions I need from you

Decided by the owner on 2026-10-01:

1. **First-time visitors are asked which tradition they want.** Design: a welcome card, not a blocking modal. See "Tradition prompt" below. Until the visitor chooses, the site shows "Both traditions". The static HTML for crawlers also shows "Both".
2. **The browser applies the choice.** The static page shows the default view. The browser updates lists after load, using `localStorage`. URL prefixes such as `/orthodox/saints` are not used.
3. **Category filters are real URLs**, for example `/saints/category/martyrs`. Sort and preset stay in the browser.
4. **Freshness: 5 minutes at most.** `revalidate = 240` is the safety timer. A Directus flow calls `/api/revalidate` on publish, so most updates appear within seconds.

### Tradition prompt

- Show a welcome card at the top of `/saints` (and the other list pages) on the first visit. It has three buttons: Catholic, Orthodox, Both traditions. It has a close button.
- Do not block the page. Do not show it on saint pages. A visitor from Google needs the saint, not a question. Saint pages already show both feast days.
- If the visitor closes the card without choosing, save "Both" and do not ask again.
- Keep the footer control so the visitor can change the choice later.
- Why not a blocking modal: search engines may see the modal as the page, it raises the bounce rate on a first visit, and it is harder for keyboard and screen-reader users.

## Target design

- **Saint pages** (`/saints/[slug]` and its sub-pages): pre-generated with `generateStaticParams`. Build only the top 100 to 200 saints. Other saints build on first visit and then stay cached (`dynamicParams` on). Each page has `revalidate = 240`, and the Directus webhook refreshes it sooner.
- **Church choice:** a small client provider. It reads `localStorage` instead of a cookie. No server code reads it. Feast-day labels, "Today's feast", and list filters use it in the browser.
- **List pages** (`/saints`, `/miracles`, `/teachings`, `/quotes`, `/novenas`, `/books`): static HTML with the first 30 items of the default view. Filter, sort, and "load more" call a cached JSON route (`/api/list/...`) with `Cache-Control: public, s-maxage=300, stale-while-revalidate`. This replaces the server actions, which are POST requests that no cache can store.
- **Search:** the header no longer fetches search data. The browser loads one cached JSON file the first time the visitor focuses the search box.
- **Home:** a `redirects()` entry in `next.config.js`.
- **Sitemap:** `app/sitemap.ts` with `revalidate`, so new saints appear without a build.
- **Guard rail:** put `export const dynamic = 'error'` on the static routes. The build fails if someone adds `cookies()` or `searchParams` again. Acceptance test: `next build` shows no `ƒ` routes.

## Phases

Each phase is a separate branch and a separate review. Production stays on Vercel until phase 5.

### Phase 0: Safety (30 min)
- Commit the Node 24 change and the ESLint fix on their own. Today `git status` also shows `.DS_Store`, `next-env.d.ts`, and `content-drafts/*/images/`. Leave those out.
- Record baselines: Lighthouse and TTFB for `/saints`, one saint page, and `/miracles`. Record last month's Vercel bill.
- Create branch `static-cloudflare`.

### Phase 1: Lint and types (1 hour)
- Done: `scripts/**` and `content-drafts/**` are excluded in `eslint.config.mjs`. This fixes the "plugin import not found" crash.
- Fix the one real error: `TodaysFeast.tsx` calls `setState` inside an effect. Compute the value in the client after mount in a way React accepts (for example `useSyncExternalStore` or a small `useToday` hook).
- Decide on the 4 `<img>` warnings. They are fine while `images.unoptimized` is on.
- Exit test: `npm run lint` passes.

### Phase 2: Modernize the Next.js code (half day)
- Remove `runtime = 'edge'` from 13 pages.
- Update to Next 16.3.8 and the latest patch versions.
- Remove `--legacy-peer-deps` after you fix the real conflicts. Then use `npm ci`.
- Delete the Sentry files, or turn Sentry on. Pick one.
- Check the `typescript` aliases in `package.json` (`npm:@typescript/typescript6` and `@typescript/native`). They are unusual. Use plain `typescript` unless there is a reason.
- Move the `/` redirect to `next.config.js`.
- Exit test: `next build` and `tsc --noEmit` pass. Pages look the same.

### Phase 3: Make every page static (2 to 3 days)
1. Add `TraditionProvider` and a `useTradition()` hook. Store the choice in `localStorage`. Migrate the old `findasaint.com` cookie value once, then stop using it.
2. Remove `getChurch()` and `unstable_rethrow`. Make `SiteFooter`, `TodaysFeast`, and `TraditionControl` client components that use the hook.
3. Saint pages: remove `searchParams`. Render both feast days and let the client pick one. Load "related saints" in the browser from the cached JSON route, because it depends on the tradition.
4. List pages: remove `searchParams`. Render the default view. Add `/api/list/[type]` route handlers. Make the client fetch filter, sort, and load more. Delete `app/actions.ts` and `app/saints/actions.ts` after the new route handlers work.
5. Category pages: add `/saints/category/[category]` with `generateStaticParams` if you choose decision 3.
6. Search: add `/api/search-index` with a cache header. Load it on focus.
7. Replace `next-sitemap` with `app/sitemap.ts` and `app/robots.ts`.
8. Add `revalidate`, `generateStaticParams`, and `dynamic = 'error'` to every page.
9. Add `/api/revalidate` (secret token) and a Directus flow that calls it when an item is published.
- Exit tests: `next build` has no `ƒ` routes. HTML for `/saints/<slug>` has no `Set-Cookie`. Switching tradition works with and without a saved choice. A published test saint appears within the freshness target.

### Phase 4: Cloudflare preview (1 day)
1. Run `npx vinext check` and read the report.
2. Run `npx vinext init` in the branch. This is non-destructive.
3. Create `wrangler.jsonc` with a Worker name, `compatibility_date`, and `nodejs_compat`.
4. Set the 4 variables: `GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_DIRECTUS_ASSETS`, `NEXT_PUBLIC_GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`. The `NEXT_PUBLIC_*` values are fixed at build time, so they must exist in the build environment. Put the revalidate token in a Worker secret.
5. Deploy to a `*.workers.dev` preview URL.
6. Check: the three Google fonts, `/api/*` routes, ISR refresh, bundle size, and every page type.
7. If vinext fails a check that I cannot fix, switch to `@opennextjs/cloudflare`. The static design from phase 3 makes both options simpler.
- Exit test: the preview matches production in a page-by-page comparison, and Lighthouse is equal or better.

### Phase 5: Cutover (half day, low-traffic time)
1. Connect the GitHub repo `johnengleman/BioCMS` to Cloudflare Workers Builds. You may need to grant GitHub access.
2. Lower the DNS TTL for `findasaint.com` to 60 seconds one day before.
3. Add `findasaint.com` and `www.findasaint.com` as custom domains on the Worker. The DNS zone is already on Cloudflare (`andy.ns` and `lisa.ns`), so Cloudflare changes the records itself.
4. Add a rule: `www` redirects to the apex, or the reverse. Match what Vercel does today.
5. Add cache rules: long cache for `/_next/static/*` and uploaded assets.
6. Watch for 30 minutes: error rate, Directus load, Google Analytics hits.
7. In Google Search Console, resubmit the sitemap.

### Phase 6: Cleanup (after 2 weeks)
- Pause the Vercel project for 2 weeks as a rollback. Then delete it.
- Remove `vercel.json` and the `.vercel` folder.
- Compare the first month's Cloudflare cost to the Vercel bill.

## Rollback
- Before phase 5: nothing to roll back. Production is still Vercel.
- After phase 5: point the DNS records at Vercel again. With a 60-second TTL this takes about a minute. Keep the Vercel project until phase 6.

## Risks

| Risk | Mitigation |
|---|---|
| vinext has gaps (Cloudflare says it is not ready for every workload) | `vinext check` first. OpenNext as the fallback. |
| Static list page shows the default tradition, then updates | Skeleton state and a short fade. Decision 2 above. |
| Directus on Railway is the single data source | Cache at the edge. Show stale pages if Directus is down (`stale-while-revalidate`). |
| Build time grows with the number of saints | Prebuild only the top saints. Others build on first visit. |
| Search engines see less list content | First 30 items in HTML. Category pages as real URLs. |
| Google fonts load differently under vinext | Check in phase 4. Self-host with `next/font/local` if needed. |

## Success measures
- `next build`: zero dynamic (`ƒ`) routes.
- Cached page TTFB under 100 ms in the US.
- Lighthouse performance 95 or higher on saint pages.
- Monthly hosting cost lower than today.
- `npm run lint` and `tsc --noEmit` pass in CI.

## Phase 3 result (done)

`next build` now shows every page as static (`○` or `●`) and no dynamic
page routes. Only the API routes are dynamic. `dynamic = 'error'` on
every page keeps it that way: the build fails if a page starts to use
`cookies()`, `headers()` or `searchParams` again.

What changed:
- **Tradition:** `hooks/useTradition.ts` keeps it in `localStorage`
  (key `findasaint.tradition`). The old `findasaint.com` cookie is read
  once for visitors who have it. `?church=` in an address still works on
  load, but the site no longer writes it.
- **Welcome card:** a panel at the bottom of list pages for first-time
  visitors. It is not on saint pages.
- **Lists:** `/api/saints`, `/api/list/[kind]`, `/api/related`,
  `/api/books`, `/api/search-index`. They check every parameter against
  allowed values and send cache headers (`s-maxage=300`). The old server
  actions are deleted.
- **Category URLs:** `/saints/category/<name>`, `/miracles/era/<era>`,
  `/teachings/era/<era>`, `/quotes/topic/<topic>`,
  `/novenas/topic/<topic>`, `/books/genre/<genre>`. Old `?filter=` and
  `?preset=` links redirect to them (308). Redirects keep the old query
  text on the new address. This is harmless.
- **Browser-only options:** `?preset=`, `?month=`, `?sort=` on `/saints`.
- **Sitemap:** `app/sitemap.ts` and `app/robots.ts` replace
  `next-sitemap`. The old query returned only 100 saints; the new one
  returns all.
- **Saint pages:** the top 200 saints are built ahead of time. Others
  are built on first visit.
- **Removed:** `js-cookie`, `next-sitemap`, `hooks/getChurch.ts`,
  `app/actions.ts`, `app/saints/actions.ts`.

### Still to set up (needs you)

1. **`REVALIDATE_SECRET`:** choose a long random value. Set it in the
   host's environment (Vercel for now, Cloudflare later).
2. **Directus flow:** on publish of a saint, miracle, teaching, quote,
   prayer or book, send `POST https://findasaint.com/api/revalidate`
   with the header `x-revalidate-secret: <the secret>`. An optional JSON
   body `{"paths": ["/saints/<slug>"]}` refreshes only those pages. With
   no body, every page refreshes.
3. **Cloudflare cache for the API:** `s-maxage` headers help a CDN, but
   a Worker does not cache by itself. Phase 4 must wrap the `/api/*`
   responses in the Cache API (or add cache rules).

### Known limits

- Search ignores accents, so "ther" does not find "Thérèse". This was
  true before.
- The static list shows "Both traditions". A visitor with a saved
  choice sees a short update after the page loads.

## Phase 4 result (done: preview Worker)

Preview: `https://saints.nicholasengleman1.workers.dev` (Cloudflare account
`nicholasengleman1@gmail.com`). Deploy with
`npx vinext-cloudflare deploy --preview`.

What I measured on the deployed preview (from Denver):
- Cached pages: first byte 110 to 190 ms. `x-vinext-cache: HIT`.
- First request after a deploy or a refresh: about 1 to 2 s, while the
  page is built and cached.
- API routes after the first call: 110 to 160 ms (was 200 to 700 ms
  before the KV cache).
- Worker size: 2.5 MiB, 805 KiB compressed. Start-up 3 ms.
- Fonts are self-hosted by vinext. No console errors.
- `POST /api/revalidate`: wrong secret gives 401. A right secret makes
  the next page request a `MISS`, then `HIT`.

How caching works now:
- **Pages:** Workers Cache (`ctx.cache`), refreshed every 4 minutes
  (`revalidate = 240`), or at once through `/api/revalidate`.
- **Directus data:** every GraphQL request goes through `unstable_cache`
  (`queries/fetchHelper.ts`), stored in a KV namespace
  (`saints-vinext-kv-cache`), for 60 seconds. `/api/revalidate` clears it
  by the tag `directus`. Worst case without the webhook: about 5 minutes.
- **API routes:** vinext does not edge-cache them (`BYPASS`), so they
  depend on the KV data cache. They still run a Worker on each call.

Changes for Cloudflare:
- The project is ESM (`"type": "module"`).
- `scripts/check-static.mjs` replaces `dynamic = 'error'`, because vinext
  treats that setting as "never refresh". `npm run build` runs it.
- `cf` and `@cloudflare/vite-plugin` are beta releases. Pin them
  after cutover.

### Before cutover (phase 5)

1. **Account:** `findasaint.com` is in a different Cloudflare account
   (name servers `andy.ns` and `lisa.ns`) than the preview. Deploy the
   production Worker in the account that owns the zone, or move the zone.
2. **Build variables:** `NEXT_PUBLIC_GRAPHQL_ENDPOINT`,
   `NEXT_PUBLIC_DIRECTUS_ASSETS`, `NEXT_PUBLIC_SITE_URL` are fixed at
   build time. They must exist wherever the build runs (your machine
   reads `.env.local`).
3. **Secret:** `REVALIDATE_SECRET` as a Worker secret (the preview has a
   random test secret that nobody knows).
4. **Warm the cache** on deploy with `--warm-cache`, so the first visitors
   do not wait 1 to 2 s.
5. **`.next` types:** `vite build` can leave stale files in `.next/types`.
   Delete that folder if `tsc` complains.
