// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import wix from "@wix/astro";
import monitoring from "@wix/monitoring-astro";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

const isBuild = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  output: "server", // Astro server-side rendering pour Vercel
  adapter: vercel(), // Adapter pour Vercel
  integrations: [
    // React doit être en premier si on utilise JSX
    react({ babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] } }),

    // TailwindCSS
    tailwind(),

    // Wix integration
    wix({ htmlEmbeds: isBuild, auth: true }),

    // Monitoring uniquement en production
    isBuild ? monitoring() : null,

    // Framewire pour dev local
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": /** @param {{ injectScript: Function, command: string }} ctx */ ({ injectScript, command }) => {
          if (command === "dev") {
            // Remplace uniquement le contenu injectScript("page", `...`) par ce qui suit :
injectScript(
  "page",
  `(function () {
    // Ne pas exécuter côté serveur
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const version = new URLSearchParams(location.search).get('framewire');
        if (!version) return;

        const localUrl = 'http://localhost:3202/framewire/index.mjs';
        const cdnUrl = \`https://static.parastorage.com/services/framewire/\${version}/index.mjs\`;
        const url = version === 'local' ? localUrl : cdnUrl;

        // Demande à Vite de ne pas analyser cet import dynamique
        /* @vite-ignore */
        const framewireModule = await import(url);

        globalThis.framewire = framewireModule;
        if (framewireModule && typeof framewireModule.init === 'function') {
          framewireModule.init({}, import.meta.hot);
        }
        console.log('Framewire initialized from', url);
      } catch (err) {
        // Échec charge : log pour debug, mais ne casse pas la page
        // eslint-disable-next-line no-console
        console.error('Framewire load failed:', err);
      }
    })();
  })();`
);

          }
        },
      },
    },
  ].filter(Boolean), // supprime les null / undefined

  vite: {
    plugins: [customErrorOverlayPlugin()],
  },

  devToolbar: {
    enabled: false,
  },

  image: {
    domains: ["static.wixstatic.com"],
  },

  server: {
    allowedHosts: true,
    host: true,
  },
});
