import { escapeHtml } from "../utils/escape.js";

function createNavLink(link = {}) {
  const href = escapeHtml(link.href ?? "#");
  const label = escapeHtml(link.label ?? "");

  return `
    <a class="nav-link" href="${href}">
      <div class="link-container">${label}</div>
    </a>
  `;
}

export function renderNavbar(container, links = []) {
  container.innerHTML = links.map((link) => createNavLink(link)).join("");
}
