import { site, productCategories } from "../data/site.mjs";
import { products, productHref } from "../data/products.mjs";
import {
  absoluteUrl,
  asset,
  buttonLink,
  ctaBand,
  eyebrow,
  hrefFor,
  nextProduct,
  productCard,
  productFilterBar,
  productIcon,
  sectionHead,
  statusChip,
} from "../components/layout.mjs";
import { icon } from "../components/icons.mjs";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.siteUrl}#organization`,
      name: site.name,
      url: site.siteUrl,
      logo: absoluteUrl("assets/img/brand/logo-512.png"),
      email: site.email,
      description: site.description,
    },
    {
      "@type": "WebSite",
      "@id": `${site.siteUrl}#website`,
      url: site.siteUrl,
      name: site.name,
      inLanguage: "en",
      publisher: { "@id": `${site.siteUrl}#organization` },
    },
  ],
};

function heroStage(page) {
  const tap = products[0];
  const rush = products[1];
  return `<div class="hero-visual reveal" data-hero-visual>
    <div class="stage-aura stage-aura--one" aria-hidden="true"></div>
    <div class="stage-aura stage-aura--two" aria-hidden="true"></div>
    <div class="hero-stage" data-hero-stage>
      <div class="stage-topline">
        <span>WB / 001</span>
        <span class="stage-topline-line" aria-hidden="true"></span>
        <span>Open for wonder</span>
      </div>
      <div class="stage-card stage-card--back" data-depth="0.35">
        <div class="stage-card-label">In development</div>
        <img src="${asset(page, `img/${rush.heroImage}`)}" alt="${rush.heroImageAlt}" width="540" height="1200" fetchpriority="low" decoding="async">
      </div>
      <div class="stage-card stage-card--front" data-depth="1">
        <div class="stage-card-label">Pre-release</div>
        <img src="${asset(page, `img/${tap.heroImage}`)}" alt="${tap.heroImageAlt}" width="540" height="1200" fetchpriority="high" decoding="async">
      </div>
      <div class="stage-chip stage-chip--top">Games now</div>
      <div class="stage-chip stage-chip--bottom">Apps · AI · SaaS next</div>
      <div class="stage-spark" aria-hidden="true">✳</div>
      <div class="stage-ring" aria-hidden="true"></div>
    </div>
    <div class="stage-note"><span class="status-dot" aria-hidden="true"></span>Two products in the lab</div>
  </div>`;
}

function homeHero(page) {
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-background" aria-hidden="true">
      <span class="hero-glow hero-glow--acid"></span>
      <span class="hero-glow hero-glow--violet"></span>
      <span class="hero-grid-lines"></span>
    </div>
    <div class="container hero-grid">
      <div class="hero-copy">
        ${eyebrow("Independent product & technology brand")}
        <h1 id="hero-title">A lab for things <span class="hero-em"><em>worth opening.</em></span></h1>
        <p class="hero-lede">We build games with heart — and thoughtful apps, AI tools, and software for what comes next.</p>
        <div class="hero-actions">
          ${buttonLink(hrefFor(page, "products/"), "Explore the products")}
          <a class="quiet-link" href="${hrefFor(page, "about/")}"><span>Inside the lab</span>${icon("arrow-up-right")}</a>
        </div>
        <div class="hero-current">
          <span class="hero-current-label">In the lab</span>
          <a href="${hrefFor(page, productHref("tap-defense"))}"><span class="status-dot" aria-hidden="true"></span>Tap Defense</a>
          <a href="${hrefFor(page, productHref("rushtrail-runaway"))}"><span class="status-dot" aria-hidden="true"></span>RushTrail Runaway</a>
        </div>
      </div>
      ${heroStage(page)}
    </div>
    <div class="container hero-foot">
      <p>Games first. More kinds of software next.</p>
      <div class="hero-foot-right">
        <span>Games</span><span class="hero-foot-dot" aria-hidden="true"></span>
        <span>Apps</span><span class="hero-foot-dot" aria-hidden="true"></span>
        <span>AI tools</span><span class="hero-foot-dot" aria-hidden="true"></span>
        <span>SaaS</span>
      </div>
    </div>
  </section>`;
}

function ticker() {
  const items = ["Games", "Apps", "AI tools", "SaaS", "Digital products"];
  const group = `<div class="ticker-group">${items
    .map(
      (item) =>
        `<span>${item}</span><span class="ticker-star" aria-hidden="true">✳</span>`,
    )
    .join("")}</div>`;
  return `<section class="ticker" aria-label="What we build">
    <div class="ticker-track">
      ${group}
      <div class="ticker-group" aria-hidden="true">${items
        .map(
          (item) =>
            `<span>${item}</span><span class="ticker-star">✳</span>`,
        )
        .join("")}</div>
    </div>
  </section>`;
}

function categoryCards(page) {
  return site.categories
    .map((category, index) => {
      const isGames = category.id === "games";
      const tag = isGames ? "a" : "article";
      const attrs = isGames
        ? ` href="${hrefFor(page, "products/")}"`
        : "";
      return `<${tag} class="category-card category-card--${category.tone} reveal"${attrs} style="--reveal-delay:${index * 70}ms">
        <span class="category-watermark" aria-hidden="true">${icon(category.icon)}</span>
        <div class="category-top">
          <span class="category-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="category-icon">${icon(category.icon)}</span>
        </div>
        <div class="category-body">
          <h3>${esc(category.label)}</h3>
          <p>${esc(category.description)}</p>
        </div>
        <div class="category-foot">
          <span class="category-status"><span class="status-dot" aria-hidden="true"></span>${esc(category.status)}</span>
          <span class="category-note">${esc(category.note)}</span>
          ${isGames ? `<span class="category-arrow">${icon("arrow-up-right")}</span>` : ""}
        </div>
      </${tag}>`;
    })
    .join("");
}

function introSection(page) {
  return `<section class="intro-section">
    <div class="container intro-grid">
      <div class="intro-copy reveal">
        ${eyebrow("The lab")}
        <h2>One lab. Many kinds of <em>wonder.</em></h2>
      </div>
      <div class="intro-aside reveal" style="--reveal-delay:90ms">
        <p>We are not a games-only studio. Games are where the lab began — the beginning of a wider product practice, not the edge of it.</p>
        <p>The box stays the same: a small, well-made thing that opens into something bigger.</p>
      </div>
    </div>
    <div class="container category-grid">
      ${categoryCards(page)}
    </div>
  </section>`;
}

function workCard(page, product, index) {
  const href = hrefFor(page, productHref(product.slug));
  const background = product.heroBackground;
  return `<a class="work-card reveal" href="${href}" style="--product-accent:${product.theme.accent};--product-accent-two:${product.theme.accentTwo};--product-soft:${product.theme.soft};--product-ink:${product.theme.ink};--reveal-delay:${index * 90}ms">
    <div class="work-visual">
      <img class="work-backdrop" src="${asset(page, `img/${background}`)}" alt="" width="720" height="1280" loading="lazy" decoding="async">
      <div class="work-visual-wash" aria-hidden="true"></div>
      <div class="work-phone">
        <img src="${asset(page, `img/${product.heroImage}`)}" alt="${esc(product.heroImageAlt)}" width="540" height="1200" loading="lazy" decoding="async">
      </div>
      <div class="work-chips">
        <span class="category-chip">${esc(product.categoryLabel)}</span>
        ${statusChip(product)}
      </div>
      <span class="work-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
    </div>
    <div class="work-body">
      <div class="work-meta"><span>${esc(product.categoryLabel)}</span><span>${esc(product.statusDetail)}</span></div>
      <div class="work-title-row">
        <h3>${esc(product.name)}</h3>
        <span class="work-arrow">${icon("arrow-up-right")}</span>
      </div>
      <p>${esc(product.shortDescription)}</p>
      <div class="work-foot">
        <span>${esc(product.statusLabel)}</span>
        <span class="work-cta">Explore ${esc(product.name)}</span>
      </div>
    </div>
  </a>`;
}

function featuredSection(page) {
  return `<section class="featured-section" aria-labelledby="featured-title">
    <div class="container">
      <header class="section-head section-head--light">
        <div class="section-head-copy reveal">
          ${eyebrow("Selected products", "light")}
          <h2 id="featured-title">Worlds worth <em>opening.</em></h2>
        </div>
        <a class="text-link text-link--light reveal" href="${hrefFor(page, "products/")}" style="--reveal-delay:80ms"><span>See every product</span>${icon("arrow-up-right")}</a>
      </header>
      <div class="work-grid">
        ${products.filter((product) => product.featured).map((product, index) => workCard(page, product, index)).join("")}
      </div>
    </div>
  </section>`;
}

function ethosSection(page) {
  return `<section class="ethos-section">
    <div class="container ethos-grid">
      <div class="ethos-intro reveal">
        ${eyebrow("How we work")}
        <h2>Independent by <em>design.</em></h2>
        <p>Wonder Box Lab is built to make its own products, at its own pace, with the details given room to breathe. Games are the first chapter. The shelf has space for more.</p>
        <a class="quiet-link" href="${hrefFor(page, "about/")}"><span>More about the lab</span>${icon("arrow-up-right")}</a>
      </div>
      <ol class="principle-list">
        ${site.principles
          .map(
            (principle, index) => `<li class="principle reveal" style="--reveal-delay:${index * 80}ms">
              <span class="principle-index">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>${esc(principle.title)}</h3>
                <p>${esc(principle.body)}</p>
              </div>
            </li>`,
          )
          .join("")}
      </ol>
    </div>
    <div class="container now-strip reveal">
      <span class="now-strip-label">In the lab right now</span>
      <div class="now-items">
        <a class="now-item" href="${hrefFor(page, productHref("tap-defense"))}">
          <span class="now-item-name">Tap Defense</span>
          <span class="now-item-status"><span class="status-dot" aria-hidden="true"></span>Pre-release</span>
          ${icon("arrow-up-right")}
        </a>
        <a class="now-item" href="${hrefFor(page, productHref("rushtrail-runaway"))}">
          <span class="now-item-name">RushTrail Runaway</span>
          <span class="now-item-status"><span class="status-dot" aria-hidden="true"></span>In development</span>
          ${icon("arrow-up-right")}
        </a>
        <span class="now-item now-item--quiet">
          <span class="now-item-name">Apps, AI tools & SaaS</span>
          <span class="now-item-status"><span class="status-dot" aria-hidden="true"></span>Exploring</span>
        </span>
      </div>
    </div>
  </section>`;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function homePage() {
  return {
    page: "",
    key: "home",
    title: "A lab for things worth opening",
    description: site.description,
    bodyClass: "page-home",
    jsonLd: homeJsonLd,
    body: `${homeHero("")}
      ${ticker()}
      ${introSection("")}
      ${featuredSection("")}
      ${ethosSection("")}
      ${ctaBand("")}`,
  };
}

export function productsPage() {
  const page = "products/";
  const counts = Object.fromEntries(productCategories.map((category) => [category.id, 0]));
  products.forEach((product) => {
    counts.all += 1;
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Products — ${site.name}`,
    url: absoluteUrl(page),
    description:
      "The Wonder Box Lab product catalog: games today, with apps, AI tools, and SaaS planned for the future.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: absoluteUrl(productHref(product.slug)),
      })),
    },
  };

  return {
    page,
    key: "products",
    title: "Products",
    description:
      "Explore the Wonder Box Lab catalog. Games today — Tap Defense and RushTrail Runaway — with apps, AI tools, and SaaS planned for the future.",
    bodyClass: "page-products",
    jsonLd,
    body: `<section class="page-hero page-hero--catalog">
      <div class="container page-hero-grid">
        <div class="page-hero-copy reveal">
          ${eyebrow("The catalog")}
          <h1>Everything we're <em>building.</em></h1>
          <p>Games today. Apps, AI tools, and SaaS as the lab grows. The catalog is deliberately small — only the things we are actually making.</p>
        </div>
        <div class="catalog-summary reveal" style="--reveal-delay:90ms">
          <div class="catalog-stat"><strong>02</strong><span>products in the catalog</span></div>
          <div class="catalog-stat"><strong>01</strong><span>category with shipped work</span></div>
          <div class="catalog-stat"><strong>04</strong><span>categories in the plan</span></div>
        </div>
      </div>
    </section>
    <section class="catalog-section" aria-label="Product catalog">
      <div class="container">
        ${productFilterBar(page, counts)}
        <div class="product-grid" data-product-grid>
          ${products.map((product) => productCard(page, product)).join("")}
        </div>
        <div class="catalog-empty" data-catalog-empty hidden>
          <span class="catalog-empty-icon">${icon("spark")}</span>
          <div>
            <h2>Nothing here <em>yet.</em></h2>
            <p data-empty-copy>This category is part of the plan, but there is nothing to share in it right now.</p>
            <button class="text-button" type="button" data-filter-reset>See all products ${icon("arrow-right")}</button>
          </div>
        </div>
        <p class="catalog-note">New products will be added here only when there is something real to show. No placeholder catalog entries, no imaginary release dates.</p>
      </div>
    </section>
    <section class="lanes-section">
      <div class="container">
        <header class="section-head">
          <div class="section-head-copy reveal">
            ${eyebrow("Where we're going")}
            <h2>More boxes, <em>eventually.</em></h2>
          </div>
          <p class="section-lede section-lede--side reveal" style="--reveal-delay:80ms">The site is built for many kinds of products. These lanes open as the work becomes real.</p>
        </header>
        <div class="lane-grid">
          ${[
            {
              id: "apps",
              title: "Apps",
              text: "Quiet, useful tools for everyday life. Still exploring, still sketching.",
              icon: "apps",
            },
            {
              id: "ai",
              title: "AI tools",
              text: "Assistive software that keeps the person in charge and the craft visible.",
              icon: "spark",
            },
            {
              id: "saas",
              title: "SaaS",
              text: "Focused platforms for work that deserves less friction and more clarity.",
              icon: "layers",
            },
          ]
            .map(
              (lane, index) => `<article class="lane-card reveal" style="--reveal-delay:${index * 70}ms">
                <span class="lane-icon">${icon(lane.icon)}</span>
                <div>
                  <h3>${lane.title}</h3>
                  <p>${lane.text}</p>
                </div>
                <span class="lane-status"><span class="status-dot" aria-hidden="true"></span>In the lab</span>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    ${ctaBand(page)}`,
  };
}

function productThemeStyle(product) {
  return `--product-accent:${product.theme.accent};--product-accent-two:${product.theme.accentTwo};--product-soft:${product.theme.soft};--product-ink:${product.theme.ink};--product-glow:${product.theme.glow}`;
}

function productHero(page, product) {
  const primaryHref = product.storeUrl
    ? product.storeUrl
    : `mailto:${site.email}?subject=${encodeURIComponent(product.supportSubject)}`;
  const primaryLabel = product.storeUrl ? "Get it on Google Play" : product.availabilityCta;
  const primaryExternal = Boolean(product.storeUrl);

  return `<div class="container breadcrumb-row reveal">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="${hrefFor(page)}">Home</a>
        <span aria-hidden="true">/</span>
        <a href="${hrefFor(page, "products/")}">Products</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${esc(product.name)}</span>
      </nav>
    </div>
    <section class="product-hero" aria-labelledby="product-title">
      <div class="container product-hero-grid">
        <div class="product-intro reveal">
          <div class="product-lockup">
            ${productIcon(page, product)}
            <span class="category-chip">${esc(product.categoryLabel)}</span>
            ${statusChip(product)}
          </div>
          <h1 id="product-title">${esc(product.name)}</h1>
          <p class="product-tagline">${esc(product.tagline)}</p>
          <p class="product-lede">${esc(product.intro)}</p>
          <div class="product-actions">
            ${buttonLink(primaryHref, primaryLabel, { external: primaryExternal })}
            <a class="quiet-link" href="#gallery"><span>See the screens</span>${icon("arrow-down", "icon--down")}</a>
          </div>
          <dl class="product-facts">
            ${product.facts
              .map(
                (fact) => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.value)}</dd></div>`,
              )
              .join("")}
          </dl>
        </div>
        <div class="product-hero-art reveal" style="--reveal-delay:100ms">
          <div class="product-art-bg" aria-hidden="true">
            <img src="${asset(page, `img/${product.heroBackground}`)}" alt="" width="720" height="1280" fetchpriority="high" decoding="async">
          </div>
          <div class="product-art-phone">
            <span class="product-art-notch" aria-hidden="true"></span>
            <img src="${asset(page, `img/${product.heroImage}`)}" alt="${esc(product.heroImageAlt)}" width="540" height="1200" fetchpriority="high" decoding="async">
          </div>
          <span class="product-art-ring" aria-hidden="true"></span>
          <span class="product-art-spark" aria-hidden="true">✳</span>
          <span class="product-art-tag">${esc(product.statusDetail)}</span>
        </div>
      </div>
    </section>
    <section class="availability-strip" aria-label="Availability">
      <div class="container availability-inner">
        <span class="availability-icon">${icon(product.storeUrl ? "play" : "clock")}</span>
        <div class="availability-copy">
          <strong>${esc(product.availabilityTitle)}</strong>
          <p>${esc(product.availabilityNote)}</p>
        </div>
        <a class="availability-link" href="mailto:${site.email}?subject=${encodeURIComponent(
          product.supportSubject,
        )}">${esc(product.availabilityCta)}${icon("arrow-up-right")}</a>
      </div>
    </section>`;
}

function overviewSection(product) {
  return `<section class="product-section product-overview" aria-labelledby="overview-title">
    <div class="container product-section-grid">
      <div class="product-section-aside reveal">${eyebrow("The product")}</div>
      <div class="product-section-content reveal" style="--reveal-delay:60ms">
        <h2 id="overview-title">${esc(product.overviewTitle)}</h2>
        <div class="overview-copy">
          ${product.longDescription.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function featuresSection(product) {
  return `<section class="product-section product-features" id="features" aria-labelledby="features-title">
    <div class="container">
      <header class="product-section-head reveal">
        ${eyebrow("What's inside")}
        <h2 id="features-title">Built around <em>the moment.</em></h2>
      </header>
      <div class="feature-grid">
        ${product.features
          .map(
            (feature, index) => `<article class="feature-card reveal" style="--reveal-delay:${index * 70}ms">
              <div class="feature-top">
                <span class="feature-icon">${icon(feature.icon)}</span>
                <span class="feature-index">${String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>${esc(feature.title)}</h3>
              <p>${esc(feature.body)}</p>
            </article>`,
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function gallerySection(page, product) {
  return `<section class="gallery-section" id="gallery" aria-labelledby="gallery-title">
    <div class="container">
      <header class="gallery-head reveal">
        <div>
          ${eyebrow("Screens")}
          <h2 id="gallery-title">A look <em>inside.</em></h2>
        </div>
        <p class="gallery-note">${
          product.status === "in-development"
            ? "Screenshots from the current development build. Things may change."
            : "Screens from the Android build."
        }</p>
      </header>
      <div class="shot-rail" tabindex="0" role="region" aria-label="${esc(
        product.name,
      )} screenshots">
        ${product.gallery
          .map(
            (shot, index) => `<figure class="shot reveal" style="--reveal-delay:${index * 60}ms">
              <div class="shot-frame">
                <img src="${asset(page, `img/${shot.src}`)}" alt="${esc(shot.alt)}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async">
              </div>
              <figcaption><span>${String(index + 1).padStart(2, "0")}</span>${esc(shot.caption)}</figcaption>
            </figure>`,
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function helpSection(page, product) {
  const privacyHref = product.privacyUrl
    ? product.privacyUrl
    : hrefFor(page, "legal/privacy/");
  const privacyLabel = product.privacyUrl
    ? product.privacyLabel
    : "Website privacy policy";
  const privacyExternal = Boolean(product.privacyUrl);
  return `<section class="product-section product-help" id="support" aria-labelledby="support-title">
    <div class="container">
      <header class="product-section-head reveal">
        ${eyebrow("Support & privacy")}
        <h2 id="support-title">Help, without <em>the runaround.</em></h2>
      </header>
      <div class="help-grid">
        <article class="help-card reveal">
          <span class="help-icon">${icon("lifebuoy")}</span>
          <h3>Product support</h3>
          <p>${esc(product.supportText)}</p>
          <a class="btn btn--small btn--primary" href="mailto:${site.email}?subject=${encodeURIComponent(
            product.supportSubject,
          )}"><span>Email support</span><span class="btn-arrow">${icon("arrow-up-right")}</span></a>
          <p class="help-meta">${site.email}</p>
        </article>
        <article class="help-card help-card--soft reveal" style="--reveal-delay:80ms">
          <span class="help-icon">${icon("lock")}</span>
          <h3>Privacy</h3>
          <p>${esc(product.privacyNote)}</p>
          <a class="text-link" href="${privacyHref}"${
            privacyExternal ? ' target="_blank" rel="noopener noreferrer"' : ""
          }><span>${esc(privacyLabel)}</span>${icon(privacyExternal ? "arrow-up-right" : "arrow-right")}</a>
          <p class="help-meta">${
            product.privacyUrl
              ? "Opens the separately hosted Tap Defense policy."
              : "A product policy will be added before release."
          }</p>
        </article>
      </div>
    </div>
  </section>`;
}

function faqSection(product) {
  return `<section class="product-section product-faq" aria-labelledby="faq-title">
    <div class="container product-section-grid">
      <div class="product-section-aside reveal">
        ${eyebrow("Good to know")}
        <h2 id="faq-title">Questions, <em>answered.</em></h2>
      </div>
      <div class="faq-list reveal" style="--reveal-delay:60ms">
        ${product.faq
          .map(
            (item, index) => `<details class="faq-item"${index === 0 ? " open" : ""}>
              <summary><span>${esc(item.q)}</span><span class="faq-plus">${icon("plus")}</span></summary>
              <div class="faq-answer"><p>${esc(item.a)}</p></div>
            </details>`,
          )
          .join("")}
        <p class="faq-foot">Still curious? <a href="mailto:${site.email}?subject=${encodeURIComponent(
          product.supportSubject,
        )}">Email the lab</a>.</p>
      </div>
    </div>
  </section>`;
}

export function productPage(product) {
  const page = productHref(product.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(page)}#software`,
        name: product.name,
        applicationCategory: "GameApplication",
        operatingSystem: product.platform,
        description: product.shortDescription,
        url: absoluteUrl(page),
        image: absoluteUrl(`assets/img/${product.heroImage}`),
        author: {
          "@type": "Organization",
          name: site.name,
          url: site.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(page)}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl(""),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: absoluteUrl("products/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: absoluteUrl(page),
          },
        ],
      },
    ],
  };

  return {
    page,
    key: "products",
    title: product.name,
    description: product.seoDescription,
    bodyClass: `page-product page-product--${product.slug}`,
    ogImage: `assets/img/og-${product.slug}.jpg`,
    jsonLd,
    body: `<div class="product-page" style="${productThemeStyle(product)}">
      ${productHero(page, product)}
      ${overviewSection(product)}
      ${featuresSection(product)}
      ${gallerySection(page, product)}
      ${helpSection(page, product)}
      ${faqSection(product)}
      ${nextProduct(page, product)}
      ${ctaBand(page)}
    </div>`,
  };
}

export function aboutPage() {
  const page = "about/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About — ${site.name}`,
    url: absoluteUrl(page),
    description:
      "Wonder Box Lab is an independent product and technology brand building games today, and thoughtful apps, AI tools, and software next.",
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: site.siteUrl,
      logo: absoluteUrl("assets/img/brand/logo-512.png"),
      email: site.email,
      description: site.description,
    },
  };

  return {
    page,
    key: "about",
    title: "About the lab",
    description:
      "Wonder Box Lab is an independent product and technology brand. Games are the first chapter; apps, AI tools, SaaS, and other software come next.",
    bodyClass: "page-about",
    jsonLd,
    body: `<section class="page-hero page-hero--about">
      <div class="container page-hero-copy reveal">
        ${eyebrow("About the lab")}
        <h1>An independent lab for <em>digital things.</em></h1>
        <p>Wonder Box Lab is an independent product and technology brand. We design and build digital products with a simple standard: it should feel worth opening.</p>
      </div>
      <div class="container about-marquee reveal" aria-hidden="true">
        <span>Games</span><i>✳</i><span>Apps</span><i>✳</i><span>AI tools</span><i>✳</i><span>SaaS</span><i>✳</i><span>Wonder</span>
      </div>
    </section>
    <section class="about-story">
      <div class="container about-story-grid">
        <div class="about-quote reveal">
          <p>“The box is not the product. <em>What's inside is.</em>”</p>
        </div>
        <div class="about-copy reveal" style="--reveal-delay:80ms">
          <p class="about-copy-lede">We are a product brand, not a genre. Games are simply where the lab began.</p>
          <p>Wonder Box Lab started with a love of small, complete experiences — the kind of game you can pick up for a minute and still feel something. That same standard applies to everything else we want to make: apps that respect attention, AI tools that keep people in charge, and software that removes friction instead of adding it.</p>
          <p>We are independent, which means we can follow the idea instead of the trend. It also means we take our time. The catalog should stay small until each product has earned its place.</p>
          <p>There is no published release calendar for the future. When a new box is ready to open, it will appear here.</p>
        </div>
      </div>
    </section>
    <section class="about-principles">
      <div class="container">
        <header class="section-head">
          <div class="section-head-copy reveal">
            ${eyebrow("The work")}
            <h2>Made with <em>intention.</em></h2>
          </div>
          <p class="section-lede section-lede--side reveal" style="--reveal-delay:70ms">Three ideas that shape how products get made here.</p>
        </header>
        <div class="about-principle-grid">
          ${site.principles
            .map(
              (principle, index) => `<article class="about-principle reveal" style="--reveal-delay:${index * 80}ms">
                <span class="about-principle-index">${String(index + 1).padStart(2, "0")}</span>
                <h3>${esc(principle.title)}</h3>
                <p>${esc(principle.body)}</p>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="about-categories">
      <div class="container">
        <div class="about-category-intro reveal">
          ${eyebrow("The shelf")}
          <h2>One brand. Many <em>surfaces.</em></h2>
          <p>The website and product system are built to hold games, apps, AI tools, SaaS, and other software without becoming a gaming site with extra rooms bolted on.</p>
        </div>
        <div class="about-category-list">
          ${site.categories
            .map(
              (category, index) => `<div class="about-category-row reveal" style="--reveal-delay:${index * 60}ms">
                <span class="about-category-num">${String(index + 1).padStart(2, "0")}</span>
                <span class="about-category-icon">${icon(category.icon)}</span>
                <h3>${esc(category.label)}</h3>
                <p>${esc(category.description)}</p>
                <span class="about-category-state">${esc(category.status)}</span>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="about-honesty">
      <div class="container about-honesty-inner reveal">
        <span class="about-honesty-mark" aria-hidden="true">✳</span>
        <div>
          ${eyebrow("A small promise")}
          <h2>No imaginary products. No borrowed credentials.</h2>
          <p>Everything on this site describes work that exists or a direction we are genuinely exploring. If a product is in development, it says so. If there is no public download, there is no fake button.</p>
        </div>
      </div>
    </section>
    ${ctaBand(page)}`,
  };
}

export function supportPage() {
  const page = "support/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Support — ${site.name}`,
    url: absoluteUrl(page),
    description:
      "Contact Wonder Box Lab for product support, privacy questions, or general enquiries.",
  };

  return {
    page,
    key: "support",
    title: "Support & contact",
    description:
      "Contact Wonder Box Lab for product support, privacy requests, or general questions about Tap Defense, RushTrail Runaway, and the lab.",
    bodyClass: "page-support",
    jsonLd,
    body: `<section class="support-hero">
      <div class="container support-hero-grid">
        <div class="support-hero-copy reveal">
          ${eyebrow("Support & contact")}
          <h1>How can we <em>help?</em></h1>
          <p>One inbox, read by the lab. Product support, privacy requests, release questions, or just a note — it all starts here.</p>
        </div>
        <div class="support-email-card reveal" style="--reveal-delay:80ms">
          <span class="support-email-icon">${icon("mail")}</span>
          <p class="support-email-label">Email Wonder Box Lab</p>
          <a class="support-email-link" href="mailto:${site.email}">${site.email}</a>
          <button class="copy-button" type="button" data-copy-email="${site.email}">
            <span data-copy-label>Copy address</span>
            ${icon("copy")}
          </button>
          <p class="support-email-note">No contact form, no account, no tracking. Just email.</p>
        </div>
      </div>
    </section>
    <section class="support-products">
      <div class="container">
        <header class="section-head">
          <div class="section-head-copy reveal">
            ${eyebrow("Product support")}
            <h2>Start with the <em>product.</em></h2>
          </div>
        </header>
        <div class="support-product-grid">
          ${products
            .map(
              (product, index) => `<article class="support-product-card reveal" style="--product-accent:${product.theme.accent};--product-soft:${product.theme.soft};--reveal-delay:${index * 80}ms">
                <div class="support-product-top">
                  ${productIcon(page, product)}
                  <div>
                    <h3>${esc(product.name)}</h3>
                    <p>${esc(product.statusDetail)}</p>
                  </div>
                </div>
                <p>${esc(product.supportText)}</p>
                <div class="support-product-actions">
                  <a class="btn btn--small btn--primary" href="mailto:${site.email}?subject=${encodeURIComponent(
                    product.supportSubject,
                  )}"><span>Email about ${esc(product.name)}</span><span class="btn-arrow">${icon("arrow-up-right")}</span></a>
                  <a class="text-link" href="${hrefFor(page, productHref(product.slug))}"><span>Product page</span>${icon("arrow-right")}</a>
                </div>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="support-guide">
      <div class="container support-guide-grid">
        <div class="support-guide-intro reveal">
          ${eyebrow("Before you write")}
          <h2>A little context <em>helps.</em></h2>
          <p>For product issues, include enough detail for us to understand what happened. Please leave out passwords, payment-card numbers, and anything else you would not want in an email.</p>
        </div>
        <ul class="support-checklist">
          ${[
            "The product and version, if you know it",
            "Your device model and operating-system version",
            "What you expected to happen",
            "What actually happened",
            "A screenshot, if it is safe to share",
          ]
            .map(
              (item, index) => `<li class="reveal" style="--reveal-delay:${index * 50}ms"><span>${icon("check")}</span>${esc(item)}</li>`,
            )
            .join("")}
        </ul>
      </div>
    </section>
    <section class="support-faq">
      <div class="container support-faq-grid">
        <div class="support-faq-intro reveal">
          ${eyebrow("Common questions")}
          <h2>Quick <em>answers.</em></h2>
          <p>Looking for a product-specific policy? Tap Defense has a separate published privacy policy.</p>
          <a class="text-link" href="https://emrulkayes031-coder.github.io/tap-defense-privacy/" target="_blank" rel="noopener noreferrer"><span>Tap Defense privacy policy</span>${icon("arrow-up-right")}</a>
        </div>
        <div class="faq-list reveal" style="--reveal-delay:70ms">
          <details class="faq-item" open>
            <summary><span>Where can I download Tap Defense?</span><span class="faq-plus">${icon("plus")}</span></summary>
            <div class="faq-answer"><p>Tap Defense is in pre-release and does not have a public Google Play listing yet. A verified store link will be added to its product page when one is available.</p></div>
          </details>
          <details class="faq-item">
            <summary><span>Is RushTrail Runaway available?</span><span class="faq-plus">${icon("plus")}</span></summary>
            <div class="faq-answer"><p>Not yet. RushTrail Runaway is an active development build with no public download or release date.</p></div>
          </details>
          <details class="faq-item">
            <summary><span>How do I make a privacy request?</span><span class="faq-plus">${icon("plus")}</span></summary>
            <div class="faq-answer"><p>Email us with “Privacy request” in the subject. Tell us which product or page the request concerns. For Tap Defense, the published product policy explains how app data is handled.</p></div>
          </details>
          <details class="faq-item">
            <summary><span>How do refunds work?</span><span class="faq-plus">${icon("plus")}</span></summary>
            <div class="faq-answer"><p>Purchases made through Google Play are processed by Google Play. Start with Google Play's refund flow. If you are unsure which purchase is involved, email us and we will help point you in the right direction.</p></div>
          </details>
          <details class="faq-item">
            <summary><span>Can I ask about future products?</span><span class="faq-plus">${icon("plus")}</span></summary>
            <div class="faq-answer"><p>Of course. We are exploring apps, AI tools, and SaaS alongside games. There are no public dates or unreleased product details to share yet, but we are happy to hear what you are curious about.</p></div>
          </details>
        </div>
      </div>
    </section>
    <section class="support-legal-strip">
      <div class="container support-legal-inner">
        <div>
          ${eyebrow("The fine print", "light")}
          <h2>Legal, without the maze.</h2>
        </div>
        <div class="support-legal-links">
          <a href="${hrefFor(page, "legal/privacy/")}"><span>Website privacy</span>${icon("arrow-up-right")}</a>
          <a href="${hrefFor(page, "legal/terms/")}"><span>Terms of use</span>${icon("arrow-up-right")}</a>
          <a href="${hrefFor(page, "legal/")}"><span>All legal</span>${icon("arrow-up-right")}</a>
        </div>
      </div>
    </section>`,
  };
}

export function legalHubPage() {
  const page = "legal/";
  return {
    page,
    key: "legal",
    title: "Legal",
    description:
      "Wonder Box Lab website privacy policy, terms of use, and links to product-specific policies.",
    bodyClass: "page-legal",
    body: `<section class="page-hero page-hero--legal">
      <div class="container page-hero-copy reveal">
        ${eyebrow("Legal")}
        <h1>The fine print, <em>in plain language.</em></h1>
        <p>How this website handles information, the terms for using it, and where to find product-specific policies.</p>
      </div>
    </section>
    <section class="legal-hub">
      <div class="container">
        <div class="legal-hub-grid">
          <a class="legal-card reveal" href="${hrefFor(page, "legal/privacy/")}">
            <span class="legal-card-icon">${icon("lock")}</span>
            <div>
              <h2>Website privacy</h2>
              <p>What this static site does and does not collect, how email is handled, and the role of GitHub Pages.</p>
              <span class="text-link">Read the policy ${icon("arrow-right")}</span>
            </div>
          </a>
          <a class="legal-card reveal" href="${hrefFor(page, "legal/terms/")}" style="--reveal-delay:80ms">
            <span class="legal-card-icon">${icon("check")}</span>
            <div>
              <h2>Terms of use</h2>
              <p>The ground rules for using this website, the content on it, and links to other services.</p>
              <span class="text-link">Read the terms ${icon("arrow-right")}</span>
            </div>
          </a>
        </div>
        <div class="legal-product-note reveal">
          <div>
            ${eyebrow("Product policies", "light")}
            <h2>Products have their own fine print.</h2>
            <p>This website's policy does not replace the privacy policy of a product. Tap Defense has a separately published Android privacy policy. A RushTrail Runaway policy will be published before its release.</p>
          </div>
          <a class="btn btn--primary" href="https://emrulkayes031-coder.github.io/tap-defense-privacy/" target="_blank" rel="noopener noreferrer"><span>Tap Defense privacy policy</span><span class="btn-arrow">${icon("arrow-up-right")}</span></a>
        </div>
        <p class="legal-updated">Last updated: ${site.updated}</p>
      </div>
    </section>`,
  };
}

function legalShell(page, { title, lede, sections, updated }) {
  return `<section class="legal-page">
    <div class="container legal-layout">
      <aside class="legal-aside reveal">
        <nav aria-label="On this page">
          <p class="legal-aside-label">On this page</p>
          ${sections
            .map(
              (section, index) =>
                `<a href="#section-${index + 1}">${esc(section.title)}</a>`,
            )
            .join("")}
        </nav>
        <a class="text-link text-link--small" href="${hrefFor(page, "legal/")}"><span>All legal</span>${icon("arrow-left")}</a>
      </aside>
      <article class="legal-content reveal" style="--reveal-delay:60ms">
        ${eyebrow("Wonder Box Lab")}
        <h1>${title}</h1>
        <p class="legal-lede">${lede}</p>
        <p class="legal-updated">Effective ${updated}</p>
        ${sections
          .map(
            (section, index) => `<section class="legal-section" id="section-${index + 1}">
              <h2>${esc(section.title)}</h2>
              ${section.body}
            </section>`,
          )
          .join("")}
      </article>
    </div>
  </section>`;
}

export function privacyPage() {
  const page = "legal/privacy/";
  const updated = site.updated;
  const sections = [
    {
      title: "Scope",
      body: `<p>This policy explains how Wonder Box Lab handles information on this website. It does not replace the privacy policy for any product. Tap Defense has a separately published policy, and a RushTrail Runaway policy will be published before that product's release.</p>`,
    },
    {
      title: "Information you give us",
      body: `<p>This site does not ask you to create an account or submit a form. If you email us, we receive your email address and whatever you choose to include in the message. We use that information to reply and to handle the request. We do not sell it.</p>`,
    },
    {
      title: "Information collected automatically",
      body: `<p>This is a static website. We do not use analytics, advertising cookies, tracking pixels, or third-party embeds. The site is hosted on GitHub Pages, which processes technical information such as IP addresses and request logs to deliver and secure the site. That processing is governed by <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's privacy statement</a>.</p>`,
    },
    {
      title: "Cookies",
      body: `<p>This website does not set cookies. All fonts, images, and scripts are served from this site. Clicking a link to another website, such as Google Play or GitHub, takes you to a service with its own privacy practices.</p>`,
    },
    {
      title: "How we use and keep information",
      body: `<p>Email correspondence is used to respond to your message, provide support, and meet legal obligations where applicable. We keep it only for as long as needed for those purposes, then delete or archive it as appropriate.</p>`,
    },
    {
      title: "Your choices",
      body: `<p>You can ask us about the information you sent by email, request a correction, or ask us to delete it. We will consider requests consistent with applicable law. Email <a href="mailto:${site.email}">${site.email}</a> with “Privacy request” in the subject.</p>`,
    },
    {
      title: "Children",
      body: `<p>This website is a general-audience site about Wonder Box Lab and its products. It is not directed to children. Product-specific policies describe the audience and data practices for each product.</p>`,
    },
    {
      title: "Changes to this policy",
      body: `<p>If this policy changes, the updated version will be posted here with a new effective date. Material changes will be reflected on this page.</p>`,
    },
    {
      title: "Contact",
      body: `<p>Questions about this policy can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p>`,
    },
  ];
  return {
    page,
    key: "legal",
    title: "Privacy policy",
    description:
      "Wonder Box Lab website privacy policy: what this static site collects, how email is handled, and how GitHub Pages hosting fits in.",
    bodyClass: "page-legal",
    body: legalShell(page, {
      title: "Privacy policy",
      lede:
        "A short policy for a small website. This page covers the Wonder Box Lab website only.",
      sections,
      updated,
    }),
  };
}

export function termsPage() {
  const page = "legal/terms/";
  const updated = site.updated;
  const sections = [
    {
      title: "Using this website",
      body: `<p>This website is provided by Wonder Box Lab for information about the brand and its products. By using it, you agree to these terms. If you do not agree, please do not use the site.</p>`,
    },
    {
      title: "Product information",
      body: `<p>Product descriptions, screenshots, availability notes, and development status are provided for general information. Products in development may change, and a product shown here may not be publicly available. A download link is only added when it is verified.</p>`,
    },
    {
      title: "Intellectual property",
      body: `<p>The Wonder Box Lab name, visual identity, site design, copy, and product artwork are owned by or licensed to Wonder Box Lab. You may view the site and share links to it. Do not reproduce, republish, or use the content commercially without permission, or in a way that suggests endorsement.</p>`,
    },
    {
      title: "Links to other services",
      body: `<p>This site links to external services such as GitHub and Google Play. Those services are not controlled by Wonder Box Lab and have their own terms and privacy policies. We are not responsible for their content or practices.</p>`,
    },
    {
      title: "No warranties",
      body: `<p>This website is provided on an “as is” and “as available” basis. To the extent permitted by law, Wonder Box Lab makes no warranties about the accuracy, availability, or fitness of the site for a particular purpose.</p>`,
    },
    {
      title: "Limitation of liability",
      body: `<p>To the extent permitted by law, Wonder Box Lab will not be liable for indirect or consequential loss arising from use of this website. Nothing in these terms limits rights that cannot be limited by law.</p>`,
    },
    {
      title: "Product terms",
      body: `<p>Products may have their own terms, including terms provided by Google Play or another distribution platform. Those terms apply when you use the product.</p>`,
    },
    {
      title: "Changes",
      body: `<p>These terms may be updated as the site changes. The current version will remain on this page with its effective date.</p>`,
    },
    {
      title: "Contact",
      body: `<p>Questions about these terms can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p>`,
    },
  ];
  return {
    page,
    key: "legal",
    title: "Terms of use",
    description:
      "Terms of use for the Wonder Box Lab website, including product information, intellectual property, external links, and contact details.",
    bodyClass: "page-legal",
    body: legalShell(page, {
      title: "Terms of use",
      lede:
        "The ground rules for using this website. Product-specific terms may also apply.",
      sections,
      updated,
    }),
  };
}

export function notFoundPage() {
  return {
    page: "",
    key: "404",
    title: "Page not found",
    fullTitleOverride: "Page not found — Wonder Box Lab",
    description: "The page you were looking for is not here.",
    bodyClass: "page-404",
    head: '<meta name="robots" content="noindex">',
    body: `<section class="not-found">
      <div class="container not-found-inner reveal">
        <span class="not-found-mark" aria-hidden="true">✳</span>
        ${eyebrow("404")}
        <h1>That box is <em>empty.</em></h1>
        <p>The page you were looking for is not here — or it has moved. The lab is still open.</p>
        <div class="not-found-actions">
          ${buttonLink("./", "Back to the lab", { arrow: false })}
          <a class="quiet-link" href="products/"><span>Browse products</span>${icon("arrow-up-right")}</a>
        </div>
      </div>
    </section>`,
  };
}
