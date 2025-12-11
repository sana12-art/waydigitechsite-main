/* empty css                                          */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../../../chunks/astro/server_CTPq2Bsf.mjs';
import 'piccolore';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$Entry = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Entry;
  const extensions = /* #__PURE__ */ Object.assign({

});
  if (Astro2.params.compId == null) {
    return new Response(null, { status: 404 });
  }
  const load = extensions[`.astro/integrations/_wix_astro_backoffice-extensions/backoffice/${Astro2.params.compId}/entry.astro`];
  if (load == null) {
    return new Response(null, { status: 404 });
  }
  const mod = await load();
  if (mod == null || typeof mod !== "object" || !("default" in mod)) {
    return new Response(null, { status: 404 });
  }
  const Component = mod.default;
  return renderTemplate`${renderComponent($$result, "Component", Component, {})}`;
}, "C:/Users/hp/Downloads/waydigitechsite-main/node_modules/@wix/astro/build/dependencies/astro-backoffice-extensions/astro-runtime/entry.astro", void 0);

const $$file = "C:/Users/hp/Downloads/waydigitechsite-main/node_modules/@wix/astro/build/dependencies/astro-backoffice-extensions/astro-runtime/entry.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Entry,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
