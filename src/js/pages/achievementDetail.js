import { renderNavbar } from "../components/navbar.js";
import { escapeHtml } from "../utils/escape.js";

const DATA_PATH = "./src/data/portfolio.json";

function buildImageSection(images, title) {
  if (!images.length) return "";

  if (images.length === 1) {
    return `<img src="${escapeHtml(images[0])}" alt="${title}" class="detail-hero-img" />`;
  }

  const slides = images
    .map((src) => `
      <div class="detail-carousel-slide">
        <img src="${escapeHtml(src)}" alt="${title}" class="detail-carousel-img" loading="lazy" />
      </div>`)
    .join("");

  const dots = images
    .map((_, i) => `<button class="carousel-dot${i === 0 ? " active" : ""}" aria-label="Slide ${i + 1}"></button>`)
    .join("");

  return `
    <div class="detail-carousel">
      <div class="detail-carousel-track-wrapper">
        <div class="detail-carousel-track">${slides}</div>
      </div>
      <button class="carousel-btn detail-carousel-prev" aria-label="Previous">&#8249;</button>
      <button class="carousel-btn detail-carousel-next" aria-label="Next">&#8250;</button>
      <div class="carousel-dots">${dots}</div>
    </div>`;
}

function initDetailCarousel(wrapper) {
  const track = wrapper.querySelector(".detail-carousel-track");
  const slides = wrapper.querySelectorAll(".detail-carousel-slide");
  const dots   = wrapper.querySelectorAll(".carousel-dot");
  const total  = slides.length;
  let current  = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  wrapper.querySelector(".detail-carousel-prev").addEventListener("click", () => goTo(current - 1));
  wrapper.querySelector(".detail-carousel-next").addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
}

async function bootstrap() {
  const id = parseInt(new URLSearchParams(window.location.search).get("id") ?? "0", 10);
  const data = await fetch(DATA_PATH, { cache: "no-cache" }).then((r) => r.json());

  const navbar = document.querySelector("#navbar");
  if (navbar) renderNavbar(navbar, data.navbar);

  const item = data.achievements?.items?.[id];
  const container = document.querySelector("#detail-page");
  if (!container) return;

  if (!item) {
    container.innerHTML = `<div class="detail-not-found"><p>Achievement not found.</p><a href="index.html">← Back to portfolio</a></div>`;
    return;
  }

  document.title = data.site?.title ?? "Portfolio";

  const title   = escapeHtml(item.title ?? "");
  const event   = escapeHtml(item.event ?? "");
  const date    = escapeHtml(item.date ?? "");
  const details = escapeHtml(item.details ?? item.description ?? "");
  const images  = Array.isArray(item.images) ? item.images.filter(Boolean) : (item.image ? [item.image] : []);

  container.innerHTML = `
    <div class="detail-page">
      <a href="index.html#achievements-section" class="detail-back">← Back</a>
      ${buildImageSection(images, title)}
      <div class="detail-body">
        <h1 class="detail-title">${title}</h1>
        <p class="detail-meta">${event} &nbsp;|&nbsp; ${date}</p>
        <p class="detail-description">${details}</p>
      </div>
    </div>
  `;

  const carouselEl = container.querySelector(".detail-carousel");
  if (carouselEl) initDetailCarousel(carouselEl);
}

bootstrap().catch(console.error);
