import { site, legalLinks, productCategories } from "../data/site.mjs";
import { products, getProduct, productHref } from "../data/products.mjs";
import { brandMark, icon, wordmark } from "./icons.mjs";

export function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function rootFor(page) {
  const depth = page.split("/").filter(Boolean).length;
  return "../".repeat(depth);
}

export function hrefFor(page, target = "") {
  return `${rootFor(page)}${target}`;
}

export function absoluteUrl(path = "") {
  return new URL(path, site.siteUrl).href;
}

export function asset(page, path, version = "") {
  const query = version ? `?v=${version}` : "";
  return `${hrefFor(page)}assets/${path}${query}`;
}

function navLinks(page, key) {
  return site.nav
    .map((item) => {
      const current = item.key === key ? ' aria-current="page"' : "";
      return `<a class="nav-link${current ? " is-active" : ""}" href="${hrefFor(
        page,
        item.href,
      )}"${current}>${esc(item.label)}</a>`;
    })
    .join("");
}

function mobileNav(page, key) {
  return site.nav
    .map(
      (item, index) => `<a class="menu-link${item.key === key ? " is-active" : ""}" href="${hrefFor(
        page,
        item.href,
      )}"${item.key === key ? ' aria-current="page"' : ""}>
        <span class="menu-link-index">${String(index + 1).padStart(2, "0")}</span>
        <span>${esc(item.label)}</span>
        ${icon("arrow-up-right", "menu-link-arrow")}
      </a>`,
    )
    .join("");
}

function siteHeader(page, key) {
  return `<header class="site-header" data-site-header>
  <div class="container header-inner">
    <a class="brand" href="${hrefFor(page)}" aria-label="Wonder Box Lab — home">
      <span class="brand-mark">${brandMark()}</span>
      ${wordmark()}
    </a>
    <nav class="primary-nav" aria-label="Primary navigation">
      ${navLinks(page, key)}
    </nav>
    <div class="header-actions">
      <a class="header-cta" href="${hrefFor(page, "products/")}">
        <span>Explore products</span>
        <span class="header-cta-arrow">${icon("arrow-up-right")}</span>
      </a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded="false" data-menu-open>
        <span class="menu-button-label">Menu</span>
        <span class="menu-button-icon" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>
<dialog class="menu-dialog" id="site-menu" aria-labelledby="site-menu-title">
  <div class="menu-inner">
    <div class="menu-top">
      <a class="brand" href="${hrefFor(page)}" aria-label="Wonder Box Lab — home">
        <span class="brand-mark">${brandMark()}</span>
        ${wordmark()}
      </a>
      <button class="menu-close" type="button" data-menu-close aria-label="Close menu">
        ${icon("close")}
      </button>
    </div>
    <h2 class="sr-only" id="site-menu-title">Site menu</h2>
    <nav class="menu-nav" aria-label="Menu navigation">
      ${mobileNav(page, key)}
    </nav>
    <div class="menu-foot">
      <div class="menu-foot-products">
        <p class="menu-foot-label">In the lab</p>
        ${products
          .map(
            (product) => `<a href="${hrefFor(page, productHref(product.slug))}">${esc(
              product.name,
            )} <span>${esc(product.statusLabel)}</span></a>`,
          )
          .join("")}
      </div>
      <div class="menu-foot-contact">
        <p class="menu-foot-label">Say hello</p>
        <a href="mailto:${site.email}">${site.email}</a>
        <div class="menu-foot-legal">
          ${legalLinks
            .map(
              (link) =>
                `<a href="${hrefFor(page, link.href)}">${esc(link.label)}</a>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>
</dialog>`;
}

function footerColumn(title, links, page) {
  return `<div class="footer-col">
    <h2 class="footer-col-title">${esc(title)}</h2>
    <ul>
      ${links
        .map(
          (link) => `<li><a href="${
            link.external ? link.href : hrefFor(page, link.href)
          }"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(
            link.label,
          )}${link.external ? `<span class="external-mark">${icon("arrow-up-right")}</span>` : ""}</a></li>`,
        )
        .join("")}
    </ul>
  </div>`;
}

function siteFooter(page, topHref = "#top") {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container footer-main">
    <div class="footer-brand">
      <a class="brand brand--footer" href="${hrefFor(page)}" aria-label="Wonder Box Lab — home">
        <span class="brand-mark">${brandMark()}</span>
        ${wordmark()}
      </a>
      <p>An independent product and technology brand. Games today. More kinds of software next.</p>
      <a class="footer-email" href="mailto:${site.email}">${site.email}</a>
    </div>
    <div class="footer-cols">
      ${footerColumn(
        "Explore",
        [
          { label: "Home", href: "" },
          { label: "Products", href: "products/" },
          { label: "About the lab", href: "about/" },
          { label: "Support", href: "support/" },
        ],
        page,
      )}
      ${footerColumn(
        "Products",
        [
          { label: "Tap Defense", href: "products/tap-defense/" },
          { label: "RushTrail Runaway", href: "products/rushtrail-runaway/" },
          { label: "All products", href: "products/" },
        ],
        page,
      )}
      ${footerColumn(
        "Legal & help",
        [
          { label: "Privacy", href: "legal/privacy/" },
          { label: "Terms", href: "legal/terms/" },
          {
            label: "Tap Defense policy",
            href: "https://emrulkayes031-coder.github.io/tap-defense-privacy/",
            external: true,
          },
          { label: "Contact", href: "support/" },
        ],
        page,
      )}
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} Wonder Box Lab. All rights reserved.</p>
    <p class="footer-note">Made with care, and a little room for wonder.</p>
    <a class="footer-top" href="${topHref}">Back to top ${icon("arrow-up-right")}</a>
  </div>
  <div class="footer-wordmark" aria-hidden="true">
    <span>Wonder Box</span> <em>Lab</em>
  </div>
</footer>`;
}

export function layout({
  page,
  key,
  title,
  description,
  body,
  bodyClass = "",
  ogImage = "assets/img/og.jpg",
  fullTitleOverride = "",
  skipHref = "#main",
  topHref = "#top",
  head = "",
  headStart = "",
  jsonLd = null,
  version = "",
}) {
  const fullTitle =
    fullTitleOverride ||
    (page === "" ? `${site.name} — A lab for things worth opening` : `${title} — ${site.name}`);
  const metaDescription = description || site.description;
  const canonical = absoluteUrl(page);
  const ogAbsolute = absoluteUrl(ogImage);
  const css = asset(page, "css/site.css", version);
  const js = asset(page, "js/site.js", version);
  const logo = absoluteUrl("assets/img/brand/logo-512.png");

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  ${headStart}
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#f3f0e8">
  <meta name="author" content="Wonder Box Lab">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wonder Box Lab">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(metaDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogAbsolute}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Wonder Box Lab — an independent product and technology brand">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(fullTitle)}">
  <meta name="twitter:description" content="${esc(metaDescription)}">
  <meta name="twitter:image" content="${ogAbsolute}">
  <link rel="icon" href="${asset(page, "img/brand/favicon.svg")}" type="image/svg+xml">
  <link rel="icon" href="${asset(page, "img/brand/favicon-32.png")}" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${asset(page, "img/brand/apple-touch-icon.png")}">
  <link rel="manifest" href="${asset(page, "site.webmanifest")}">
  <link rel="preload" href="${asset(page, "fonts/instrument-sans-latin.woff2")}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${asset(page, "fonts/instrument-serif-italic-latin.woff2")}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${css}">
  <script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : ""}
  ${head}
</head>
<body class="${bodyClass}" id="top" data-page="${key}">
  <nav class="skip-nav" aria-label="Skip to content">
    <a class="skip-link" href="${skipHref}">Skip to content</a>
  </nav>
  ${siteHeader(page, key)}
  <main id="main" tabindex="-1">
    ${body}
  </main>
  ${siteFooter(page, topHref)}
  <script src="${js}" defer></script>
</body>
</html>`;
}

export function eyebrow(text, tone = "") {
  return `<p class="eyebrow${tone ? ` eyebrow--${tone}` : ""}"><span class="eyebrow-dot" aria-hidden="true"></span>${esc(
    text,
  )}</p>`;
}

export function buttonLink(href, label, { variant = "primary", arrow = true, className = "", external = false } = {}) {
  return `<a class="btn btn--${variant}${className ? ` ${className}` : ""}" href="${href}"${
    external ? ' target="_blank" rel="noopener noreferrer"' : ""
  }>
    <span>${label}</span>
    ${arrow ? `<span class="btn-arrow">${icon(external ? "arrow-up-right" : "arrow-right")}</span>` : ""}
  </a>`;
}

export function sectionHead({ eyebrowText, title, lede, link }) {
  return `<header class="section-head">
    <div class="section-head-copy">
      ${eyebrow(eyebrowText)}
      <h2>${title}</h2>
      ${lede ? `<p class="section-lede">${lede}</p>` : ""}
    </div>
    ${
      link
        ? `<a class="text-link" href="${link.href}"><span>${link.label}</span>${icon(
            "arrow-up-right",
          )}</a>`
        : ""
    }
  </header>`;
}

export function statusChip(product, className = "") {
  return `<span class="status-chip status-chip--${product.status}${className ? ` ${className}` : ""}">
    <span class="status-dot" aria-hidden="true"></span>${esc(product.statusLabel)}
  </span>`;
}

export function productCard(page, product, { reveal = true } = {}) {
  const href = hrefFor(page, productHref(product.slug));
  return `<a class="product-card${reveal ? " reveal" : ""}" href="${href}" data-category="${product.category}" style="--product-accent:${product.theme.accent};--product-accent-two:${product.theme.accentTwo};--product-soft:${product.theme.soft};--product-ink:${product.theme.ink}">
    <div class="product-card-media">
      <img src="${asset(page, `img/${product.cardImage}`)}" alt="${esc(
        product.cardImageAlt,
      )}" width="540" height="1200" loading="lazy" decoding="async">
      <div class="product-card-chips">
        <span class="category-chip">${esc(product.categoryLabel)}</span>
        ${statusChip(product)}
      </div>
    </div>
    <div class="product-card-body">
      <p class="product-card-kicker">${esc(product.statusDetail)}</p>
      <div class="product-card-title-row">
        <h2>${esc(product.name)}</h2>
        <span class="product-card-arrow">${icon("arrow-up-right")}</span>
      </div>
      <p class="product-card-desc">${esc(product.shortDescription)}</p>
      <p class="product-card-cta">View product</p>
    </div>
  </a>`;
}

export function productIcon(page, product, className = "") {
  return `<span class="product-icon ${className}" style="--product-soft:${product.theme.soft}">
    <img src="${asset(page, `img/${product.icon}`)}" alt="${esc(product.iconAlt)}" width="512" height="512">
  </span>`;
}

export function nextProduct(page, product) {
  const others = products.filter((item) => item.slug !== product.slug);
  if (!others.length) return "";
  const next = others[(products.indexOf(product) + 1) % products.length] || others[0];
  return `<section class="next-product" aria-labelledby="next-product-title">
    <div class="container">
      <p class="next-product-label" id="next-product-title">Keep exploring</p>
      <a class="next-product-link" href="${hrefFor(page, productHref(next.slug))}">
        <span class="next-product-copy">
          <span class="next-product-kicker">${esc(next.categoryLabel)} · ${esc(next.statusLabel)}</span>
          <span class="next-product-name">${esc(next.name)}</span>
        </span>
        <span class="next-product-arrow">${icon("arrow-up-right")}</span>
      </a>
    </div>
  </section>`;
}

export function ctaBand(page) {
  return `<section class="cta-band" aria-labelledby="cta-title">
    <div class="cta-glow" aria-hidden="true"></div>
    <div class="container cta-inner">
      <div class="cta-copy">
        ${eyebrow("Say hello", "light")}
        <h2 id="cta-title">Have something worth <em>opening?</em></h2>
        <p>For product support, privacy requests, release questions, or a conversation about what comes next.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn--acid" href="mailto:${site.email}?subject=${encodeURIComponent(
          "Hello Wonder Box Lab",
        )}">
          <span>Talk to the lab</span><span class="btn-arrow">${icon("arrow-up-right")}</span>
        </a>
        <a class="cta-email" href="mailto:${site.email}">${site.email}</a>
      </div>
      <div class="cta-star" aria-hidden="true">✳</div>
    </div>
  </section>`;
}

export function productFilterBar(page, counts) {
  return `<div class="filter-bar" role="group" aria-label="Filter products by category">
    <div class="filter-pills">
      ${productCategories
        .map(
          (category) => `<button class="filter-pill${category.id === "all" ? " is-active" : ""}" type="button" data-filter="${category.id}" aria-pressed="${
            category.id === "all"
          }">
            <span>${esc(category.label)}</span>
            <span class="filter-count">${counts[category.id] ?? 0}</span>
          </button>`,
        )
        .join("")}
    </div>
    <p class="filter-status" aria-live="polite" data-filter-status>Showing ${products.length} products</p>
  </div>`;
}

export { getProduct };
