# Render deployment

The HUBB launch site is prepared as a static Next.js export for Render.

## Service type

- Type: Static Site
- Runtime cost: compatible with Render's free static-site tier
- Branch: `main`
- Auto deploy: enabled
- Build command: `npm ci && npm run build:render`
- Publish directory: `out`

## Why static

The current experience has no server-side checkout, account, database, or private API. A static deployment is faster, simpler, and avoids paying for an idle web-service instance. Commerce can later be added as a separate API or migrated to a server-rendered service.

## Build contract

`build:render` sets `RENDER_STATIC_EXPORT=1`, which tells `next.config.ts` to generate a static export. The existing `npm run build` command remains dedicated to the ChatGPT Sites/Vinext deployment.

## Deployment QA

After every Render deployment:

1. Confirm the deployment status is `live`.
2. Open the public URL and verify the Classic hero renders in cobalt blue.
3. Test all seven flavor selectors and the Arabic/English switch.
4. Confirm Matcha shows naturally roasted kernels, with green only as the flavor artwork.
5. Check for broken images and horizontal overflow.
