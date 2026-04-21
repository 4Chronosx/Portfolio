import { createAstronaut } from "./astronaut.js";
import { escapeHtml } from "../utils/escape.js";

export function renderWelcomeSection(container, welcomeData = {}) {
  const heading = escapeHtml(welcomeData.heading ?? "");
  const subheading = escapeHtml(welcomeData.subheading ?? "");

  container.innerHTML = `
    <h1>${heading}</h1>
    <p>${subheading}</p>
    ${createAstronaut("frame")}
  `;
}
