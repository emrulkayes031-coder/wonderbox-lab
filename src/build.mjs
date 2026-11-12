import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./data/site.mjs";
import { products, productHref } from "./data/products.mjs";
import { layout } from "./components/layout.mjs";
import {
  aboutPage,
  homePage,
  legalHubPage,
  notFoundPage,
  privacyPage,
  productPage,
  productsPage,
  supportPage,
  termsPage,
} from "./pages/pages.mjs";

const srcDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(srcDir, "..");
const outDir = path.join(rootDir, "dist");
const assetsDir = path.join(srcDir, "assets");
const staticDir = path.join(srcDir, "static");
const outAssetsDir = path.join(outDir, "assets");

// Start from a clean output directory so removed pages cannot linger.
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

async function writePage(relativePath, page, extra = {}) {
  const html = layout({
    ...page,
    version,
    ...extra,
  });
  const target = path.join(outDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  return relativePath;
}

const css = await readFile(path.join(assetsDir, "css/site.css"), "utf8");
const js = await readFile(path.join(assetsDir, "js/site.js"), "utf8");
const version = createHash("sha256")
  .update(css)
  .update(js)
  .digest("hex")
  .slice(0, 10);

const pageBuilders = [
  ["index.html", homePage()],
  ["products/index.html", productsPage()],
  ...products.map((product) => [
    path.join("products", product.slug, "index.html"),
    productPage(product),
  ]),
  ["about/index.html", aboutPage()],
  ["support/index.html", supportPage()],
  ["legal/index.html", legalHubPage()],
  ["legal/privacy/index.html", privacyPage()],
  ["legal/terms/index.html", termsPage()],
];

const written = [];
for (const [relativePath, page] of pageBuilders) {
  written.push(await writePage(relativePath, page));
}

written.push(
  await writePage("404.html", notFoundPage(), {
    headStart: `<base href="${site.siteUrl}">`,
    skipHref: `${site.siteUrl}404.html#main`,
    topHref: `${site.siteUrl}404.html#top`,
  }),
);

await cp(assetsDir, outAssetsDir, { recursive: true, force: true });
await cp(staticDir, outDir, { recursive: true, force: true });

const publicPages = [
  { path: "", priority: "1.0" },
  { path: "products/", priority: "0.9" },
  ...products.map((product) => ({
    path: productHref(product.slug),
    priority: "0.8",
  })),
  { path: "about/", priority: "0.7" },
  { path: "support/", priority: "0.7" },
  { path: "legal/", priority: "0.3" },
  { path: "legal/privacy/", priority: "0.3" },
  { path: "legal/terms/", priority: "0.3" },
];

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages
  .map(
    (page) => `  <url>
    <loc>${new URL(page.path, site.siteUrl).href}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap.xml", site.siteUrl).href}
`;

const manifest = {
  name: site.name,
  short_name: "Wonder Box",
  description: site.shortDescription,
  start_url: "../",
  scope: "../",
  display: "standalone",
  background_color: "#f4f1e8",
  theme_color: "#f4f1e8",
  icons: [
    {
      src: "img/brand/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "img/brand/logo-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
};

await writeFile(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(outDir, "robots.txt"), robots, "utf8");
await writeFile(
  path.join(outAssetsDir, "site.webmanifest"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8",
);

console.log(`Built ${written.length} pages into dist/ with asset version ${version}`);
for (const relativePath of written) console.log(`  ${relativePath}`);
