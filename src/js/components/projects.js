import { escapeHtml } from "../utils/escape.js";

function createProjectTile(project, index) {
  const title = escapeHtml(project.title ?? "");
  const images = Array.isArray(project.images) ? project.images : (project.image ? [project.image] : []);
  const image = escapeHtml(images[0] ?? "");

  return `
    <a class="project-link" href="project.html?id=${index}">
      <div class="project-tile">
        <img class="project-img" src="${image}" alt="${title}" />
        <div class="project-title-container">
          <p>
            <span class="hidden">&lt;</span> ${title}
            <span class="hidden">/&gt;</span>
          </p>
        </div>
      </div>
    </a>
  `;
}

export function renderProjectsSection(container, projectsData = {}) {
  const heading      = escapeHtml(projectsData.heading ?? "");
  const showAllHref  = escapeHtml(projectsData.showAll?.href ?? "#");
  const showAllLabel = escapeHtml(projectsData.showAll?.label ?? "Show All");
  const items        = Array.isArray(projectsData.items) ? projectsData.items : [];

  container.innerHTML = `
    <h1>${heading}</h1>
    <div class="divider"></div>
    <div class="project-tile-container">
      ${items.map((item, i) => createProjectTile(item, i)).join("")}
    </div>
    <a href="${showAllHref}">
      <button class="show-button">
        <span class="text">${showAllLabel}</span><span class="arrow">></span>
      </button>
    </a>
  `;
}
