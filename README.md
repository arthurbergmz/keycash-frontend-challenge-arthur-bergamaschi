# keycash-frontend-challenge-arthur-bergamaschi

- Vue 3 and Typescript in Vite. The project uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

NodeJS 16.14.0 is recommended.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Getting started

```bash

$ npm i
$ npm run dev

```

### Google Maps

You must provide a Google API Key as `VITE_GOOGLE_API_KEY` in a `.env` file. You can find an example as `.env.example`.

## Deployment

```bash
$ npm run build
```

You must serve the content of `dist` folder as static content.
