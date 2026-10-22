# Handoff: serve Find a Saint images from Cloudflare

For a local Claude session with computer use (Claude desktop app with
Computer use on, or Claude in Chrome). Read this whole file first.
The code side is finished and pushed; this is dashboard work in
Cloudflare and Railway, then one build variable.

## Why

Every image on findasaint.com is fetched from Directus on Railway
(`https://directus-production-2664.up.railway.app/assets/<id>?width=…`),
which resizes it on request. Directus has been failing with:

```
Service "assets" is unavailable. Couldn't reach the storage location.
```

so every portrait on the site is broken. Directus stores files with its
S3 driver (`storage: "s3"` on every file record), so the originals are
in a bucket, almost certainly Cloudflare R2. The fix has two parts:

1. Make Directus reach its bucket again (the outage).
2. Serve images straight from Cloudflare so Railway is never in the
   image path again (the reliability fix).

## What is already done in code

Branch `claude/beautiful-galileo-w3tv9c`, commit `b33de07`
("Images can be served straight from Cloudflare R2 with Image
Transformations"), on top of the v4 redesign.

- `utils/imageUrl.ts` builds every image URL on the site.
- With `NEXT_PUBLIC_IMAGE_HOST` set (the bucket's custom domain), URLs
  become `https://<host>/cdn-cgi/image/width=720,quality=80,format=auto/<filename_disk>`.
  Cloudflare pulls the original from R2, resizes it, and serves AVIF or
  WebP. Without the variable, nothing changes.
- Every query fetches `filename_disk` (the object key in the bucket:
  the file id plus its extension).
- `NEXT_PUBLIC_IMAGE_ROOT` is only needed if Directus stores files
  under a prefix (`STORAGE_S3_ROOT`).

Two real files to test with (both are saint portraits):

```
742065a9-b222-46d8-8483-a81cb02b97b8.jpg   St. John Maximovitch
9d33ee8f-4b7b-4a4b-8704-a357e97fda6a.jpg   St. Thérèse of Lisieux
```

## Ground rules

- Browsers are read-only under computer use. Use Claude in Chrome or
  the built-in browser for clicking and typing in the dashboards.
- Never paste a key, secret or token into the chat. Read them on
  screen, act on them, and report only the non-secret values
  (endpoint, bucket name, region, root).
- Do not delete objects, buckets, DNS records or Railway variables.
  Add and change only what is listed here.
- Rotate the R2 API token only if step 1 shows the current one no
  longer works.
- If anything differs from what this file expects, stop and ask
  rather than improvise.

## Step 1: Railway. Find the bucket and fix the outage

1. Open railway.app, the project that runs Directus
   (`directus-production-2664`), then the Directus service, then
   **Variables**.
2. Read these and note the non-secret ones:
   `STORAGE_LOCATIONS`, `STORAGE_S3_DRIVER`, `STORAGE_S3_ENDPOINT`,
   `STORAGE_S3_BUCKET`, `STORAGE_S3_REGION`, `STORAGE_S3_ROOT` (may be
   absent), `STORAGE_S3_KEY`, `STORAGE_S3_SECRET`. The location name
   may not be `S3`; it is whatever `STORAGE_LOCATIONS` says, upper
   case.
3. Decide which case applies:
   - **Endpoint ends in `r2.cloudflarestorage.com`:** the files are in
     R2 already. Go on to 4.
   - **Any other endpoint (AWS, Backblaze, Supabase, a Railway
     bucket):** the files must be copied to R2 first. See "Copying to
     R2" at the end, then come back to 4.
4. Open the service's **Deployments**, then the latest deployment's
   **Logs**, and search for `storage` or `S3`. The error there says
   whether it is credentials (`InvalidAccessKeyId`,
   `SignatureDoesNotMatch`, 403), the endpoint (`ENOTFOUND`,
   `ECONNREFUSED`), or the bucket (`NoSuchBucket`).
5. Fix what the log says:
   - Credentials: in Cloudflare, R2, **Manage R2 API Tokens**, create a
     token with **Object Read & Write** on this bucket only. Put its
     Access Key ID and Secret Access Key into `STORAGE_S3_KEY` and
     `STORAGE_S3_SECRET` on Railway. Railway redeploys on save.
   - Endpoint: it must be `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
     (the account id is on the R2 overview page), `STORAGE_S3_REGION`
     must be `auto`.
   - Bucket: the name must match the bucket in R2 exactly.
6. Verify: open
   `https://directus-production-2664.up.railway.app/assets/742065a9-b222-46d8-8483-a81cb02b97b8?width=200`
   in the browser. It must show the icon, not JSON. This alone
   restores the live site's images.

## Step 2: Cloudflare R2. Attach a custom domain to the bucket

1. Open dash.cloudflare.com, **R2 Object Storage**, the bucket from
   step 1, **Settings**.
2. Under **Custom Domains**, choose **Connect Domain** and enter
   `images.findasaint.com`. The zone `findasaint.com` is on this
   account, so Cloudflare creates the DNS record itself. Accept.
3. Wait until the domain shows **Active** (usually under a minute).
4. Verify: open
   `https://images.findasaint.com/742065a9-b222-46d8-8483-a81cb02b97b8.jpg`.
   It must show the icon. If Directus uses `STORAGE_S3_ROOT`, the path
   is `https://images.findasaint.com/<root>/<file>`.

## Step 3: Cloudflare Images. Turn on transformations

1. In the dashboard, open **Images**, then **Transformations**.
2. Find the zone `findasaint.com` and turn transformations **on**.
3. Leave source origins at the default. `images.findasaint.com` is in
   the zone, so no extra origin is needed.
4. Verify: open
   `https://images.findasaint.com/cdn-cgi/image/width=720,quality=80,format=auto/742065a9-b222-46d8-8483-a81cb02b97b8.jpg`.
   It must show a resized icon, and the response `content-type` must be
   `image/avif` or `image/webp` (the browser's developer tools,
   Network tab, show it). An error page here means transformations
   are not on for this zone, or the custom domain is not active yet.

## Step 4: Set the build variable and deploy

`NEXT_PUBLIC_IMAGE_HOST` is read at build time, so it must exist where
the site is built, not only at runtime.

- **If the Worker is built by Cloudflare (Workers Builds from the
  GitHub repo):** Workers & Pages, the `saints` Worker, **Settings**,
  **Build**, **Variables and Secrets**, add
  `NEXT_PUBLIC_IMAGE_HOST` = `https://images.findasaint.com`
  (and `NEXT_PUBLIC_IMAGE_ROOT` = the root, only if step 1 found one).
  Then trigger a build (push, or **Retry build**).
- **If the Worker is deployed from a laptop (`npm run deploy:vinext`):**
  add the same line to the local `.env` or `.env.production` before
  running the build and deploy.

Which branch to deploy is a decision for the owner:

- **Images first, redesign later:** cherry-pick the one commit onto
  main and deploy main:
  ```
  git fetch origin
  git checkout main && git pull
  git cherry-pick b33de07
  git push
  ```
- **Redesign and images together:** merge or deploy
  `claude/beautiful-galileo-w3tv9c`.

## Step 5: Check the live site

1. Open `https://findasaint.com/saints`. Portraits show on the cards.
2. Right-click a portrait, **Copy image address**. It must start with
   `https://images.findasaint.com/cdn-cgi/image/`. If it still starts
   with the Railway address, the variable was not present at build
   time.
3. Open one saint page and the Open Graph check at
   `https://findasaint.com/saints/john-maximovitch` (view source,
   `og:image`): it must be a `format=jpeg` URL on the images domain.

## Optional: cache the originals for a year

File names never change (they are the file id), so originals can be
cached hard. In the dashboard, **Caching**, **Cache Rules**, create a
rule: when hostname equals `images.findasaint.com`, eligible for cache,
**Edge TTL** 1 month or more, **Browser TTL** 1 year.

## Copying to R2 (only if step 1 found another provider)

On the laptop, with rclone installed:

```
# one remote for the current bucket, one for R2
rclone config          # add "old" (type s3, the provider from Railway)
                       # add "r2"  (type s3, provider Cloudflare,
                       #            endpoint <ACCOUNT_ID>.r2.cloudflarestorage.com)
rclone sync old:<bucket> r2:<bucket> --progress --header-upload "Cache-Control: public, max-age=31536000, immutable"
rclone check old:<bucket> r2:<bucket>
```

Then update the Railway variables (endpoint, bucket, region `auto`,
new R2 key and secret) and continue at step 1.4. Do not delete the old
bucket until the live site has shown images from R2 for a few days.

## Report back

When done, report: which case step 1 was, what the log said and what
was changed on Railway (no secrets), the custom domain status, the
transformation test result with its content-type, where the build
variable was set, and which branch was deployed.
