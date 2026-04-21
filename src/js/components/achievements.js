import { escapeHtml } from "../utils/escape.js";

function createSlide(item, index) {
  const title       = escapeHtml(item.title ?? "");
  const event       = escapeHtml(item.event ?? "");
  const date        = escapeHtml(item.date ?? "");
  const description = escapeHtml(item.description ?? "");
  const images      = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  const image       = escapeHtml(images[0] ?? item.image ?? "");

  return `
    <div class="carousel-slide">
      <a class="carousel-slide-link" href="achievement.html?id=${index}">
        <img class="carousel-img" src="${image}" alt="${title}" loading="lazy" />
        <div class="carousel-info">
          <h2 class="carousel-title">${title}</h2>
          <p class="carousel-meta">${event} &nbsp;|&nbsp; ${date}</p>
          <p class="carousel-excerpt">${description}</p>
          <span class="carousel-cta">View Details →</span>
        </div>
      </a>
    </div>
  `;
}

function initCarousel(stage) {
  const wrapper = stage.closest(".carousel-wrapper");
  const track = stage.querySelector(".carousel-track");
  const slides = stage.querySelectorAll(".carousel-slide");
  const dots   = wrapper.querySelectorAll(".carousel-dot");
  const total  = slides.length;
  let current  = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  stage.querySelector(".carousel-prev").addEventListener("click", () => goTo(current - 1));
  stage.querySelector(".carousel-next").addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
}

export function renderAchievementsSection(container, achievementsData = {}) {
  const heading    = escapeHtml(achievementsData.heading ?? "");
  const subheading = escapeHtml(achievementsData.subheading ?? "");
  const items      = Array.isArray(achievementsData.items) ? achievementsData.items : [];

  const dotsHtml = items
    .map((_, i) => `<button class="carousel-dot${i === 0 ? " active" : ""}" aria-label="Slide ${i + 1}"></button>`)
    .join("");

  container.innerHTML = `
    <h1>${heading}</h1>
    <div class="divider"></div>
    <p class="achievements-subheading">${subheading}</p>
    <div class="carousel-wrapper">
      <div class="carousel-stage">
        <div class="carousel-track-wrapper">
          <div class="carousel-track">
            ${items.map((item, i) => createSlide(item, i)).join("")}
          </div>
        </div>
        <button class="carousel-btn carousel-prev" aria-label="Previous">&#8249;</button>
        <button class="carousel-btn carousel-next" aria-label="Next">&#8250;</button>
      </div>
      <div class="carousel-dots">${dotsHtml}</div>
    </div>
  `;

  initCarousel(container.querySelector(".carousel-stage"));
}
