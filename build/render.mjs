/* ==========================================================================
   Render layer — layout shell, icons and technical illustrations
   ========================================================================== */

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { company } from "./data.mjs";

const IMG_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "img");

/* Resolve an asset to whichever format actually exists on disk. Product shots
   have a transparent WebP cutout; installation photography stays as JPEG. */
export const asset = (name) => {
  if (!name) return "";
  const base = name.replace(/\.[a-z0-9]+$/i, "");     // ignore any extension given
  for (const ext of [".webp", ".jpg", ".png"]) {      // prefer transparent WebP
    if (existsSync(join(IMG_DIR, base + ext))) return base + ext;
  }
  return base + ".jpg";
};

/* ---------------------------------- icons --------------------------------- */
const S = (d, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}${extra}</svg>`;

export const icons = {
  arrow: S(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  arrowUpRight: S(`<path d="M7 17 17 7M8 7h9v9"/>`),
  check: S(`<path d="M20 6 9 17l-5-5"/>`),
  chevron: S(`<path d="m6 9 6 6 6-6"/>`),
  chevronRight: S(`<path d="m9 6 6 6-6 6"/>`),
  plus: S(`<path d="M12 5v14M5 12h14"/>`),
  search: S(`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`),
  phone: S(`<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>`),
  mail: S(`<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>`),
  pin: S(`<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`),
  clock: S(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>`,
  shield: S(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>`),
  droplet: S(`<path d="M12 2.7 6.8 8a7.3 7.3 0 1 0 10.4 0Z"/>`),
  bolt: S(`<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>`),
  gauge: S(`<path d="M12 21a9 9 0 1 0-9-9"/><path d="M12 12 17 7"/><circle cx="12" cy="12" r="1.6"/>`),
  flask: S(`<path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3"/>`),
  layers: S(`<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>`),
  factory: S(`<path d="M2 20h20M4 20V9l5 3V9l5 3V9l5 3v8"/><path d="M8 20v-4h4v4"/>`),
  wrench: S(`<path d="M15.5 6.5a4.5 4.5 0 0 0 5.7 5.7l-8.4 8.4a2.3 2.3 0 0 1-3.3-3.3l8.4-8.4a4.5 4.5 0 0 0-5.7-5.7l2.6 2.6-1.7 1.7Z"/>`),
  snow: S(`<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"/>`),
  filter: S(`<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>`),
  chart: S(`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`),
  gear: S(`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.5-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.6a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 11a2 2 0 1 1 0 4Z"/>`),
  phone2: S(`<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>`),
  users: S(`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>`),
  globe: S(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>`),
  award: S(`<circle cx="12" cy="9" r="6"/><path d="m8.2 14-1.2 8L12 19l5 3-1.2-8"/>`),
  file: S(`<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M9 13h6M9 17h4"/>`),
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.75 2.5 4.75 5.8V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 2.98V21h-4Z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15V9l5.2 3Z"/></svg>`,
};

/* ------------------------- brand mark / logo ------------------------------ */
/* The authentic Ferrocare "FM" mark, extracted from the company's own artwork
   and un-matted onto transparency so it reads on both paper and ink. */
export const logoMark = (size = 40, cls = "logo__img") =>
  `<img class="${cls}" src="assets/img/ferrocare-logo.png" width="${size}" height="${size}" alt="" aria-hidden="true">`;

export const logo = (href = "index.html") => `
<a class="logo" href="${href}" aria-label="${company.name} — home">
  ${logoMark(40)}
  <span class="logo__text">
    <span class="logo__name">Ferrocare</span>
    <span class="logo__sub">Machines Pvt. Ltd.</span>
  </span>
</a>`;

export const footerLogo = () => `
<a class="logo" href="index.html" aria-label="${company.name} — home">
  <span class="logo__plate">${logoMark(44, "")}</span>
  <span class="logo__text">
    <span class="logo__name">Ferrocare</span>
    <span class="logo__sub">Machines Pvt. Ltd.</span>
  </span>
</a>`;

/* --------------------------- technical artwork ---------------------------- */
/* Line-art illustrations used across product cards, page heads and sections. */
const wrap = (inner, vb = "0 0 200 140") =>
  `<svg class="art" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${inner}</svg>`;

const CU = "#c25f1f";   // copper
const TE = "#1f7d8a";   // teal
const IK = "#2a374b";   // ink
const LT = "#b9c1cd";   // light line
const FF = "#ffffff";

export const art = {
  /* Electrostatic liquid cleaner — tank with charged electrode stack */
  elc: wrap(`
    <rect x="30" y="34" width="118" height="72" rx="7" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <rect x="38" y="42" width="102" height="42" rx="4" fill="#fdf3e9"/>
    <g stroke="${CU}" stroke-width="1.5" stroke-linecap="round">
      <path d="M50 44v38M62 44v38M74 44v38M86 44v38"/>
      <path d="M110 44v38M122 44v38M134 44v38"/>
    </g>
    <g stroke="${TE}" stroke-width="1.5" stroke-linecap="round" opacity=".85">
      <path d="M98 44v38"/>
    </g>
    <path d="M92 26h22l-4 8H96Z" fill="#eef8f9" stroke="${TE}" stroke-width="1.4"/>
    <path d="M103 18v8" stroke="${TE}" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="103" cy="15" r="3.2" fill="${TE}" opacity=".2"/>
    <circle cx="103" cy="15" r="1.6" fill="${TE}"/>
    <path d="M30 106h118" stroke="${IK}" stroke-width="1.7" stroke-linecap="round"/>
    <circle cx="46" cy="116" r="6" stroke="${LT}" stroke-width="1.5"/>
    <circle cx="132" cy="116" r="6" stroke="${LT}" stroke-width="1.5"/>
    <path d="M148 60h22v30h-22" stroke="${LT}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M170 70h14" stroke="${LT}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M52 60c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="${CU}" stroke-width="1.4" stroke-linecap="round" opacity=".5" class="flow-dash" fill="none"/>
    <circle cx="88" cy="63" r="2" fill="${CU}"/><circle cx="112" cy="63" r="2" fill="${TE}"/>
  `),

  /* Low vacuum dehydration — vacuum vessel, condenser, heater */
  lvdh: wrap(`
    <rect x="26" y="40" width="66" height="66" rx="8" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <rect x="34" y="52" width="50" height="30" rx="4" fill="#eef8f9"/>
    <path d="M34 68c6-5 11-5 17 0s11 5 17 0 8-3 12 0" stroke="${TE}" stroke-width="1.4" stroke-linecap="round" fill="none" class="flow-dash"/>
    <path d="M40 118h38" stroke="${IK}" stroke-width="1.7" stroke-linecap="round"/>
    <circle cx="46" cy="124" r="5" stroke="${LT}" stroke-width="1.4"/><circle cx="72" cy="124" r="5" stroke="${LT}" stroke-width="1.4"/>
    <path d="M59 40V28h34" stroke="${LT}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <rect x="93" y="20" width="34" height="34" rx="5" stroke="${TE}" stroke-width="1.6" fill="${FF}"/>
    <path d="M100 27v20M110 27v20M120 27v20" stroke="${TE}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
    <path d="M127 54v14h-22" stroke="${LT}" stroke-width="1.5" stroke-linecap="round" fill="none" stroke-dasharray="3 3"/>
    <path d="M110 116c0-6 5-9 5-14 0 5 5 8 5 14a5 5 0 1 1-10 0Z" fill="#fdf3e9" stroke="${CU}" stroke-width="1.4"/>
    <g stroke="${CU}" stroke-width="1.6" stroke-linecap="round"><path d="M145 62h16M145 72h24M145 82h16"/></g>
    <circle cx="59" cy="33" r="3" stroke="${LT}" stroke-width="1.4" fill="${FF}"/>
    <text x="59" y="36.4" font-size="5" fill="${LT}" text-anchor="middle" font-family="monospace">V</text>
  `),

  /* Hydraulic filtration — multi-stage cartridge train with magnetic strainer */
  hydraulic: wrap(`
    <rect x="22" y="92" width="156" height="20" rx="6" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <g stroke="${IK}" stroke-width="1.6">
      <rect x="38" y="42" width="26" height="50" rx="5" fill="${FF}"/>
      <rect x="76" y="34" width="26" height="58" rx="5" fill="${FF}"/>
      <rect x="114" y="42" width="26" height="50" rx="5" fill="${FF}"/>
    </g>
    <g stroke="${CU}" stroke-width="1.2" opacity=".7">
      <path d="M44 52v30M50 52v30M56 52v30"/>
    </g>
    <g stroke="${TE}" stroke-width="1.2" opacity=".7">
      <path d="M82 44v38M88 44v38M94 44v38"/>
    </g>
    <g stroke="${CU}" stroke-width="1.2" opacity=".5">
      <path d="M120 52v30M126 52v30M132 52v30"/>
    </g>
    <rect x="146" y="56" width="30" height="36" rx="5" fill="#fdf3e9" stroke="${CU}" stroke-width="1.5"/>
    <g stroke="${CU}" stroke-width="1.5" stroke-linecap="round"><path d="M152 66h18M152 74h18M152 82h12"/></g>
    <path d="M22 74h16M64 74h12M102 74h12M140 74h6" stroke="${TE}" stroke-width="1.6" stroke-linecap="round" class="flow-dash"/>
    <circle cx="34" cy="112" r="5" stroke="${LT}" stroke-width="1.4"/><circle cx="166" cy="112" r="5" stroke="${LT}" stroke-width="1.4"/>
    <path d="M28 64h-8v10h8" stroke="${LT}" stroke-width="1.4" fill="none"/>
  `),

  /* Skid-mounted plant */
  plant: wrap(`
    <rect x="16" y="96" width="168" height="14" rx="4" fill="#f1ece5" stroke="${IK}" stroke-width="1.7"/>
    <rect x="30" y="52" width="52" height="44" rx="7" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <rect x="38" y="62" width="36" height="24" rx="4" fill="#eef8f9"/>
    <path d="M38 74c5-4 9-4 14 0s9 4 14 0" stroke="${TE}" stroke-width="1.4" fill="none" class="flow-dash"/>
    <rect x="96" y="34" width="34" height="62" rx="7" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <g stroke="${CU}" stroke-width="1.4" stroke-linecap="round"><path d="M104 46v38M112 46v38M120 46v38"/></g>
    <circle cx="113" cy="24" r="6" stroke="${TE}" stroke-width="1.5" fill="${FF}"/>
    <path d="M113 18v-6M107 27l-5 3M119 27l5 3" stroke="${TE}" stroke-width="1.4" stroke-linecap="round"/>
    <rect x="144" y="64" width="34" height="32" rx="6" stroke="${LT}" stroke-width="1.6" fill="${FF}"/>
    <path d="M152 74h18M152 82h18M152 90h10" stroke="${LT}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M82 74h14M130 74h14" stroke="${TE}" stroke-width="1.6" stroke-linecap="round" class="flow-dash"/>
    <path d="M56 96v-4M113 96v-4" stroke="${LT}" stroke-width="1.4"/>
    <path d="M26 110v6M174 110v6" stroke="${LT}" stroke-width="1.6" stroke-linecap="round"/>
  `),

  /* Gearbox filtration */
  gearbox: wrap(`
    <circle cx="66" cy="66" r="30" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <circle cx="66" cy="66" r="11" stroke="${CU}" stroke-width="1.6" fill="#fdf3e9"/>
    <circle cx="66" cy="66" r="3" fill="${CU}"/>
    <g stroke="${IK}" stroke-width="1.5" stroke-linecap="round">
      <path d="M66 30v-7M66 109v-7M30 66h-7M109 66h-7M41 41l-5-5M96 96l-5-5M91 41l5-5M36 96l5-5"/>
    </g>
    <circle cx="126" cy="88" r="20" stroke="${LT}" stroke-width="1.6" fill="${FF}"/>
    <circle cx="126" cy="88" r="6" stroke="${LT}" stroke-width="1.4"/>
    <g stroke="${LT}" stroke-width="1.4" stroke-linecap="round">
      <path d="M126 62v-5M126 119v-5M100 88h-5M157 88h-5"/>
    </g>
    <rect x="138" y="34" width="34" height="44" rx="6" stroke="${TE}" stroke-width="1.6" fill="${FF}"/>
    <g stroke="${TE}" stroke-width="1.2" opacity=".6"><path d="M146 42v28M154 42v28M162 42v28"/></g>
    <path d="M104 52h28M152 78h-18" stroke="${TE}" stroke-width="1.5" stroke-linecap="round" class="flow-dash"/>
    <path d="M30 118h140" stroke="${LT}" stroke-width="1.5" stroke-linecap="round"/>
  `),

  /* Coolant filtration — band filter / drag conveyor */
  coolant: wrap(`
    <path d="M24 46h152l-14 62H38Z" stroke="${IK}" stroke-width="1.7" fill="${FF}" stroke-linejoin="round"/>
    <path d="M36 58h128" stroke="${LT}" stroke-width="1.4"/>
    <path d="M40 100c10-6 20-6 30 0s20 6 30 0 20-6 30 0 14 4 20 2" stroke="${TE}" stroke-width="1.5" fill="none" class="flow-dash"/>
    <rect x="52" y="62" width="96" height="8" rx="3" fill="#fdf3e9" stroke="${CU}" stroke-width="1.3"/>
    <g fill="${CU}" opacity=".5"><circle cx="66" cy="66" r="2"/><circle cx="84" cy="66" r="1.6"/><circle cx="104" cy="66" r="2.2"/><circle cx="126" cy="66" r="1.5"/></g>
    <circle cx="52" cy="66" r="5" stroke="${CU}" stroke-width="1.4" fill="${FF}"/>
    <circle cx="148" cy="66" r="5" stroke="${CU}" stroke-width="1.4" fill="${FF}"/>
    <path d="M24 46v-10h152v10" stroke="${LT}" stroke-width="1.4" fill="none"/>
    <path d="M100 36v-10" stroke="${LT}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M92 120h16l-4 10h-8Z" stroke="${LT}" stroke-width="1.4" fill="${FF}"/>
    <circle cx="150" cy="26" r="5" stroke="${TE}" stroke-width="1.4" fill="${FF}"/>
  `),

  /* Condition monitoring instrument */
  monitor: wrap(`
    <rect x="52" y="24" width="96" height="86" rx="10" stroke="${IK}" stroke-width="1.8" fill="${FF}"/>
    <rect x="62" y="34" width="76" height="44" rx="5" fill="#0d1420"/>
    <path d="M68 64l10-12 8 8 10-16 9 12 8-6 8 8" stroke="${TE}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M68 46h18" stroke="${CU}" stroke-width="1.8" stroke-linecap="round"/>
    <g fill="${LT}"><circle cx="70" cy="88" r="4"/><circle cx="84" cy="88" r="4"/><circle cx="98" cy="88" r="4"/><circle cx="112" cy="88" r="4"/><circle cx="126" cy="88" r="4"/></g>
    <path d="M76 24V16h48v8" stroke="${LT}" stroke-width="1.4" fill="none"/>
    <circle cx="100" cy="12" r="4" stroke="${TE}" stroke-width="1.5" fill="${FF}"/>
    <path d="M148 50c8 0 12 4 12 12v28c0 6-4 10-10 10" stroke="${LT}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M24 76h24M24 88h18" stroke="${CU}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
  `),

  /* Test kit — case with vials */
  kit: wrap(`
    <rect x="30" y="40" width="140" height="72" rx="8" stroke="${IK}" stroke-width="1.8" fill="${FF}"/>
    <path d="M30 62h140" stroke="${IK}" stroke-width="1.5"/>
    <rect x="44" y="70" width="16" height="32" rx="3" stroke="${TE}" stroke-width="1.5" fill="#eef8f9"/>
    <rect x="68" y="70" width="16" height="32" rx="3" stroke="${TE}" stroke-width="1.5" fill="#eef8f9"/>
    <rect x="92" y="70" width="16" height="32" rx="3" stroke="${CU}" stroke-width="1.5" fill="#fdf3e9"/>
    <path d="M46 70v-6h12v6M70 70v-4h12v4M94 70v-8h12v8" stroke="${LT}" stroke-width="1.3" fill="none"/>
    <rect x="120" y="70" width="36" height="32" rx="3" stroke="${LT}" stroke-width="1.4" fill="${FF}"/>
    <g stroke="${LT}" stroke-width="1.3"><circle cx="130" cy="80" r="4"/><circle cx="142" cy="80" r="4"/><circle cx="136" cy="92" r="4"/></g>
    <rect x="86" y="28" width="28" height="12" rx="4" stroke="${LT}" stroke-width="1.4" fill="${FF}"/>
    <path d="M52 62v-8M104 62v-10M136 62v-6" stroke="${CU}" stroke-width="1.4" opacity=".5" stroke-linecap="round"/>
    <circle cx="160" cy="34" r="9" stroke="${CU}" stroke-width="1.5" fill="#fdf3e9"/>
    <path d="M156 34l3 3 5-6" stroke="${CU}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  /* Consumables — collector paper roll + HSS rod */
  consumable: wrap(`
    <rect x="34" y="30" width="66" height="80" rx="8" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <g stroke="${LT}" stroke-width="1.3"><path d="M42 42h50M42 54h50M42 66h50M42 78h50M42 90h50"/></g>
    <path d="M42 42h50M42 66h50M42 90h50" stroke="${CU}" stroke-width="1.5" opacity=".55"/>
    <circle cx="67" cy="100" r="0"/>
    <rect x="112" y="52" width="66" height="12" rx="6" stroke="${TE}" stroke-width="1.6" fill="#eef8f9"/>
    <rect x="112" y="70" width="52" height="10" rx="5" stroke="${TE}" stroke-width="1.6" fill="#eef8f9"/>
    <rect x="120" y="86" width="58" height="8" rx="4" stroke="${LT}" stroke-width="1.5" fill="${FF}"/>
    <g stroke="${CU}" stroke-width="1.4" stroke-linecap="round" opacity=".6"><path d="M120 52v12M132 52v12M144 52v12"/></g>
    <path d="M100 60h12M100 76h12" stroke="${TE}" stroke-width="1.5" stroke-linecap="round" class="flow-dash"/>
    <path d="M34 118h144" stroke="${LT}" stroke-width="1.5" stroke-linecap="round"/>
  `),

  /* Integrated ELC + LVDH — electrostatic section feeding a vacuum chamber */
  integrated: wrap(`
    <rect x="14" y="44" width="78" height="60" rx="8" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <rect x="22" y="54" width="62" height="34" rx="4" fill="#fdf3e9"/>
    <g stroke="${CU}" stroke-width="1.5" stroke-linecap="round">
      <path d="M34 56v30M44 56v30M54 56v30"/>
    </g>
    <g stroke="${TE}" stroke-width="1.5" stroke-linecap="round"><path d="M70 56v30"/></g>
    <path d="M92 74h20" stroke="${TE}" stroke-width="1.8" stroke-linecap="round" class="flow-dash"/>
    <path d="M108 68l6 6-6 6" stroke="${TE}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="120" y="36" width="62" height="72" rx="9" stroke="${IK}" stroke-width="1.7" fill="${FF}"/>
    <rect x="128" y="48" width="46" height="34" rx="4" fill="#eef8f9"/>
    <path d="M128 66c6-5 11-5 17 0s11 5 17 0 8-3 12 0" stroke="${TE}" stroke-width="1.4" fill="none" class="flow-dash"/>
    <path d="M151 36V24h26" stroke="${LT}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <rect x="153" y="13" width="30" height="20" rx="4" stroke="${TE}" stroke-width="1.5" fill="${FF}"/>
    <path d="M161 19v10M168 19v10M175 19v10" stroke="${TE}" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>
    <circle cx="151" cy="27" r="2.6" fill="${TE}" opacity=".55"/>
    <path d="M128 100c0-6 5-9 5-14 0 5 5 8 5 14a5 5 0 1 1-10 0Z" fill="#fdf3e9" stroke="${CU}" stroke-width="1.4"/>
    <rect x="18" y="112" width="164" height="10" rx="4" fill="#f1ece5" stroke="${IK}" stroke-width="1.5"/>
    <path d="M30 122v6M170 122v6" stroke="${LT}" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="53" cy="128" r="5" stroke="${LT}" stroke-width="1.4"/>
    <circle cx="151" cy="128" r="5" stroke="${LT}" stroke-width="1.4"/>
    <rect x="96" y="52" width="16" height="12" rx="2.5" stroke="${CU}" stroke-width="1.3" fill="#fff"/>
    <path d="M100 58h8" stroke="${CU}" stroke-width="1.2"/>
  `),

  /* Generic gear / industry mark */
  gear: wrap(`
    <circle cx="100" cy="70" r="34" stroke="${IK}" stroke-width="1.8" fill="${FF}"/>
    <circle cx="100" cy="70" r="12" stroke="${CU}" stroke-width="1.6" fill="#fdf3e9"/>
    <circle cx="100" cy="70" r="3.4" fill="${CU}"/>
    <g stroke="${IK}" stroke-width="1.6" stroke-linecap="round">
      <path d="M100 28v-9M100 121v-9M58 70h-9M151 70h-9M70 40l-6-6M136 106l-6-6M130 40l6-6M64 106l6-6"/>
    </g>
    <circle cx="146" cy="36" r="14" stroke="${TE}" stroke-width="1.5" fill="${FF}"/>
    <circle cx="146" cy="36" r="4.5" stroke="${TE}" stroke-width="1.4"/>
    <path d="M146 22v-5M146 55v-5M132 36h-5M165 36h-5" stroke="${TE}" stroke-width="1.4" stroke-linecap="round"/>
  `),
};

export const artFor = (key) => art[key] || art.gear;

/* ----------------------------- shared chrome ------------------------------ */
const NAV = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "Company" },
  { href: "products.html", label: "Products", mega: true },
  { href: "services.html", label: "Services" },
  { href: "industries.html", label: "Industries" },
  { href: "contact.html", label: "Contact" },
];

const productLink = (f) => `
  <a class="dropdown__link" href="product-${f.slug}.html">
    <span class="dropdown__ico">${icons.filter}</span>
    <span>
      <span class="dropdown__label">${f.short}</span>
      <span class="dropdown__desc">${f.series}</span>
    </span>
  </a>`;

export const header = (current = "") => {
  const { contact } = company;
  return `
<div class="topbar">
  <div class="wrap topbar__inner">
    <div class="topbar__list">
      <span class="topbar__item">${icons.pin}Kondhwa Budruk, Pune 411048</span>
      <a class="topbar__item" href="tel:${contact.phoneHref}">${icons.phone}${contact.phoneDisplay}</a>
    </div>
    <div class="topbar__list topbar__list--secondary">
      <span class="topbar__badge"><span class="topbar__dot"></span>Manufacturer &amp; Exporter since 1980</span>
      <span class="topbar__item">${icons.star} ${contact.rating.score} / 5 on Google</span>
    </div>
  </div>
</div>

<header class="header" id="siteHeader">
  <div class="wrap header__inner">
    ${logo()}
    <nav class="nav" aria-label="Primary">
      ${NAV.map((n) =>
        n.mega
          ? `<div class="has-drop">
               <a class="nav__link drop-toggle" href="${n.href}" ${current === n.href ? 'aria-current="page"' : ""}>
                 ${n.label} ${icons.chevron}
               </a>
               <div class="dropdown" role="menu" aria-label="Product families">
                 <div class="dropdown__grid">
                   ${PRODUCTS_FOR_NAV.map(productLink).join("")}
                 </div>
                 <div class="dropdown__foot">
                   <span>${PRODUCTS_FOR_NAV.length} families · ${PRODUCTS_FOR_NAV.reduce((a, f) => a + f.models.length, 0)} machine configurations</span>
                   <a class="link-arrow" href="products.html">Full catalogue ${icons.arrow}</a>
                 </div>
               </div>
             </div>`
          : `<a class="nav__link" href="${n.href}" ${current === n.href ? 'aria-current="page"' : ""}>${n.label}</a>`
      ).join("")}
    </nav>
    <div class="header__cta">
      <a class="btn btn--primary btn--sm" href="contact.html">Request a quote ${icons.arrow}</a>
    </div>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="drawer" id="drawer" hidden>
  <div class="wrap">
    <p class="drawer__title">Navigate</p>
    ${NAV.map((n) => `<a class="drawer__link" href="${n.href}">${n.label}</a>`).join("")}
    <div class="drawer__group">
      <p class="drawer__title">Product families</p>
      ${PRODUCTS_FOR_NAV.map((f) => `<a class="drawer__link" style="font-size:1.05rem" href="product-${f.slug}.html">${f.short}</a>`).join("")}
    </div>
    <div class="drawer__contact">
      <p class="drawer__title">Reach us</p>
      <a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a>
      <a href="mailto:${contact.email}">${contact.email}</a>
      <p class="mt-4">${contact.addressLines.join("<br>")}</p>
      <div class="btn-row mt-5">
        <a class="btn btn--primary" href="contact.html">Request a quote</a>
        <a class="btn btn--ghost" href="products.html">Browse products</a>
      </div>
    </div>
  </div>
</div>`;
};

/* Product list for nav/mega-menu — injected by build to avoid a cycle. */
export let PRODUCTS_FOR_NAV = [];
export const setNavProducts = (list) => { PRODUCTS_FOR_NAV = list; };

/* -------------------------------- footer ---------------------------------- */
export const footer = () => {
  const { contact, legal, name } = company;
  return `
<footer class="footer">
  <div class="wrap">
    <div class="badge-row">
      <span class="badge">${icons.shield} ISO-grade build quality</span>
      <span class="badge">${icons.award} Established 1980</span>
      <span class="badge">${icons.globe} Made in India · exported worldwide</span>
      <span class="badge">${icons.star} ${contact.rating.score} ★ · ${contact.rating.count} Google reviews</span>
      <span class="badge">${icons.file} GST ${legal.gst}</span>
    </div>

    <div class="footer__grid">
      <div>
        ${footerLogo()}
        <p class="footer__about">
          Manufacturer and exporter of electrostatic liquid cleaning equipment,
          low vacuum dehydration machines, oil filtration systems and condition
          monitoring instruments. Engineering cleaner oil since 1980.
        </p>
        <div class="footer__socials">
          <a class="footer__social" href="${company.web.primary}" aria-label="Ferrocare website">${icons.globe}</a>
          <a class="footer__social" href="#" aria-label="LinkedIn">${icons.linkedin}</a>
          <a class="footer__social" href="#" aria-label="YouTube">${icons.youtube}</a>
          <a class="footer__social" href="mailto:${contact.email}" aria-label="Email">${icons.mail}</a>
        </div>
      </div>

      <div>
        <h4>Products</h4>
        <div class="footer__links">
          ${PRODUCTS_FOR_NAV.map((f) => `<a href="product-${f.slug}.html">${f.short}</a>`).join("")}
        </div>
      </div>

      <div>
        <h4>Company</h4>
        <div class="footer__links">
          <a href="about.html">About Ferrocare</a>
          <a href="services.html">Services</a>
          <a href="industries.html">Industries served</a>
          <a href="products.html">Full catalogue</a>
          <a href="contact.html">Contact &amp; enquiry</a>
          <a href="faq.html">Frequently asked</a>
        </div>
      </div>

      <div>
        <h4>Contact</h4>
        <div class="footer__links">
          <a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a>
          <a href="mailto:${contact.email}">${contact.email}</a>
          <span style="color:var(--ink-400)">${contact.addressLines.join("<br>")}</span>
          <span style="color:var(--ink-400)">Mon–Fri 8:30–18:30<br>Sat 8:30–14:00</span>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} ${name}. All rights reserved.</span>
      <div class="footer__bottom-links">
        <span>CIN ${legal.cin}</span>
        <span>GST ${legal.gst}</span>
        <span>IEC ${legal.iec}</span>
      </div>
    </div>
  </div>
</footer>`;
};

/* ------------------------------ page shell -------------------------------- */
export const page = ({ title, description, current, body, bodyClass = "", canonical = "" }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#0d1420">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<link rel="icon" href="assets/img/icons/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="16x16" href="assets/img/icons/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="48x48" href="assets/img/icons/favicon-48.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/img/icons/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta name="apple-mobile-web-app-title" content="Ferrocare">
<meta property="og:image" content="${canonical.replace(/[^/]*$/, "")}assets/img/og-card.jpg">
<link rel="canonical" href="${canonical}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Ferrocare Machines Pvt. Ltd. — oil purification and filtration equipment, Pune, India">
<meta property="og:site_name" content="Ferrocare Machines Pvt. Ltd.">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${canonical.replace(/[^/]*$/, "")}assets/img/og-card.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300..700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>document.documentElement.className+=" js";</script>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
<script src="assets/js/main.js" defer></script>
</body>
</html>`;

/* ---------------------------- reusable blocks ----------------------------- */
export const ctaBand = ({
  eyebrow = "Next step",
  title = "Tell us what your oil is doing wrong.",
  body = "Send us the fluid type, reservoir volume, flow rate and the contamination you are seeing. Our engineers will size a machine — or a service visit — against that duty point.",
  primary = { href: "contact.html", label: "Request a quote" },
  secondary = { href: "products.html", label: "Browse the catalogue" },
} = {}) => `
<section class="section">
  <div class="cta-band" data-reveal>
    <div class="cta-band__inner">
      <span class="eyebrow">${eyebrow}</span>
      <h2 class="mt-4">${title}</h2>
      <p>${body}</p>
      <div class="btn-row cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${primary.href}">${primary.label} ${icons.arrow}</a>
        <a class="btn btn--outline-light btn--lg" href="${secondary.href}">${secondary.label}</a>
      </div>
    </div>
  </div>
</section>`;

export const pageHead = ({ eyebrow, title, lead, crumbs = [] }) => `
<section class="page-head">
  <div class="wrap page-head__inner">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      ${crumbs.map((c) => `${icons.chevronRight}${c.href ? `<a href="${c.href}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`}`).join("")}
    </nav>
    ${eyebrow ? `<span class="eyebrow mt-5">${eyebrow}</span>` : ""}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
  </div>
</section>`;

export const sectionHead = ({ eyebrow, title, lead, center = false, tag = "h2" }) => `
<div class="section-head ${center ? "section-head--center" : ""}" data-reveal>
  ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
  <${tag}>${title}</${tag}>
  ${lead ? `<p class="lead">${lead}</p>` : ""}
</div>`;

export const productCard = (f) => `
<article class="pcard" data-reveal data-family="${f.group}">
  <div class="pcard__media ${f.img ? "pcard__media--photo" : ""}">
    <span class="pcard__badge">${f.series}</span>
    ${f.img ? `<img src="assets/img/${asset(f.img)}" alt="${f.short} — Ferrocare ${f.series}" loading="lazy" decoding="async">` : artFor(f.art)}
  </div>
  <div class="pcard__body">
    <h3><a href="product-${f.slug}.html">${f.name}</a></h3>
    <p>${f.tagline}</p>
    <div class="pcard__specs">
      ${(f.chips || f.highlights.slice(0, 2)).map((h) => `<span class="chip">${h}</span>`).join("")}
    </div>
    <div class="pcard__foot">
      <span class="card__tag">${f.models.length} model${f.models.length > 1 ? "s" : ""}</span>
      <a class="link-arrow" href="product-${f.slug}.html">Details ${icons.arrow}</a>
    </div>
  </div>
</article>`;

export const stars = (score = 4.5) => {
  const filled = Math.round(score);
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += `<svg viewBox="0 0 24 24" fill="currentColor" class="${i <= filled ? "" : "is-empty"}" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>`;
  }
  return `<span class="stars" role="img" aria-label="${score} out of 5">${out}</span>`;
};

export const ratingPill = () => `
<span class="rating">
  <span class="rating__badge">${icons.star} ${company.contact.rating.score}</span>
  ${stars(Number(company.contact.rating.score))}
  <span>${company.contact.rating.count} Google reviews</span>
</span>`;

/* ------------------------------ photography ------------------------------- */
export const shot = (file, alt, { fill = false, ratio = "" } = {}) => `
<div class="shot ${fill ? "shot--fill" : ""}" ${ratio ? `style="aspect-ratio:${ratio}"` : ""}>
  <img src="assets/img/${asset(file)}" alt="${alt}" loading="lazy" decoding="async">
</div>`;

export const figure = (file, alt, caption = "", sub = "", { tall = false } = {}) => `
<figure class="figure ${tall ? "figure--tall" : ""}">
  <img src="assets/img/${asset(file)}" alt="${alt}" loading="lazy" decoding="async">
  ${caption ? `<figcaption class="figure__cap"><strong>${caption}</strong>${sub ? `<span>${sub}</span>` : ""}</figcaption>` : ""}
</figure>`;

/* A family gallery, rendered as a 12-column mosaic. Transparent product
   cutouts are contained on a light plate; photographs fill their frame. */
export const gallery = (items) => `
<div class="gallery">
  ${items.map((it, i) => {
    const src = asset(it.img);
    const isCutout = src.endsWith(".webp");
    const span = ["g-8", "g-4", "g-4", "g-8", "g-6", "g-6"][i % 6];
    return `<figure class="${span} ${isCutout ? "is-cutout" : "is-photo"}">
      <img src="assets/img/${src}" alt="${it.caption || "Ferrocare equipment"}" loading="lazy" decoding="async">
      ${it.caption ? `<figcaption>${it.caption}</figcaption>` : ""}
    </figure>`;
  }).join("")}
</div>`;
