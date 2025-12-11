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
  output: "server",
  adapter: vercel(), // Adapter pour Vercel
  integrations: [
    // React doit être en premier si on utilise JSX
    react({ babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] } }),

    // TailwindCSS
    tailwind(),

    // Wix integration
    wix({
      htmlEmbeds: isBuild,
      auth: true
    }),

    // Monitoring uniquement en production
    isBuild ? monitoring() : null,

    // Framewire pour dev local
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `const version = new URLSearchParams(location.search).get('framewire');
              if (version){
                const localUrl = 'http://localhost:3202/framewire/index.mjs';
                const cdnUrl = \`https://static.parastorage.com/services/framewire/\${version}/index.mjs\`;
                const url = version === 'local' ? localUrl : cdnUrl;
                const framewireModule = await import(url);
                globalThis.framewire = framewireModule;
                framewireModule.init({}, import.meta.hot);
                console.log('Framewire initialized');
              }`
            );
          }
        },
      },
    },
  ].filter(Boolean), // supprime les null / undefined

  vite: {
    plugins: [
      customErrorOverlayPlugin(),
    ],
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
