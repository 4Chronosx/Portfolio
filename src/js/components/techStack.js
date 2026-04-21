import { escapeHtml } from "../utils/escape.js";

// Inner ring: largest icons (most-used stack), middle: medium, outer: tools/misc
const RING_CONFIG = [
  { count: 8,  radius: 115, size: "lg" },
  { count: 11, radius: 215, size: "md" },
  { count: 12, radius: 305, size: "sm" },
];

function createStackItem(item, size, angleDeg, radius) {
  const isObject = typeof item === "object" && item !== null;
  const name   = escapeHtml(isObject ? item.name   ?? "" : item ?? "");
  const logo   = escapeHtml(isObject ? item.logo   ?? "" : "");
  const url    = escapeHtml(isObject ? item.url    ?? "" : "");
  const filter = isObject && item.filter ? escapeHtml(item.filter) : "";

  const rad = (angleDeg * Math.PI) / 180;
  const x   = Math.round(radius * Math.cos(rad));
  const y   = Math.round(radius * Math.sin(rad));

  const imgStyle = filter ? ` style="filter:${filter}"` : "";
  const media = logo
    ? `<img class="stack-logo" src="${logo}" alt="${name} logo" loading="lazy" title="${name}"${imgStyle} />`
    : `<span class="stack-logo-fallback">${name}</span>`;

  const inner = url
    ? `<a class="stack-logo-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name}">${media}</a>`
    : media;

  return `<span class="stack-item-wrapper size-${size}" style="left:calc(50% + ${x}px);top:calc(50% + ${y}px)">${inner}</span>`;
}

export function renderTechStackSection(container, techStackData = {}) {
  const heading = escapeHtml(techStackData.heading ?? "");
  const items = Array.isArray(techStackData.items)
    ? techStackData.items
    : Array.isArray(techStackData.groups)
      ? techStackData.groups.flatMap((g) => (Array.isArray(g.items) ? g.items : []))
      : [];

  let allItems = "";
  let idx = 0;

  for (const { count, radius, size } of RING_CONFIG) {
    const ring = items.slice(idx, idx + count);
    idx += count;
    ring.forEach((item, i) => {
      const angle = (360 / ring.length) * i - 90;
      allItems += createStackItem(item, size, angle, radius);
    });
  }

  container.innerHTML = `
    <h1>${heading}</h1>
    <div class="divider"></div>
    <div class="stack-collage">${allItems}</div>
  `;
}
