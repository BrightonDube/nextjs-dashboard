## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

### Quick start

Install dependencies and run the app locally (use the package manager the project uses):

- Using pnpm (recommended, project `packageManager` is set to pnpm):

```pwsh
pnpm install
pnpm dev
pnpm build
pnpm start
```

- Using npm:

```pwsh
npm install
npm run dev
npm run build
npm run start
```

Note: avoid running `npx run build`. The `npx run` command invokes the separate `run` package which attempts to require a local `build` module (causing a MODULE_NOT_FOUND error). Use the package scripts (`pnpm build` / `npm run build`) or `npx next build` instead.
