/* ==========================================================================
   Build — generates the static site into the project root.
   Run:  node build/build.mjs
   ========================================================================== */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  company, families, services, industries, differentiators, milestones, faqs,
  clients, proof,
} from "./data.mjs";
import {
  page, header, footer, logo, icons, artFor, art, productCard, ctaBand,
  pageHead, sectionHead, ratingPill, setNavProducts, shot, figure, gallery, asset,
} from "./render.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
setNavProducts(families);

const { contact, legal } = company;
const MODEL_COUNT = families.reduce((a, f) => a + f.models.length, 0);

/* Canonical origin for social scrapers and search engines. Override with
   SITE_ORIGIN when deploying somewhere else:  SITE_ORIGIN=https://x node build/build.mjs */
const SITE_ORIGIN = (process.env.SITE_ORIGIN || "https://saranyansaro.github.io/Ferrocare-Website").replace(/\/$/, "");
const canon = (file) => `${SITE_ORIGIN}/${file}`;
const GROUP_LABEL = {
  oil: "Oil purification",
  filtration: "Mechanical filtration",
  coolant: "Process fluids",
  monitoring: "Condition monitoring",
  consumable: "Consumables & steels",
};

/* ============================== HOME ===================================== */
const home = () => {
  const body = `
<section class="hero">
  <div class="wrap hero__inner">
    <div class="hero__layout">
      <div>
        <div data-reveal>${ratingPill()}</div>
        <h1 data-reveal data-delay="1">We keep industrial oil <em>clean enough to trust.</em></h1>
        <p class="lead hero__lead" data-reveal data-delay="2">
          Ferrocare builds the machines that take contamination out of hydraulic, gear,
          turbine and lube oil — electrostatic cleaners that reach below one micron,
          vacuum dehydrators that pull water down to 10 ppm, and the instruments that
          prove it worked. Manufacturing in Pune since 1980.
        </p>
        <div class="btn-row hero__actions" data-reveal data-delay="3">
          <a class="btn btn--primary btn--lg" href="products.html">Explore the range ${icons.arrow}</a>
          <a class="btn btn--ghost btn--lg" href="contact.html">Talk to an engineer</a>
        </div>
        <div class="hero__trust" data-reveal data-delay="4">
          <div class="hero__trust-item"><strong>45+</strong><span>Years engineering oil</span></div>
          <div class="hero__trust-item"><strong>${families.length}</strong><span>Product families</span></div>
          <div class="hero__trust-item"><strong>${MODEL_COUNT}</strong><span>Documented models</span></div>
          <div class="hero__trust-item"><strong>1 µ</strong><span>And below, electrostatically</span></div>
        </div>
      </div>

      <div class="hero__visual" data-reveal data-delay="2">
        <div class="hero__machine">
          <div class="hero__machine-glow"></div>
          <img src="assets/img/elc-machine.webp"
               alt="Ferrocare ELC electrostatic liquid cleaner on a trolley"
               width="554" height="669" fetchpriority="high" decoding="async">
        </div>
        <div class="float-card float-card--a">
          <div class="float-card__k">Cleanliness</div>
          <div class="float-card__v">ISO 18/16/13</div>
        </div>
        <div class="float-card float-card--b">
          <div class="float-card__k">Final water</div>
          <div class="float-card__v">10 <small>ppm</small></div>
        </div>
        <div class="float-card float-card--c">
          <div class="float-card__k">Collection</div>
          <div class="float-card__v">1 µ <small>&amp; below</small></div>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          ELC Series · Electrostatic Liquid Cleaner
        </div>
      </div>
    </div>
  </div>
</section>

<!-- clients -->
<section class="section section--tight">
  <div class="wrap">
    <div class="center" data-reveal>
      <span class="eyebrow eyebrow--bare">Supplied to plants across Indian industry</span>
      <h2 class="mt-4" style="font-size:var(--t-h3)">${proof[0].value} ELC units in India. ${proof[1].value} worldwide.</h2>
      <p class="lead mt-4" style="margin-inline:auto;text-align:center">
        Four decades of supply to steel mills, power stations, automotive lines,
        plastics plants and defence establishments.
      </p>
    </div>
    <div class="client-grid mt-8" data-reveal data-delay="2">
      ${clients.map((c) => `<span class="client">${c}</span>`).join("")}
    </div>
    <p class="center mono mt-6" style="color:var(--fg-subtle)">
      Client names are drawn from Ferrocare's own published client listings, historical and current.
    </p>
  </div>
</section>

<!-- what we do -->
<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "What we build",
      title: "Six engineering disciplines, one oil programme",
      lead: "Contamination is not one problem. Solid particles, water, varnish and sludge each need a different machine — and a different measurement. Ferrocare builds across all of them, which means the recommendation is sized to your oil rather than to a product list.",
    })}
    <div class="grid grid--3 mt-8">
      ${[
        { art: "elc", t: "Electrostatic cleaning", d: "High-voltage collection of suspended particles, sludge and varnish to 1 micron and below — with no effect on the oil's additives.", l: "product-electrostatic-liquid-cleaners.html" },
        { art: "lvdh", t: "Vacuum dehydration", d: "Free, emulsified and dissolved water removed under low vacuum, returning oil to 10–20 ppm without thermal stress.", l: "product-low-vacuum-dehydration.html" },
        { art: "hydraulic", t: "Mechanical filtration", d: "Magnetic pre-straining and multi-stage cartridge trains that hold ISO cleanliness codes on live hydraulic systems.", l: "product-hydraulic-oil-filtration-machines.html" },
        { art: "coolant", t: "Coolant systems", d: "High-flow filtration for grinding and honing cells, keeping abrasive fines out of the cutting zone.", l: "product-coolant-filtration-systems.html" },
        { art: "monitor", t: "Condition monitoring", d: "Online particle counters, portable cleanliness monitors and moisture sensors that put a number on oil condition.", l: "product-condition-monitoring.html" },
        { art: "kit", t: "Testing & service", d: "Field test kits and on-site cleaning and dehydration service, with cleanliness readings before and after.", l: "services.html" },
      ].map((c, i) => `
        <article class="card" data-reveal data-delay="${(i % 3) + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["bolt","snow","filter","droplet","gauge","flask"][i]]}</div>
          <h3>${c.t}</h3>
          <p>${c.d}</p>
          <div class="card__foot">
            <span class="card__tag">${["ELC", "LVDH", "FRF", "CFS", "OPCOM", "Patch"][i]}</span>
            <a class="link-arrow" href="${c.l}">Explore ${icons.arrow}</a>
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

<!-- numbers -->
<section class="section section--paper">
  <div class="wrap">
    <div class="stats" data-reveal>
      <div class="stat"><div class="stat__v" data-count="1980" data-plain>1980</div><div class="stat__l">Year established in Pune</div></div>
      <div class="stat"><div class="stat__v"><span data-count="1">1</span><sup>µ</sup></div><div class="stat__l">Filtration fineness, and below</div></div>
      <div class="stat"><div class="stat__v"><span data-count="10">10</span><sup>ppm</sup></div><div class="stat__l">Final water content achieved</div></div>
      <div class="stat"><div class="stat__v"><span data-count="6000">6000</span><sup>LPH</sup></div><div class="stat__l">Maximum treatment capacity</div></div>
      <div class="stat"><div class="stat__v"><span data-count="${MODEL_COUNT}">${MODEL_COUNT}</span></div><div class="stat__l">Documented model configurations</div></div>
    </div>
  </div>
</section>

<!-- in service band -->
<section class="band">
  <div class="band__bg">
    <img src="assets/img/install-2.jpg" alt="Ferrocare ELC unit installed on a plant floor" loading="lazy" decoding="async">
  </div>
  <div class="wrap">
    <div style="max-width:640px" data-reveal>
      <span class="eyebrow">In service</span>
      <h2 class="mt-4">Over 1,000 units keeping Indian industry running</h2>
      <p class="lead mt-5">
        Steel mills, power stations, automotive lines, plastics plants and defence
        establishments. The machines are installed on the shop floor and left to work —
        cleaning oil continuously while the plant keeps producing.
      </p>
      <div class="btn-row mt-7">
        <a class="btn btn--primary btn--lg" href="industries.html">Where they run ${icons.arrow}</a>
        <a class="btn btn--outline-light btn--lg" href="about.html">About Ferrocare</a>
      </div>
    </div>
  </div>
</section>

<!-- featured: electrostatic -->
<section class="section">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">The original machine</span>
      <h2 class="mt-4">Electrostatic cleaning removes what filters cannot see</h2>
      <p class="lead mt-5">
        A pleated collector sits between two charged electrode sets. Every suspended
        particle — metal, paper, wood, plastic, rubber — migrates to an electrode and
        is held there. Sludge and varnish, which mechanical filters do not register as
        particles at all, are captured too.
      </p>
      <ul class="checks mt-6">
        ${[
          "Collection to 1 micron and below — theoretically to 0.01 µ",
          "Removes sludge and varnish that load up fine filters",
          "No chemical reaction: the additive package is untouched",
          "Extends both oil life and the life of the machine's own filters",
          "Protects servo valves, pumps and sliding mechanisms",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
      <div class="btn-row mt-7">
        <a class="btn btn--primary" href="product-electrostatic-liquid-cleaners.html">Electrostatic range ${icons.arrow}</a>
        <a class="btn btn--ghost" href="services.html">On-site cleaning service</a>
      </div>
    </div>
    <div data-reveal data-delay="2">
      ${shot("elc-machine-2.jpg", "Ferrocare electrostatic liquid cleaner in a plant")}
    </div>
  </div>
</section>

<!-- featured: dehydration -->
<section class="section section--dark">
  <div class="wrap split split--reverse">
    <div data-reveal data-delay="2">
      ${shot("lvdh-machine.jpg", "Ferrocare LVDH low vacuum dehydration machine")}
    </div>
    <div data-reveal>
      <span class="eyebrow">Water is the expensive one</span>
      <h2 class="mt-4">Vacuum dehydration returns oil to specification</h2>
      <p class="lead mt-5">
        At reduced pressure, water boils off at a temperature the oil tolerates
        easily. Free water, emulsified moisture and dissolved moisture all come out —
        along with entrained gas, on the degassification models. Several thousand
        litres of turbine or hydraulic oil stay in service instead of being replaced.
      </p>
      <ul class="checks mt-6">
        ${[
          "100 % of free water plus emulsified moisture removed",
          "Final water content of 10–20 ppm depending on model",
          "Handles up to 20,000 ppm water and 320 cSt viscosity",
          "Vacuum to 1 mbar with refrigerated condensers",
          "Heater loads from 6 kW to 24 kW, skid or trolley mounted",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
      <div class="btn-row mt-7">
        <a class="btn btn--light" href="product-low-vacuum-dehydration.html">LVDH range ${icons.arrow}</a>
        <a class="btn btn--outline-light" href="contact.html">Size a unit</a>
      </div>
    </div>
  </div>
</section>

<!-- full range -->
<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Product families",
      title: "Everything Ferrocare manufactures",
      lead: `${families.length} families covering oil purification, mechanical filtration, process fluids, condition monitoring and consumables. Each family page carries the model designations and published specifications.`,
    })}
    <div class="grid grid--products mt-8">
      ${families.slice(0, 6).map((f) => productCard(f)).join("")}
    </div>
    <div class="center mt-8" data-reveal>
      <a class="btn btn--ghost btn--lg" href="products.html">See all ${families.length} families ${icons.arrow}</a>
    </div>
  </div>
</section>

<!-- why ferrocare -->
<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Why Ferrocare",
      title: "Machines built around the fluid, not the catalogue",
      center: true,
    })}
    <div class="grid grid--4 mt-8">
      ${differentiators.map((d, i) => `
        <article class="card" data-reveal data-delay="${i + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["bolt","snow","layers","chart"][i]]}</div>
          <h3 style="font-size:1.15rem">${d.title}</h3>
          <p>${d.body}</p>
        </article>`).join("")}
    </div>
  </div>
</section>

<!-- evidence: what contamination does -->
<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "The case for clean oil",
      title: "What contamination actually does to a machine",
      lead: "These are Ferrocare's own service photographs. Sludge and varnish coat valve spools until they stick. Fine particles bridge bearing clearances and fatigue the surface. None of it is visible until the machine stops.",
    })}
    <div class="evidence mt-8" data-reveal>
      ${[
        { img: "magnetic-element.jpg",   t: "Ferrous wear, magnetically captured", d: "The magnetic element from a gearbox filtration unit after one service interval. Every one of those particles was circulating through the bearings." },
        { img: "varnish.jpg",            t: "Varnish on a metal surface",          d: "The iridescent film is oxidised oil deposit. Mechanical filters do not register it as a particle — electrostatic collection removes it." },
        { img: "spalling.jpg",           t: "Surface fatigue and spalling",        d: "Where a rolling contact has failed. The damage begins as sub-micron particle bridging long before the surface breaks up." },
        { img: "oil-samples.jpg",        t: "Three oils, three verdicts",          d: "Sample bottles from a condition assessment. Patch testing and particle counting decide whether each one is cleaned, reclaimed or replaced." },
      ].map((e, i) => `
        <figure data-reveal data-delay="${i + 1}">
          <div class="shot"><img src="assets/img/${asset(e.img)}" alt="${e.t}" loading="lazy" decoding="async"></div>
          <figcaption><strong>${e.t}</strong><span>${e.d}</span></figcaption>
        </figure>`).join("")}
    </div>
  </div>
</section>

<!-- installation gallery -->
<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Installations",
      title: "On the shop floor, where they belong",
      lead: "Ferrocare units are working installations, not laboratory equipment. Trolley-mounted machines move between reservoirs; skid units stay plumbed into the system they serve.",
    })}
    <div class="mt-8" data-reveal>
      ${gallery([
        { img: "install-2", caption: "ELC unit in service beside a rolling mill stand" },
        { img: "install-5", caption: "Installation and commissioning work on site" },
        { img: "install-6", caption: "Unit positioned at a machine tool reservoir" },
        { img: "install-4", caption: "Permanent installation in a power plant" },
        { img: "install-3", caption: "Close-coupled unit at a transformer lube system" },
        { img: "install-7", caption: "Mobile unit connected to a press hydraulic system" },
      ])}
    </div>
  </div>
</section>

<!-- industries -->
<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Where it goes",
      title: "Industries that run on clean oil",
      lead: "Steel mills, power stations, automotive lines, machine shops, cement plants and ports. Different fluids, different contamination, same requirement: the oil has to be in specification.",
    })}
    <div class="grid grid--3 mt-8">
      ${industries.map((ind, i) => `
        <article class="card" data-reveal data-delay="${(i % 3) + 1}">
          <div class="card__ico">${icons[["factory","bolt","gear","wrench","layers","globe","layers","shield"][i]] || icons.layers}</div>
          <h3 style="font-size:1.15rem">${ind.name}</h3>
          <p>${ind.body}</p>
          <div class="pcard__specs">
            ${ind.needs.map((n) => `<span class="chip chip--teal">${n}</span>`).join("")}
          </div>
        </article>`).join("")}
    </div>
    <div class="center mt-8" data-reveal>
      <a class="btn btn--ghost" href="industries.html">Industry detail ${icons.arrow}</a>
    </div>
  </div>
</section>

<!-- process -->
<section class="section section--paper">
  <div class="wrap">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow">How we work</span>
        <h2 class="mt-4">From a sample of your oil to a machine on your floor</h2>
        <p class="lead mt-5">
          Every Ferrocare machine starts with the fluid and the duty point. Nothing is
          quoted from a table alone.
        </p>
        <div class="btn-row mt-7">
          <a class="btn btn--primary" href="contact.html">Start with a sample ${icons.arrow}</a>
        </div>
      </div>
      <div class="steps" data-reveal data-delay="2">
        ${[
          ["Tell us the fluid", "Oil type, viscosity grade, reservoir volume, flow rate, operating temperature and the fluid's chemistry — mineral, synthetic, water-glycol or FRF."],
          ["Tell us the contamination", "Water ingress, metallic wear, sludge and varnish build-up, or a cleanliness code that has drifted out of specification."],
          ["We size the machine", "Electrostatic, dehydration, mechanical or a combination. Flow rate, heater load, vacuum level, filtration staging and mounting format."],
          ["Measure the result", "Particle counts and moisture readings before and after. Cleanliness codes are how a filtration programme is justified."],
        ].map(([t, d]) => `<div class="step"><div class="step__num"></div><div><h3>${t}</h3><p>${d}</p></div></div>`).join("")}
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: "Ferrocare Machines Pvt. Ltd. — Oil Filtration, Electrostatic Cleaning & Dehydration | Pune",
    description:
      "Ferrocare Machines Private Limited, Pune — manufacturer and exporter of electrostatic liquid cleaners, low vacuum dehydration machines, hydraulic oil filtration systems, coolant filtration and condition monitoring instruments since 1980.",
    current: "index.html",
    canonical: canon("index.html"),
    body,
  });
};

/* ============================== PRODUCTS ================================= */
const products = () => {
  const body = `
${pageHead({
  eyebrow: "Full catalogue",
  title: `${families.length} product families, ${MODEL_COUNT} documented models`,
  lead: "Every machine Ferrocare manufactures, with the model designations and published specifications. Filter by discipline, or search by model number.",
  crumbs: [{ label: "Products" }],
})}

<div class="filterbar">
  <div class="wrap filterbar__row">
    <div class="filters" role="group" aria-label="Filter products">
      <button class="filter is-active" data-filter="all">All families</button>
      <button class="filter" data-filter="oil">Oil purification</button>
      <button class="filter" data-filter="filtration">Mechanical filtration</button>
      <button class="filter" data-filter="coolant">Process fluids</button>
      <button class="filter" data-filter="monitoring">Monitoring</button>
      <button class="filter" data-filter="consumable">Consumables</button>
    </div>
    <div class="search">
      ${icons.search}
      <input type="search" id="productSearch" placeholder="Search models, e.g. ELC 100, LVDH" aria-label="Search products">
    </div>
  </div>
</div>

<section class="section section--tight">
  <div class="wrap">
    <p class="result-count mb-6" id="resultCount">Showing ${families.length} families · ${families.reduce((a, f) => a + f.models.length, 0)} models</p>
    <div class="grid grid--products" id="productGrid" data-total-models="${families.reduce((a, f) => a + f.models.length, 0)}">
      ${families.map((f) => `
        <div class="pcard-wrap" data-family="${f.group}" data-search="${(f.name + " " + f.series + " " + f.models.map((m) => m.name + " " + Object.values(m.specs).join(" ")).join(" ")).toLowerCase().replace(/"/g, "")}">
          ${productCard(f)}
        </div>`).join("")}
    </div>
    <p class="center muted mt-8 is-hidden" id="noResults">No families match that search. Try a model number such as <span class="mono">ELC 100</span>, <span class="mono">LVDH 600</span> or <span class="mono">OPCOM</span>.</p>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "By discipline",
      title: "Which family solves which problem",
      lead: "Contamination type decides the machine. This is the short version of how the range divides up.",
    })}
    <div class="mt-8">
      <table class="spec-table" data-reveal>
        <caption>Application guide</caption>
        <thead><tr><th style="width:26%">Problem</th><th style="width:32%">Family</th><th>What it does</th></tr></thead>
        <tbody>
          ${[
            ["Fine solid particles below filter rating", "Electrostatic Liquid Cleaners (ELC)", "Charged electrodes collect suspended particles to 1 micron and below."],
            ["Sludge and varnish build-up", "Electrostatic Liquid Cleaners (ELC)", "Sludge and varnish are collected on the pleated media — mechanical filters pass them."],
            ["Free and emulsified water", "Low Vacuum Dehydration (LVDH)", "Vacuum and heat flash moisture off, down to 10–20 ppm final water."],
            ["Dissolved gas in turbine or EH oil", "Low Vacuum Dehydration — degassification models", "LVDH 900 and larger remove entrained gas along with moisture."],
            ["Bulk solid contamination in a reservoir", "Hydraulic & Lube Oil Filtration Machines", "Magnetic pre-straining plus multi-stage cartridge filtration, offline."],
            ["Gearbox sump carbon deposits", "Gear Box Oil Filtration Systems", "Direct-coupled unit lifts carbon out of the sump while running."],
            ["Water-glycol or FRF hydraulic fluid", "Oil Filtration Plants & Units", "Purpose-built units at 75 LPM / 16 bar for high-water-content fluid."],
            ["Abrasive fines in grinding coolant", "Coolant Filtration Systems", "400 LPM central filtration protecting surface finish."],
            ["Unknown oil condition", "Condition Monitoring Instruments", "Particle counters, cleanliness monitors and moisture sensors."],
            ["Routine field assessment", "Oil Testing Kits", "Patch tests and chemical kits for water, particles, TAN and acidity."],
          ].map(([a, b, c]) => `<tr><td style="font-weight:500;color:var(--ink-900)">${a}</td><td class="accent-text">${b}</td><td class="muted">${c}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Quotation",
  title: "Not sure which family fits?",
  body: "Send the fluid type, reservoir volume and the contamination you are seeing. We will tell you which machine — or which combination — actually addresses it.",
})}
`;
  return page({
    title: "Products — Oil Filtration, Electrostatic Cleaners, Dehydration & Monitoring | Ferrocare",
    description:
      "The complete Ferrocare product range: electrostatic liquid cleaners (ELC), low vacuum dehydration machines (LVDH), hydraulic and lube oil filtration, gearbox systems, coolant filtration, oil filtration plants, particle counters, moisture sensors and oil testing kits.",
    current: "products.html",
    canonical: canon("products.html"),
    body,
  });
};

/* =========================== PRODUCT DETAIL ============================== */
const productDetail = (f, idx) => {
  const prev = families[(idx - 1 + families.length) % families.length];
  const next = families[(idx + 1) % families.length];

  const body = `
${pageHead({
  eyebrow: `${f.series} · ${GROUP_LABEL[f.group]}`,
  title: f.name,
  lead: f.summary,
  crumbs: [{ label: "Products", href: "products.html" }, { label: f.short }],
})}

<section class="section">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">At a glance</span>
      <h2 class="mt-4" style="font-size:var(--t-h3)">${f.tagline}</h2>
      <ul class="checks mt-6">
        ${f.highlights.map((h) => `<li>${icons.check}<span>${h}</span></li>`).join("")}
      </ul>
      ${f.limits ? `
        <div class="note mt-6">
          ${icons.shield}
          <div>
            <strong>Operating limits.</strong> ${f.limits.join(" · ")}
          </div>
        </div>` : ""}
      <div class="btn-row mt-7">
        <a class="btn btn--primary" href="contact.html?product=${encodeURIComponent(f.name)}">Request a quotation ${icons.arrow}</a>
        <a class="btn btn--ghost" href="services.html">Related services</a>
      </div>
    </div>
    <div data-reveal data-delay="2">
      ${f.img
        ? `<div class="shot">${`<img src="assets/img/${asset(f.img)}" alt="${f.name} — Ferrocare ${f.series}" loading="lazy" decoding="async">`}</div>`
        : `<div class="split__media">${artFor(f.art)}</div>`}
    </div>
  </div>
</section>

${f.gallery ? `
<section class="section section--tight">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Gallery", title: `${f.short} in detail`, lead: "Photographs of the equipment, its internal assemblies and installations in service." })}
    <div class="mt-8" data-reveal>
      ${gallery(f.gallery)}
    </div>
  </div>
</section>` : ""}

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Technology", title: "How it works" })}
    <div class="split mt-8">
      <div data-reveal>
        <p class="lead">${f.technology}</p>
      </div>
      <div data-reveal data-delay="2">
        <div class="card" style="padding:var(--s-6)">
          <h4 style="font-family:var(--font-mono);font-size:var(--t-micro);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-subtle);font-weight:500">Family summary</h4>
          <table class="spec-table mt-4">
            <tbody>
              <tr><th>Series</th><td>${f.series}</td></tr>
              <tr><th>Discipline</th><td>${GROUP_LABEL[f.group]}</td></tr>
              <tr><th>Models available</th><td>${f.models.length}</td></tr>
              <tr><th>Origin</th><td>Made in India — Pune, Maharashtra</td></tr>
              <tr><th>Business type</th><td>${legal.nature}</td></tr>
              <tr><th>Customisation</th><td>Engineered per application</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Models & specifications",
      title: `${f.models.length} configuration${f.models.length > 1 ? "s" : ""} in the ${f.series} range`,
      lead: "Figures below are the published specifications for each model. Where a duty falls outside these, the unit is engineered to the application rather than selected from the range.",
    })}
    <div class="grid grid--2 mt-8">
      ${f.models.map((m, i) => `
        <article class="card" data-reveal data-delay="${(i % 2) + 1}">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-4)">
            <h3 style="font-size:1.15rem">${m.name}</h3>
            <span class="chip chip--copper">${String(i + 1).padStart(2, "0")}</span>
          </div>
          <p class="mt-4">${m.note}</p>
          <table class="spec-table mt-5">
            <tbody>
              ${Object.entries(m.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
            </tbody>
          </table>
          <div class="card__foot">
            <span class="card__tag">${f.series}</span>
            <a class="link-arrow" href="contact.html?product=${encodeURIComponent(m.name)}">Enquire ${icons.arrow}</a>
          </div>
        </article>`).join("")}
    </div>
    ${f.selectionGuide ? `
    <div class="mt-9" data-reveal>
      <div class="section-head mb-6" style="max-width:none">
        <span class="eyebrow">Sizing</span>
        <h3 class="mt-4" style="font-size:var(--t-h3)">${f.selectionGuide.caption}</h3>
        <p class="lead mt-4">
          The same machine maintains far less oil as viscosity rises, because a heavier
          fluid is harder to move through the collector. Sizing off the wrong column is
          the most common specification error in this category — so here is the whole
          table.
        </p>
      </div>
      <div class="table-scroll">
        <table class="spec-table spec-table--grid">
          <thead>
            <tr>${f.selectionGuide.columns.map((c, i) => `<th scope="col" class="${i > 0 && i < 5 ? "num" : ""}">${c}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${f.selectionGuide.rows.map((r) => `<tr>${r.map((cell, i) => i === 0
              ? `<th scope="row" class="rowhead">${cell}</th>`
              : `<td class="${i > 0 && i < 5 ? "num" : ""}">${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="note mt-6">
        ${icons.shield}
        <div>${f.selectionGuide.note}</div>
      </div>
    </div>` : ""}

    <div class="note note--teal mt-8" data-reveal>
      ${icons.file}
      <div>Specifications are as published in Ferrocare's product literature. Because most units are built to order, confirm the final figures against your duty point at the time of enquiry — flow rate, viscosity, water load and fluid chemistry all influence the delivered configuration.</div>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Where it is used", title: "Applications and industries" })}
    <div class="grid grid--3 mt-8">
      ${industries.slice(0, 6).map((ind, i) => `
        <div class="card" data-reveal data-delay="${(i % 3) + 1}" style="background:var(--ink-800);border-color:rgba(255,255,255,.09)">
          <h3 style="font-size:1.05rem">${ind.name}</h3>
          <p style="color:var(--ink-300)">${ind.body.split(".")[0]}.</p>
        </div>`).join("")}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="grid grid--2">
      <a class="card" href="product-${prev.slug}.html" data-reveal style="text-decoration:none">
        <span class="card__tag">← Previous family</span>
        <h3 class="mt-4" style="font-size:1.15rem">${prev.name}</h3>
        <p>${prev.tagline}</p>
      </a>
      <a class="card" href="product-${next.slug}.html" data-reveal data-delay="1" style="text-decoration:none;text-align:right">
        <span class="card__tag">Next family →</span>
        <h3 class="mt-4" style="font-size:1.15rem">${next.name}</h3>
        <p>${next.tagline}</p>
      </a>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Enquiry",
  title: `Specify a ${f.short.toLowerCase()} for your application`,
  body: "Give us the fluid, the volume and the contamination. We will come back with the model, the configuration and a quotation.",
})}
`;
  return page({
    title: `${f.name} — ${f.series} | Ferrocare Machines Pvt. Ltd.`,
    description: `${f.summary.slice(0, 155)}`,
    current: "products.html",
    canonical: canon(`product-${f.slug}.html`),
    body,
  });
};

/* =============================== ABOUT ================================== */
const about = () => {
  const body = `
${pageHead({
  eyebrow: "Since 1980",
  title: "Four decades of taking contamination out of oil",
  lead: `Ferrocare Machines Private Limited is a Pune-based manufacturer and exporter of oil purification and filtration equipment. Incorporated in 1980, the company builds electrostatic liquid cleaners, low vacuum dehydration machines, filtration systems, coolant systems and condition monitoring instruments — and exports them from India.`,
  crumbs: [{ label: "Company" }],
})}

<section class="section">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">Who we are</span>
      <h2 class="mt-4">An engineering company that happens to sell machines</h2>
      <p class="lead mt-5">
        Ferrocare was set up in Pune in 1980 to solve a specific industrial problem:
        hydraulic and lubricating oil that degrades long before it needs to. The answer
        the company settled on — electrostatic collection — is still the technology at
        the centre of the product range, and still the reason customers come back.
      </p>
      <p class="lead mt-5">
        Over four decades the range widened to cover the rest of the problem. Water
        needed vacuum dehydration. Bulk solids needed mechanical filtration. Grinding
        cells needed coolant systems. And proving any of it worked needed instruments.
        Today the company builds across all of those disciplines, which means a
        recommendation is made against your oil rather than against a product list.
      </p>
      <p class="lead mt-5">
        Led by <strong>Mr. Ravikiran C.</strong>, the business remains a manufacturer in
        the full sense — design, fabrication, assembly and testing under one roof in
        Kondhwa Budruk, Pune.
      </p>
    </div>
    <div class="split__media" data-reveal data-delay="2">
      ${art.elc}
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    <div class="stats" data-reveal>
      <div class="stat"><div class="stat__v" data-plain>${legal.founded}</div><div class="stat__l">Established in Pune</div></div>
      <div class="stat"><div class="stat__v" data-plain>${legal.employees.split(" ")[0]}</div><div class="stat__l">People</div></div>
      <div class="stat"><div class="stat__v" data-plain>${legal.turnover}</div><div class="stat__l">Annual turnover</div></div>
      <div class="stat"><div class="stat__v" data-plain>${families.length}</div><div class="stat__l">Product families</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Milestones", title: "How the range grew", lead: "Each expansion came from a customer problem that the existing machines could not solve." })}
    <div class="steps mt-8">
      ${milestones.map((m) => `
        <div class="step" data-reveal>
          <div class="mono accent-text" style="padding-top:6px">${m.year}</div>
          <div><h3>${m.title}</h3><p>${m.body}</p></div>
        </div>`).join("")}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Principles", title: "What we hold to" })}
    <div class="grid grid--2 mt-8">
      ${differentiators.map((d, i) => `
        <article class="card" data-reveal data-delay="${i + 1}" style="background:var(--ink-800);border-color:rgba(255,255,255,.09)">
          <div class="card__ico" style="background:rgba(217,123,52,.14);border-color:rgba(255,255,255,.1);color:var(--copper-300)">${icons[["bolt","snow","layers","chart"][i]]}</div>
          <h3>${d.title}</h3>
          <p style="color:var(--ink-300)">${d.body}</p>
        </article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Company record", title: "Registration & credentials", lead: "Ferrocare is a limited company registered in Maharashtra, India, and holds manufacturer-exporter status." })}
    <div class="grid grid--2 mt-8">
      <div class="card" data-reveal>
        <h3 style="font-size:1.1rem">Statutory details</h3>
        <table class="spec-table mt-4">
          <tbody>
            <tr><th>Legal name</th><td>${company.name}</td></tr>
            <tr><th>CIN</th><td class="mono">${legal.cin}</td></tr>
            <tr><th>GST number</th><td class="mono">${legal.gst}</td></tr>
            <tr><th>Import Export Code</th><td class="mono">${legal.iec}</td></tr>
            <tr><th>Nature of business</th><td>${legal.nature}</td></tr>
            <tr><th>Legal status</th><td>Limited company</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card" data-reveal data-delay="2">
        <h3 style="font-size:1.1rem">Operating profile</h3>
        <table class="spec-table mt-4">
          <tbody>
            <tr><th>Established</th><td>${legal.founded}</td></tr>
            <tr><th>Employees</th><td>${legal.employees}</td></tr>
            <tr><th>Annual turnover</th><td>${legal.turnover}</td></tr>
            <tr><th>Location</th><td>${contact.addressShort}</td></tr>
            <tr><th>Google rating</th><td>${contact.rating.score} / 5 from ${contact.rating.count} reviews</td></tr>
            <tr><th>Markets</th><td>India and export</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="note mt-8" data-reveal>
      ${icons.shield}
      <div>Company registration details are reproduced from public business listings and Ferrocare's own published profile. Where you need verified documentary proof for procurement, request the certificates directly at the time of enquiry.</div>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Visit us",
  title: "Come and see the machines being built",
  body: "The works and corporate office are in Kondhwa Budruk, Pune. Factory acceptance testing and pre-dispatch inspection visits are welcome by appointment.",
  primary: { href: "contact.html", label: "Arrange a visit" },
  secondary: { href: "products.html", label: "See the range" },
})}
`;
  return page({
    title: "Company — About Ferrocare Machines Pvt. Ltd., Pune | Established 1980",
    description:
      "Ferrocare Machines Private Limited — incorporated in Pune in 1980, manufacturer and exporter of electrostatic liquid cleaners, low vacuum dehydration machines, oil filtration systems and condition monitoring instruments.",
    current: "about.html",
    canonical: canon("about.html"),
    body,
  });
};

/* ============================== SERVICES ================================ */
const servicesPage = () => {
  const body = `
${pageHead({
  eyebrow: "Services",
  title: "Machines, measurement and the work in between",
  lead: "Ferrocare does not only sell equipment. On-site oil cleaning and dehydration, oil analysis, custom engineering, retrofits and annual maintenance are all part of how a filtration programme actually gets run.",
  crumbs: [{ label: "Services" }],
})}

<section class="section">
  <div class="wrap">
    <div class="grid grid--3">
      ${services.map((s, i) => `
        <article class="card" data-reveal data-delay="${(i % 3) + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["droplet","gauge","layers","wrench","shield","filter"][i]]}</div>
          <span class="card__tag">${s.tag}</span>
          <h3 class="mt-4">${s.title}</h3>
          <p>${s.body}</p>
          <ul class="checks mt-5">
            ${s.points.map((p) => `<li>${icons.check}<span>${p}</span></li>`).join("")}
          </ul>
          <div class="card__foot">
            <span class="card__tag">Service</span>
            <a class="link-arrow" href="contact.html?service=${encodeURIComponent(s.title)}">Enquire ${icons.arrow}</a>
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap split">
    <div data-reveal>
      <span class="eyebrow">On-site service</span>
      <h2 class="mt-4">We bring the machine to your reservoir</h2>
      <p class="lead mt-5">
        Not every plant needs to own a purifier. For commissioning, post-repair
        clean-up, shutdown windows or a one-off contamination event, Ferrocare sends
        the equipment and the engineers to site — and leaves you with the readings.
      </p>
      <ul class="checks mt-6">
        ${[
          "Pre-service sample: particle count, moisture, cleanliness code",
          "Electrostatic cleaning to 1 micron and below where specified",
          "Vacuum dehydration to 10–20 ppm final water where specified",
          "Post-service readings documented against the starting condition",
          "Works around your shutdown window, including night and weekend shifts",
          "Recommendation on whether the oil can stay in service",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
      <div class="btn-row mt-7">
        <a class="btn btn--primary" href="contact.html">Book a service visit ${icons.arrow}</a>
      </div>
    </div>
    <div class="split__media" data-reveal data-delay="2">
      ${art.lvdh}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Why measure",
      title: "A filtration programme without readings is just a habit",
      lead: "Cleanliness codes turn oil management from a schedule into a decision. Ferrocare supplies the instruments — and uses them.",
      center: true,
    })}
    <div class="grid grid--4 mt-8">
      ${[
        { i: "gauge", t: "ISO 4406 codes", d: "Particle counts reported as the standard cleanliness code, so results are comparable across machines and over time." },
        { i: "droplet", t: "Water content", d: "Inline moisture sensing and sampling that show whether dehydration is due or overdue." },
        { i: "flask", t: "Patch testing", d: "A membrane test read against a chart — fast, cheap, and good enough to trigger a decision." },
        { i: "chart", t: "Trend, not snapshot", d: "Repeated readings show whether contamination is being generated faster than it is being removed." },
      ].map((c, i) => `
        <article class="card" data-reveal data-delay="${i + 1}">
          <div class="card__ico">${icons[c.i]}</div>
          <h3 style="font-size:1.1rem">${c.t}</h3>
          <p>${c.d}</p>
        </article>`).join("")}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Coverage", title: "How a machine is supported after it ships", lead: "Installed equipment is only worth what the support behind it is worth." })}
    <div class="steps mt-8">
      ${[
        ["Commissioning", "Installation, piping, wiring, first fill and a baseline cleanliness reading at handover."],
        ["Operator training", "How the machine works, what the collector media does, when to change elements, and what the readings mean."],
        ["Consumables supply", "Genuine collector paper and filter elements, held available so a programme does not stall waiting for a part."],
        ["Preventive maintenance", "Scheduled visits to verify performance against the original specification and catch wear early."],
        ["Breakdown support", "Priority response on installed Ferrocare equipment, with spares and service engineers."],
      ].map(([t, d]) => `
        <div class="step" data-reveal>
          <div class="step__num"></div>
          <div><h3>${t}</h3><p>${d}</p></div>
        </div>`).join("")}
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Services",
  title: "Tell us the problem, not the part number.",
  body: "Describe what the oil is doing — water, particles, varnish, temperature, oil life. We will work back to the service or the machine that fixes it.",
  primary: { href: "contact.html", label: "Discuss a requirement" },
  secondary: { href: "faq.html", label: "Read the FAQ" },
})}
`;
  return page({
    title: "Services — On-site Oil Cleaning, Oil Analysis & AMC | Ferrocare Machines",
    description:
      "Ferrocare services: on-site oil cleaning and dehydration, oil analysis and condition assessment, custom engineered systems, retrofits and system integration, consumables, spares and annual maintenance contracts.",
    current: "services.html",
    canonical: canon("services.html"),
    body,
  });
};

/* ============================= INDUSTRIES =============================== */
const industriesPage = () => {
  const body = `
${pageHead({
  eyebrow: "Industries",
  title: "Different plants, different fluids, same requirement",
  lead: "Steel mills run water-glycol and FRF. Power stations run turbine lube and EH control oil. Machine shops run coolant. The contamination differs, the consequence does not: oil out of specification costs precision, components and uptime.",
  crumbs: [{ label: "Industries" }],
})}

<section class="section">
  <div class="wrap">
    <div class="grid grid--2">
      ${industries.map((ind, i) => `
        <article class="card" data-reveal data-delay="${(i % 2) + 1}">
          <div class="card__ico ${i % 2 ? "card__ico--teal" : ""}">${icons[["factory","bolt","gear","wrench","layers","globe","layers","shield"][i]] || icons.layers}</div>
          <h3>${ind.name}</h3>
          <p>${ind.body}</p>
          <div class="pcard__specs mt-5">
            ${ind.needs.map((n) => `<span class="chip chip--teal">${n}</span>`).join("")}
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Cross-reference",
      title: "Industry to equipment",
      lead: "Which families typically get specified for which sector.",
    })}
    <div class="mt-8">
      <table class="spec-table" data-reveal>
        <caption>Typical specification by industry</caption>
        <thead><tr><th style="width:24%">Industry</th><th style="width:30%">Fluids</th><th>Ferrocare equipment typically specified</th></tr></thead>
        <tbody>
          ${[
            ["Steel & rolling mills", "Hydraulic oil, gear oil, FRF, water-glycol", "FRF multistage filtration, gearbox oil filtration, water-glycol units, ELC cleaners"],
            ["Power generation", "Turbine lube oil, EH control oil", "LVDH degassification units, EH oil filtration, moisture sensors"],
            ["Automotive & auto components", "Hydraulic oil, coolant, lube oil", "ELC electrostatic cleaners, injection moulding filtration, coolant filtration"],
            ["Machine tools & grinding", "Coolant, hydraulic oil, way lube", "Coolant filtration systems, portable filtration machines, patch test kits"],
            ["Cement & heavy engineering", "Gear oil, hydraulic oil", "Gearbox oil filtration, gear oil units, solid removal machines"],
            ["Ports, shipping & marine", "Hydraulic oil, gear oil, fuel", "Portable cleanliness monitors, on-site cleaning service, gearbox filtration"],
            ["Plastic injection moulding", "Hydraulic oil", "Injection moulding filtration systems, ELC cleaners, oil testing kits"],
            ["General manufacturing", "Hydraulic, lube, gear, turbine", "Full ELC and LVDH range, trolley filtration units, condition monitoring"],
          ].map(([a, b, c]) => `<tr><td style="font-weight:500;color:var(--ink-900)">${a}</td><td class="muted">${b}</td><td class="accent-text">${c}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap split split--reverse">
    <div class="split__media" data-reveal data-delay="2" style="background:linear-gradient(155deg,#131c2b,#0d1420);border-color:rgba(255,255,255,.08)">
      ${art.monitor}
    </div>
    <div data-reveal>
      <span class="eyebrow">The economics</span>
      <h2 class="mt-4">Oil is cheaper to clean than to replace</h2>
      <p class="lead mt-5">
        A central hydraulic system or a turbine lube reservoir holds thousands of
        litres. Replacing it costs the oil, the disposal, the downtime and the
        flushing — and the new oil starts degrading the moment it is filled.
        Cleaning it costs a machine and an operator's attention.
      </p>
      <ul class="checks mt-6">
        ${[
          "Oil stays in service instead of being written off",
          "Fine machine filters last measurably longer",
          "Servo valves, pumps and sliding surfaces stay within tolerance",
          "Unplanned stoppages from contamination drop",
          "Disposal volume and its cost fall with it",
        ].map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("")}
      </ul>
      <div class="btn-row mt-7">
        <a class="btn btn--light" href="contact.html">Talk through your case ${icons.arrow}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Fit",
  title: "Which of these is your plant?",
  body: "Tell us the sector and the fluid. We will tell you what is normally specified for it — and whether your duty point sits inside or outside the standard range.",
})}
`;
  return page({
    title: "Industries Served — Steel, Power, Automotive, Machine Tools | Ferrocare Machines",
    description:
      "Ferrocare equipment is specified across steel and rolling mills, power generation, automotive and auto components, machine tools and grinding, cement and heavy engineering, ports and shipping, and plastic injection moulding.",
    current: "industries.html",
    canonical: canon("industries.html"),
    body,
  });
};

/* ================================= FAQ ================================== */
const faqPage = () => {
  const body = `
${pageHead({
  eyebrow: "Questions",
  title: "The things engineers ask us first",
  lead: "Electrostatic cleaning, dehydration, filtration sizing and oil testing — the questions that come up before a machine is specified.",
  crumbs: [{ label: "FAQ" }],
})}

<section class="section">
  <div class="wrap wrap--narrow">
    <div class="acc" id="faqAcc">
      ${faqs.map((f, i) => `
        <div class="acc__item" data-reveal>
          <button class="acc__btn" aria-expanded="false" aria-controls="faqp${i}">
            <span>${f.q}</span>
            <span class="acc__ico">${icons.plus}</span>
          </button>
          <div class="acc__panel" id="faqp${i}" role="region">
            <div>${f.a}</div>
          </div>
        </div>`).join("")}
    </div>
    <div class="note mt-8" data-reveal>
      ${icons.phone}
      <div>Still unanswered? Call <a href="tel:${contact.phoneHref}" style="text-decoration:underline">${contact.phoneDisplay}</a> or email <a href="mailto:${contact.email}" style="text-decoration:underline">${contact.email}</a>. Office hours are 8:30 am to 6:30 pm Monday to Friday, and 8:30 am to 2:00 pm Saturday.</div>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Enquiry",
  title: "Ask us something specific.",
  body: "Model numbers, sizing, compatibility with a particular fluid, lead times, export documentation — send it across and we will answer it directly.",
})}
`;
  return page({
    title: "FAQ — Electrostatic Cleaning, Dehydration & Filtration Questions | Ferrocare",
    description:
      "Answers to common questions about electrostatic oil cleaning, low vacuum dehydration, oil filtration sizing, additive safety, on-site oil cleaning service and oil testing.",
    current: "faq.html",
    canonical: canon("faq.html"),
    body,
  });
};

/* =============================== CONTACT ================================ */
const contactPage = () => {
  const body = `
${pageHead({
  eyebrow: "Contact",
  title: "Let's size a machine against your oil",
  lead: "Send us the fluid type, reservoir volume, flow rate and the contamination you are seeing. Our engineers will come back with the right model, the configuration and a quotation.",
  crumbs: [{ label: "Contact" }],
})}

<section class="section">
  <div class="wrap contact-grid">
    <div data-reveal>
      <span class="eyebrow">Corporate office &amp; works</span>
      <h2 class="mt-4" style="font-size:var(--t-h3)">Ferrocare Machines Private Limited</h2>
      <div class="info-list mt-7">
        <div class="info-item">
          <div class="info-item__ico">${icons.pin}</div>
          <div>
            <h4>Address</h4>
            <p>${contact.addressLines.join("<br>")}</p>
            <p class="mt-4"><a href="https://www.google.com/maps/search/?api=1&query=${contact.mapQuery}" target="_blank" rel="noopener">Open in Google Maps ${icons.arrowUpRight}</a></p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.phone}</div>
          <div>
            <h4>Telephone</h4>
            <p><a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></p>
            <p class="muted">Landline ${contact.landlineDisplay}</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.mail}</div>
          <div>
            <h4>Email</h4>
            <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            <p><a href="mailto:${contact.emailAlt}">${contact.emailAlt}</a></p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.clock}</div>
          <div>
            <h4>Office hours</h4>
            <table class="spec-table">
              <tbody>
                ${contact.hours.map(([d, h]) => `<tr><th style="width:auto;padding-right:var(--s-5)">${d}</th><td>${h}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__ico">${icons.shield}</div>
          <div>
            <h4>Registration</h4>
            <p class="mono">CIN ${legal.cin}</p>
            <p class="mono">GST ${legal.gst}</p>
            <p class="mono">IEC ${legal.iec}</p>
          </div>
        </div>
      </div>

      <div class="note mt-7">
        ${icons.clock}
        <div>For breakdown support on installed Ferrocare equipment, call the number above and state the machine model and serial number. Priority response applies to equipment under an annual maintenance contract.</div>
      </div>
    </div>

    <div data-reveal data-delay="2">
      <form class="form" id="enquiryForm" novalidate>
        <h3 style="font-size:var(--t-h4)">Enquiry form</h3>
        <p class="muted mt-3" style="font-size:var(--t-sm)">Fields marked <span class="accent-text">*</span> are required. The more detail you give about the fluid and the duty, the more precise the recommendation.</p>

        <div class="field-row mt-6">
          <div class="field">
            <label for="f-name">Name <span class="req">*</span></label>
            <input id="f-name" name="name" type="text" required autocomplete="name" placeholder="Your full name">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-company">Company <span class="req">*</span></label>
            <input id="f-company" name="company" type="text" required autocomplete="organization" placeholder="Organisation">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-email">Email <span class="req">*</span></label>
            <input id="f-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-phone">Phone</label>
            <input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-city">Location</label>
            <input id="f-city" name="city" type="text" placeholder="City, country">
          </div>
          <div class="field" style="margin-top:0">
            <label for="f-interest">Interest</label>
            <select id="f-interest" name="interest">
              <option value="">Select a family…</option>
              ${families.map((f) => `<option>${f.name}</option>`).join("")}
              <option>On-site oil cleaning service</option>
              <option>Oil analysis &amp; testing</option>
              <option>Consumables &amp; spares</option>
              <option>Annual maintenance contract</option>
              <option>Something else</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="f-fluid">Fluid &amp; duty detail</label>
          <input id="f-fluid" name="fluid" type="text" placeholder="e.g. hydraulic oil ISO VG 46, 3,000 L reservoir, water ingress">
        </div>

        <div class="field">
          <label for="f-msg">Requirement <span class="req">*</span></label>
          <textarea id="f-msg" name="message" required placeholder="Describe the contamination you are seeing, the machine or system involved, and what you need the oil to achieve."></textarea>
        </div>

        <div class="btn-row mt-6">
          <button class="btn btn--primary btn--lg" type="submit">Send enquiry ${icons.arrow}</button>
          <a class="btn btn--ghost btn--lg" href="tel:${contact.phoneHref}">Call instead</a>
        </div>

        <div class="form__success" id="formSuccess" role="status">
          <strong>Thank you — your enquiry has been prepared.</strong><br>
          This is a demonstration form, so nothing has been transmitted. In production this would post to Ferrocare's sales desk. To reach them now, call
          <a href="tel:${contact.phoneHref}" style="text-decoration:underline">${contact.phoneDisplay}</a> or email
          <a href="mailto:${contact.email}" style="text-decoration:underline">${contact.email}</a>.
        </div>

        <p class="form__note">
          Your details are used only to respond to this enquiry. Ferrocare does not sell
          or share contact information.
        </p>
      </form>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead({
      eyebrow: "Finding us",
      title: "Kondhwa Budruk, Pune",
      lead: "The works and corporate office sit in the Danny Mehata Nagar industrial area of Kondhwa Budruk, in south-east Pune — roughly 12 km from Pune city centre and within reach of the Pune–Satara road industrial belt.",
      center: true,
    })}
    <div class="mt-8" data-reveal>
      <a class="split__media" style="display:block;text-decoration:none;min-height:280px"
         href="https://www.google.com/maps/search/?api=1&query=${contact.mapQuery}" target="_blank" rel="noopener">
        <div class="center">
          <div class="card__ico" style="margin-inline:auto">${icons.pin}</div>
          <h3 class="mt-5">${contact.addressShort}</h3>
          <p class="muted mt-4">Open in Google Maps ${icons.arrowUpRight}</p>
        </div>
      </a>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: "Before you write",
  title: "Have these four things ready",
  body: "Fluid type and viscosity grade · reservoir volume in litres · required flow rate or treatment time · the contamination you are seeing (particles, water, varnish, sludge). With those, we can size the machine in one exchange.",
  primary: { href: "products.html", label: "Check the range first" },
  secondary: { href: "faq.html", label: "Read the FAQ" },
})}
`;
  return page({
    title: "Contact — Ferrocare Machines Pvt. Ltd., Kondhwa Budruk, Pune 411048",
    description:
      "Contact Ferrocare Machines Private Limited: S. No. 32/3/8, Yewlewadi Road, Kondhwa Budruk, Pune 411048, Maharashtra. Phone +91 20 4603 3076. Enquire about oil filtration, electrostatic cleaning and dehydration equipment.",
    current: "contact.html",
    canonical: canon("contact.html"),
    body,
  });
};

/* =============================== WRITE ================================== */
const pages = {
  "index.html": home(),
  "products.html": products(),
  "about.html": about(),
  "services.html": servicesPage(),
  "industries.html": industriesPage(),
  "faq.html": faqPage(),
  "contact.html": contactPage(),
};
families.forEach((f, i) => { pages[`product-${f.slug}.html`] = productDetail(f, i); });

mkdirSync(ROOT, { recursive: true });
for (const [name, html] of Object.entries(pages)) {
  writeFileSync(join(ROOT, name), html, "utf8");
  console.log(`  ✓ ${name.padEnd(46)} ${(html.length / 1024).toFixed(1)} KB`);
}
console.log(`\nBuilt ${Object.keys(pages).length} pages.`);
