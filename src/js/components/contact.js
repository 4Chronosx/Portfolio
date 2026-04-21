import { createAstronaut } from "./astronaut.js";
import { escapeHtml } from "../utils/escape.js";

function createContactLink(link = {}) {
  const href = escapeHtml(link.href ?? "#");
  const label = escapeHtml(link.label ?? "");
  const iconClass = escapeHtml(link.iconClass ?? "");
  const containerClass = escapeHtml(link.containerClass ?? "");
  const idAttr = link.id ? ` id="${escapeHtml(link.id)}"` : "";
  const targetAttr = link.target ? ` target="${escapeHtml(link.target)}"` : "";
  const relAttr = link.target === "_blank" ? ' rel="noopener noreferrer"' : "";

  return `
    <div class="icon-container ${containerClass}">
      <a${idAttr} href="${href}"${targetAttr}${relAttr}><i class="fa ${iconClass}"></i>${label}</a>
    </div>
  `;
}

export function renderContactSection(container, contactData = {}) {
  const heading = escapeHtml(contactData.heading ?? "");
  const subheading = escapeHtml(contactData.subheading ?? "");
  const links = Array.isArray(contactData.links) ? contactData.links : [];

  container.innerHTML = `
    <h1>${heading}</h1>
    <p>${subheading}</p>
    <article class="icons">
      ${links.map((link) => createContactLink(link)).join("")}
    </article>
    ${createAstronaut("frame-section")}
  `;
}
